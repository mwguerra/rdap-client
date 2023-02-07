# rdap-client

A RDAP client for Node.js built with typescript that uses the iana RDAP DNS database to lookup domain information.

## Installation

Install via NPM

```bash
npm i rdap-client --save
```

or install via Yarn
```bash
yarn add rdap-client
```

## Usage in code

Import the package and use it!

Javascript example:
```javascript
// Javascript
const rdapClient = require("rdap-client")

async function rdapLookup(hostname) {
  return await rdapClient(hostname)
}

rdapLookup("https://www.google.com")
```

Typescript example:
```typescript
// Typescript
import rdapClient from "rdap-client"

const rdapLookup = async (hostname) => await rdapClient(hostname)

rdapLookup("https://www.google.com")
```

## Usage in CLI

```bash
$ yarn rdap-client https://google.com
```
or
```bash
$ npm run rdap-client https://google.com
```


## Usage in CLI (as global)

1. Install via `npm i rdap-client -g` or `yarn global add rdap-client`

2. Execute on your terminal

```bash
$ rdap-client https://www.google.com
```

## Response

| JSON key                     | Description                                                                                                                         |
|------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| objectClassName              | The type of object being processed                                                                                                  |
| handle                       | A unique identifier                                                                                                                 |
| ldhName                      | The domain name                                                                                                                     |
| links                        | Links to other resources on the internet                                                                                            |
| status                       | The state of the registered object                                                                                                  |
| entities                     | The information of organizations, corporations, governments, non-profits, clubs, individual persons, and informal groups of people. |
| events                       | Events that occurred in the current object class                                                                                    |
| secureDNS                    | Information about the digital signing of resource records                                                                           |
| nameservers                  | Information about the DNS nameservers                                                                                               |
| rdapConformance              | Specifications used in the construction of the response                                                                             |
| notices                      | Information notes about the RDAP service                                                                                            |
| remarks                      | Information notes about the current object class                                                                                    |

Reference: [RFC7483 - JSON Responses for the Registration Data Access Protocol (RDAP)](https://www.rfc-editor.org/rfc/rfc7483)

<details><summary>Example Response</summary>
<p>

```jsonc
{
  objectClassName: 'domain',
  handle: '2138514_DOMAIN_COM-VRSN',
  ldhName: 'GOOGLE.COM',
  links: [
    {
      value: 'https://rdap.verisign.com/com/v1/domain/GOOGLE.COM',
      rel: 'self',
      href: 'https://rdap.verisign.com/com/v1/domain/GOOGLE.COM',
      type: 'application/rdap+json'
    },
    {
      value: 'https://rdap.markmonitor.com/rdap/domain/GOOGLE.COM',
      rel: 'related',
      href: 'https://rdap.markmonitor.com/rdap/domain/GOOGLE.COM',
      type: 'application/rdap+json'
    }
  ],
  status: [
    'client delete prohibited',
    'client transfer prohibited',
    'client update prohibited',
    'server delete prohibited',
    'server transfer prohibited',
    'server update prohibited'
  ],
  entities: [
    {
      objectClassName: 'entity',
      handle: '292',
      roles: [ 'registrar' ],
      publicIds: [ { type: 'IANA Registrar ID', identifier: '292' } ],
      vcardArray: [
        'vcard',
        [
          [ 'version', {}, 'text', '4.0' ],
          [ 'fn', {}, 'text', 'MarkMonitor Inc.' ]
        ]
      ],
      entities: [
        {
          objectClassName: 'entity',
          roles: [ 'abuse' ],
          vcardArray: [
            'vcard',
            [
              [ 'version', {}, 'text', '4.0' ],
              [ 'fn', {}, 'text', '' ],
              [ 'tel', { type: 'voice' }, 'uri', 'tel:+1.2086851750' ],
              [
                'email',
                {},
                'text',
                'abusecomplaints@markmonitor.com'
              ]
            ]
          ]
        }
      ]
    }
  ],
  events: [
    { eventAction: 'registration', eventDate: '1997-09-15T04:00:00Z' },
    { eventAction: 'expiration', eventDate: '2028-09-14T04:00:00Z' },
    { eventAction: 'last changed', eventDate: '2019-09-09T15:39:04Z' },
    {
      eventAction: 'last update of RDAP database',
      eventDate: '2023-02-07T19:46:53Z'
    }
  ],
  secureDNS: { delegationSigned: false },
  nameservers: [
    { objectClassName: 'nameserver', ldhName: 'NS1.GOOGLE.COM' },
    { objectClassName: 'nameserver', ldhName: 'NS2.GOOGLE.COM' },
    { objectClassName: 'nameserver', ldhName: 'NS3.GOOGLE.COM' },
    { objectClassName: 'nameserver', ldhName: 'NS4.GOOGLE.COM' }
  ],
  rdapConformance: [
    'rdap_level_0',
    'icann_rdap_technical_implementation_guide_0',
    'icann_rdap_response_profile_0'
  ],
  notices: [
    {
      title: 'Terms of Use',
      description: [ 'Service subject to Terms of Use.' ],
      links: [
        {
          href: 'https://www.verisign.com/domain-names/registration-data-access-protocol/terms-service/index.xhtml',
          type: 'text/html'
        }
      ]
    },
    {
      title: 'Status Codes',
      description: [
        'For more information on domain status codes, please visit https://icann.org/epp'
      ],
      links: [ { href: 'https://icann.org/epp', type: 'text/html' } ]
    },
    {
      title: 'RDDS Inaccuracy Complaint Form',
      description: [
        'URL of the ICANN RDDS Inaccuracy Complaint Form: https://icann.org/wicf'
      ],
      links: [ { href: 'https://icann.org/wicf', type: 'text/html' } ]
    }
  ]
}
```

</p>
</details>

## Manually update the Top Level Domain (TLD) list 

* Origin: https://data.iana.org/rdap/dns.json
* Status on the deployment of RDAP over the world: https://deployment.rdap.org/

```bash
# Updates the top level domain list from IANA
$ npm run update:rdap-servers
```

## Credits

* This project was based on the [freewhois](https://github.com/joshterrill/freewhois) project by Josh Terrill and the [node-whois](https://github.com/FurqanSoftware/node-whois) by Furqan Software

## License

MIT
