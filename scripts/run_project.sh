#!/bin/bash

docker-compose down

mkdir "static-box"

docker-compose up -d --force-recreate --build

#pg_restore -c -U ${DB_USERNAME} -d ${DB_NAME} -h localhost -p ${DB_PORT} ./config/postgres-dump
