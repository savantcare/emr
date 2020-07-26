#!/bin/bash

mysql -u root -e "CREATE USER 'stanford2008'@'%' IDENTIFIED BY 'jaidurgama';"

mysql -u root -e "GRANT ALL PRIVILEGES ON *.* TO 'stanford2008'@'%';"
