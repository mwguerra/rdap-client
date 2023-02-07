#!/usr/bin/env node

import rdapClient from "../index";

const args = process.argv.splice(2);
const domain = args[0];

if (domain) {
    rdapClient(domain)
      .then(response => console.dir(response, {depth: null}))
      .catch(console.error)
} else {
    console.log("Syntax: 'rdapClient https://example.com`");
}
