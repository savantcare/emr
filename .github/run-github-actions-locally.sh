#!/bin/bash

echo "Step 1/6 Stopping all containers"
docker kill $(docker ps -q)

echo "Step 2/6 Removing all containers"
docker rm $(docker ps -a -q)

# remove all docker images
# docker rmi $(docker images -q)

echo "Step 3/6 Deleting the mysql data dir so previous run does not affect this run"
rm -rf /tmp/var/

echo "Step 4/6 Installing app from https://github.com/nektos/act"
brew install nektos/tap/act

echo "Step 5/6  Download the full ubuntu image to make env similar to github https://github.com/nektos/act#alternative-runner-images"
docker run --rm -it --entrypoint "" nektos/act-environments-ubuntu:18.04-full ls

echo "Step 6/6 This will automatically pick up workflows/build.yml"
act -P ubuntu-18.04=nektos/act-environments-ubuntu:18.04-full
