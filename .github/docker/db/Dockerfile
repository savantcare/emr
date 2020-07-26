# Why not use a mariadb official docker image?
#   When this container starts I need it to have a user name and password since this is used in a build.yml pipeline
#   offical mariadb was starting -> then creating a temp DB -> then restarting. During this time another container was already getting started.

FROM ubuntu:20.04

RUN apt-get update

RUN apt-get -y upgrade

RUN apt-get install -y mariadb-server

RUN apt-get install -y supervisor

COPY 50-server.cnf /etc/mysql/mariadb.conf.d/50-server.cnf

# Why start inside supervisor?
#   If there is a problem I can go inside docker container and debug mysql. Since supervisor is process 1 stopping mysql will not stop the container.

# COPY etc-supervisor-conf.d-services.conf /etc/supervisor/conf.d/services.conf

COPY cmds-to-customize-mysql.sh /root

RUN /etc/init.d/mysql start && /root/cmds-to-customize-mysql.sh

CMD ["/usr/bin/supervisord", "-n","-c","/etc/supervisor/supervisord.conf"]
