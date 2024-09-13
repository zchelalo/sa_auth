#!/bin/bash

openssl genrsa -out ./certs/rsa/private_access.pem 2048
openssl rsa -in ./certs/rsa/private_access.pem -pubout -out ./certs/rsa/public_access.pem

openssl genrsa -out ./certs/rsa/private_refresh.pem 2048
openssl rsa -in ./certs/rsa/private_refresh.pem -pubout -out ./certs/rsa/public_refresh.pem

openssl genrsa -out ./certs/rsa/private_recover.pem 2048
openssl rsa -in ./certs/rsa/private_recover.pem -pubout -out ./certs/rsa/public_recover.pem

openssl genrsa -out ./certs/rsa/private_verify.pem 2048
openssl rsa -in ./certs/rsa/private_verify.pem -pubout -out ./certs/rsa/public_verify.pem