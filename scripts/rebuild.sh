#!/usr/bin/env bash
set -e

./scripts/clean-project.sh

echo "## SCRIPT: Rebuild"

yarn
yarn update:rdap-servers
yarn tsc
cp ./src/rdap-servers.json ./dist/rdap-servers.json
yarn test

echo "Project rebuilt"
