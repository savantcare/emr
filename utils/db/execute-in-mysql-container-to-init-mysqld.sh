#!/bin/bash

if [ -z "$(ls -A /gt/sc-data-repos/sc-data-mysql)" ]; then
    echo "Mysql data folder is empty. So it can be initialized"
else
    echo "Quitting since there might be production data"
    exit 
fi

# --initialize-insecure this will make root have empty password
/usr/sbin/mysqld --initialize-insecure
