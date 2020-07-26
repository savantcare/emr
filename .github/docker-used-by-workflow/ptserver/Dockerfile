# Why not use official node image?
#   If there is a problem I can go inside docker container and debug. Since supervisor is process 1 stopping node will not stop the container.

FROM ubuntu:20.04

RUN apt-get update

RUN apt-get -y upgrade

# node install instructions are from https://github.com/nodesource/distributions/blob/master/README.md#debinstall
RUN apt-get -y install curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

RUN apt-get install -y supervisor

# Supervisor services files are mounted in docker-compose as that allows changing services.conf without needing to rebuild docker image
# COPY etc-supervisor-conf.d-services.conf /etc/supervisor/conf.d/services.conf coming from docker-compose easier to change since new image does not need to be pushed

CMD ["/usr/bin/supervisord", "-n","-c","/etc/supervisor/supervisord.conf"]
