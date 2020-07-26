#!/bin/bash
[ -z "$RUN_ENV" ] && echo "Need to set RUN_ENV" && exit 1;

docker-compose -f docker-compose-${RUN_ENV}.yml up -d
