#!/bin/bash

docker build -t savantcare/emrserver . --tag=docker.io/savantcare/emrserver
docker push docker.io/savantcare/emrserver:latest
