#!/bin/bash


# The following needs to be defined from github web interface of actions as a secret

echo "Creating the user which webclient will use to connect to ptserver"

mysql -u root -e "CREATE USER 'stanford2008'@'%' IDENTIFIED BY 'jaidurgama';"
mysql -u root -e "GRANT ALL PRIVILEGES ON *.* TO 'stanford2008'@'%';"
