# Why not use official node image?
#   1. In future npm install result of node_modules can be kept inside docker image. But on github the npm install does not take long time. So not doing it.
#   2. Running inside supervisor allows easier debugging since when node exits the container does not stop

FROM ubuntu:20.04

RUN apt-get update

RUN apt-get -y upgrade

# node install instructions are from https://github.com/nodesource/distributions/blob/master/README.md#debinstall
RUN apt-get -y install curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

RUN apt-get install -y supervisor

# Supervisor services files are mounted in docker-compose as that allows changing services.conf without needing to rebuild docker image
# COPY etc-supervisor-conf.d-services.conf /etc/supervisor/conf.d/services.conf

CMD ["/usr/bin/supervisord", "-n","-c","/etc/supervisor/supervisord.conf"]
