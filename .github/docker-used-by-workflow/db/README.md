vk-tech@vk-mini-layer2-3 ~/g/s/p/u/c/db> docker build .

vk-tech@vk-mini-layer2-3 ~/g/s/p/u/c/db> docker run 9c1f27148b1f (The ID is from the previous command)
(if supervisor is running it will not exit)

docker run b23ea4f79cef "systemctl status mariadb.service"

docker run -ti 4873bdfa5629 /bin/bash

Q) What are the steps to make a docker image available on docker hub?

docker login --username=savantcare
docker build -t savanatcare/emrmysql . # this creates a image with the name emrmysql
docker tag 8bab8a4ea48d docker.io/savantcare/emrmysql # ref: https://stackoverflow.com/a/35809320
docker push docker.io/savantcare/emrmysql:latest

Q) How to run the savnatcare/emrmysql ?
vk-tech@vk-mini-layer2-3 ~/g/s/p/u/c/db> docker run savantcare/emrmysql
2020-07-25 23:25:35,667 CRIT Supervisor is running as root. Privileges were not dropped because no user is specified in the config file. If you intend to run as root, you can set user=root in the config file to avoid this message.
2020-07-25 23:25:35,668 INFO Included extra file "/etc/supervisor/conf.d/services.conf" during parsing
2020-07-25 23:25:35,671 INFO RPC interface 'supervisor' initialized
2020-07-25 23:25:35,671 CRIT Server 'unix_http_server' running without any HTTP authentication checking
2020-07-25 23:25:35,671 INFO supervisord started with pid 1
2020-07-25 23:25:36,674 INFO spawned: 'mysqld' with pid 7
2020-07-25 23:25:37,711 INFO success: mysqld entered RUNNING state, process has stayed up for > than 1 seconds (startsecs)
2020-07-25 23:25:37,775 INFO exited: mysqld (exit status 0; expected)
2020-07-25 23:25:38,776 INFO reaped unknown pid 202

Q) How to execute a command on the previous docker image?
vk-tech@vk-mini-layer2-3 ~/g/s/emr> docker exec -ti sharp_meitner mysql -u root -e "show databases"  
+--------------------+
| Database |
+--------------------+
| information_schema |
| mysql |
| performance_schema |

Q) How to start a single container from the docker-compose?
vk-tech@vk-mini-layer2-3 ~/g/s/p/u/run-on-docker> docker-compose -f docker-compose-test.yml up mariadb
Recreating run-on-docker_mariadb_1 ... done
Attaching to run-on-docker_mariadb_1
mariadb_1 | 2020-07-25 23:40:45,443 CRIT Supervisor is running as root. Privileges were not dropped because no user is specified in the config file. If you intend to run as root, you can set user=root in the config file to avoid this message.
mariadb_1 | 2020-07-25 23:40:45,443 INFO Included extra file "/etc/supervisor/conf.d/services.conf" during parsing
mariadb_1 | 2020-07-25 23:40:45,447 INFO RPC interface 'supervisor' initialized
mariadb_1 | 2020-07-25 23:40:45,447 CRIT Server 'unix_http_server' running without any HTTP authentication checking
mariadb_1 | 2020-07-25 23:40:45,448 INFO supervisord started with pid 1
mariadb_1 | 2020-07-25 23:40:46,452 INFO spawned: 'mysqld' with pid 7
mariadb_1 | 2020-07-25 23:40:47,499 INFO success: mysqld entered RUNNING state, process has stayed up for > than 1 seconds (startsecs)
mariadb_1 | 2020-07-25 23:40:47,555 INFO exited: mysqld (exit status 0; expected)
mariadb_1 | 2020-07-25 23:40:48,557 INFO reaped unknown pid 202

Q)How to delete the image?
docker images
docker rmi <image name>

Q) How to see all open connections
netstat -ap tcp
or
netstat -ap tcp | grep -i "listen"
or
lsof -Pn -i4

Q) Find out who is listening on a port?
netstat -anv | grep 4000
https://www.btaz.com/mac-os-x/find-the-process-listening-to-port-on-mac-os-x/#:~:text=To%20find%20the%20process%20that,command%20to%20show%20the%20name.
