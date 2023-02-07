#!/usr/bin/env bash
set -e

echo "## SCRIPT: Clean Project"

rm -rf ./dist
rm -rf ./.DS_Store/
rm -rf ./node_modules/
rm -f package-lock.json
rm -f yarn.lock
rm -f yarn-error.log

echo "Project cleanup complete"