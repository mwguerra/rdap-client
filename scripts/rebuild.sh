#!/usr/bin/env bash
set -e

./scripts/clean-project.sh

echo "## SCRIPT: Rebuild"

yarn
yarn update:rdap-servers
yarn tsc
yarn test

echo "Project rebuilt"
