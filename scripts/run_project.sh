#!/bin/bash

docker-compose down -v

mkdir "static-box"

docker-compose up -d

#pg_restore -c -U ${DB_USERNAME} -d ${DB_NAME} -h localhost -p ${DB_PORT} ./config/postgres-dump
