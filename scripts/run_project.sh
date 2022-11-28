#!/bin/bash

docker-compose down

docker-compose up -d

export PGPASSWORD=d48t4r

pg_restore -c -U postgres -d postgres -h localhost -p 5432 ./config/postgres-dump
