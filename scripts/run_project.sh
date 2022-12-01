#!/bin/bash

docker-compose down

docker-compose up -d

export PGPASSWORD=${DB_PASSWORD}

pg_restore -c -U ${DB_USERNAME} -d ${DB_NAME} -h localhost -p ${DB_PORT} ./config/postgres-dump
