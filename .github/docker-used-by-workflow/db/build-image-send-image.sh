#!/bin/bash

docker build -t savantcare/emrmysql . --tag=docker.io/savantcare/emrmysql
docker push docker.io/savantcare/emrmysql:latest
