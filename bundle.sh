#!/bin/sh
set -e

# Clear if it exists
rm -rf bundle

# Copy all the necessary files for production build
mkdir bundle

cp -R node_modules ./bundle/node_modules 

cp -R dist ./bundle/dist
cp yarn.lock package.json ./bundle
cp tsconfig.json ./bundle
