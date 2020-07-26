#!/bin/bash

docker build -t savantcare/emrclient . --tag=docker.io/savantcare/emrclient
docker push docker.io/savantcare/emrclient:latest
