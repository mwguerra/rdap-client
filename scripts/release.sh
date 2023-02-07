#!/usr/bin/env bash
set -e

echo "## SCRIPT: Release"
if ! command -v jq &> /dev/null
then
  echo "\`jq\` is required and could not be found (it is a command-line JSON processor)."
  echo ""
  echo "Website: https://stedolan.github.io/jq/download"
  echo ""
  echo "MacOS installation: brew install jq"
  echo "Windows installation: chocolatey install jq"
  echo ""
  echo "Install brew or chocolatey before as needed."
  echo ""
  exit
fi

currentVersion="$(jq -r .version ./package.json)"
echo "Current version: $currentVersion"
read -p 'Next Version: ' nextVersion
jq ".version = \"$nextVersion\"" ./package.json > ./temp.json && mv ./temp.json ./package.json

yarn run changelog

code CHANGELOG.md

read -p 'Is the changelog okay? (y/N): ' changelogConfirmed

if [ "$changelogConfirmed" != "Y" ] && [ "$changelogConfirmed" != "y" ]; then
  echo "quitting..."
  exit
fi

git add .
git commit -m "chore: release v$nextVersion"
git tag v$nextVersion
git push
git push --tags

