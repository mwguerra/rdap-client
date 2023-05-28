// @ts-nocheck
import {DateHelper} from "../helpers/DateHelper"
import {RdapLink, RdapNameserver} from "../types";

interface RdapResponse {
  origin: 'rdap',
  domainExpirationDate: string | null
  registrar: {
    name: string | null
    url: string | null
    owner: string | null
    tech: string | null
  },
  provider: string | null
  nameServers: string | null
}

class RdapData {
  private rdapResponse: RdapResponse;

  constructor(rdapResponseObject) {
    this.rdapResponse = rdapResponseObject
  }

  protected getExpirationDate() {
    const events = [...this.rdapResponse.events]
    const expirationEvent = events.find(event => event.eventAction.includes('xpir'))
    const expirationDateFromRDAP = expirationEvent.eventDate
    const expirationDate = new DateHelper().getDateFromString(expirationDateFromRDAP);

    return expirationDate
  }

  protected getNameServers() {
    const nameservers: RdapNameserver[] = [...this.rdapResponse.nameservers]
    const nameserverNames = nameservers.map(server => server.ldhName)

    return nameserverNames
  }

  protected getRegistrarUrl() {
    const links: RdapLink[] = [...this.rdapResponse.links]
    const registrarLink = links.find(link => link.rel === 'self');
    const registrarUrl = registrarLink.href;

    let response = new URL(registrarUrl)
      .origin
      .split('rdap.')
      .join('')

    return response;
  }

  protected getRegistrar() {
    const registrarUrl = this.getRegistrarUrl();
    const response = new URL(registrarUrl).hostname

    if (response.endsWith('.br')) {
      return 'Registro BR';
    }

    return response;
  }

  protected getProvider() {
    return this.getRegistrar();
  }

  protected findEntityByRoles(roles: string[]) {
    for (let i = 0; i < roles.length; i++) {
      const entity = this.findEntityByRole(roles[i])
      if (entity) {
        // Returns the first entity that matches any of the roles specified in order
        return entity;
      }
    }

    return null;
  }

  protected findEntityByRole(role: string) {
    const entities = [...this.rdapResponse.entities]
    let entity = entities.find(entity => entity.roles.includes(role))

    if (!entity && entities.entities) {
      entity = entities.entities.find(entity => entity.roles.includes(role))
    }

    if (!entity) {
      return null
    }

    return entity
  }

  protected getRegistrarOwner() {
    const registrant = this.findEntityByRoles(['administrative', 'registrant'])

    return registrant ? registrant.handle : null
  }

  protected getRegistrarTech() {
    const registrant = this.findEntityByRoles(['technical', 'registrant'])

    return registrant ? registrant.handle : null
  }

  public buildResponse(): RdapResponse {
    if (!this.rdapResponse) {
      return {
        origin: 'rdap',
        domainExpirationDate: null,
        registrar: {
          name: null,
          url: null,
          owner: null,
          tech: null,
        },
        provider: null,
        nameServers: null,
      }
    }

    return {
      origin: 'rdap',
      domainExpirationDate: this.getExpirationDate(),
      registrar: {
        name: this.getRegistrar(),
        url: this.getRegistrarUrl(),
        owner: this.getRegistrarOwner(),
        tech: this.getRegistrarTech()
      },
      provider: this.getProvider(),
      nameServers: this.getNameServers(),
    }
  }
}

export { RdapData, RdapResponse }
