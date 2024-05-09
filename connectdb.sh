#!/bin/bash

source .env
pgcli \
  -h ${DB_HOST} \
  -p ${DB_PORT} \
  -u ${DB_USER} \
  -W ${DB_PASS} \
  -d ${DEV_DB};
