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

## Usage in CLI (as global)

1. Install via `npm i rdap-client -g` or `yarn global add rdap-client`

2. Execute on your terminal

```bash
$ rdap-client "https://www.google.com"
```

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
