#!/bin/bash

docker run \
  --rm \
  -v $PWD/:/app \
  -w /app \
  node:20-alpine sh -c "npm i node-jose && node ./scripts/jwk/create_jwk_access.js > ./certs/jwks/jwks_access.json"