import fs from "fs";
import { DomainExtension, RDAPServer, TLDData, RdapResponse } from "./types";
import axios, { AxiosResponse } from "axios";
import { ERRORS } from "./constants";

let dns: Array<TLDData> = [];

const isFullyQualifiedDomainName = (domain: string): boolean => {
    const parts = domain.split(".");
    const topLevelDomain = parts[parts.length - 1];

    if (parts.length < 2) return false;

    if (
      !/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(
        topLevelDomain
      )
    )
        return false;

    if (/\s/.test(topLevelDomain)) {
        return false;
    }

    if (/^\d+$/.test(topLevelDomain)) {
        return false;
    }

    return parts.every((part) => {
        if (part.length > 63) {
            return false;
        }

        if (!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(part)) {
            return false;
        }

        if (/[\uff01-\uff5e]/.test(part)) {
            return false;
        }

        if (/^-|-$/.test(part)) {
            return false;
        }

        if (/_/.test(part)) {
            return false;
        }

        return true;
    });
};

function getTopLevelDomain(domain: string) : string | null {
    if (!isFullyQualifiedDomainName(domain)) {
        return null;
    }
    const parts = domain.split(".")
    return parts[parts.length -1]
}

function findRDAPServer(domain: string): URL {
    if (!domain) {
        throw new Error(ERRORS.NoDomainError);
    }
    const tld = getTopLevelDomain(domain);
    if (!tld) {
        throw new Error(ERRORS.DomainParseError);
    }

    if (!dns.length) {
        const dnsFile = fs.readFileSync(`${__dirname}/rdap-servers.json`, "utf-8");
        dns = JSON.parse(dnsFile);
    }

    const foundTld: TLDData | undefined = dns.find(i => i[0].find((j: DomainExtension) => j === tld));
    if (!foundTld) {
        throw new Error(ERRORS.UnknownTLD);
    }
    return getUrl(foundTld[1][0]);
}

function getUrl(domain: string): URL {
    const indexOfDoubleSlash = domain.indexOf('//')

    if (indexOfDoubleSlash > -1) {
        return new URL(domain)
    }

    return new URL(`https://${domain}`)
}

function buildRdapRequestUrl(domainToQuery: string): string {
    const query = getUrl(domainToQuery);
    const server = findRDAPServer(query.hostname);
    let serverUrl = `${server.origin}${server.pathname}`

    if (serverUrl.endsWith('/')) {
        serverUrl = serverUrl.substring(0, serverUrl.length - 1)
    }

    return `${serverUrl}/domain/${query.hostname}`;
}

async function rdapClient(domain: string): Promise<RdapResponse> {
    if (domain.trim() === '') {
        throw new Error(ERRORS.NoDomainError)
    }

    const requestUrl = buildRdapRequestUrl(domain);

    let response: AxiosResponse
    try {
        response = await axios.get(requestUrl)
    } catch (err) {
        throw new Error(ERRORS.RDAPError)
    }

    if (response.data === "" || response.data === "''") {
        throw new Error(ERRORS.RDAPResponseEmpty)
    }

    return response.data
}

export default rdapClient;