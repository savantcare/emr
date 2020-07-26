# Why not use official node image?
#   npm install takes a long time

FROM ubuntu:20.04

RUN apt-get update

RUN apt-get -y upgrade

# node install instructions are from https://github.com/nodesource/distributions/blob/master/README.md#debinstall
RUN apt-get -y install curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

RUN apt-get install -y supervisor

# COPY etc-supervisor-conf.d-services.conf /etc/supervisor/conf.d/services.conf

CMD ["/usr/bin/supervisord", "-n","-c","/etc/supervisor/supervisord.conf"]
