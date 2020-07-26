#!/bin/bash

docker build -t savantcare/emrpuppet . --tag=docker.io/savantcare/emrpuppet
docker push docker.io/savantcare/emrpuppet:latest
