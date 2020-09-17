#!/bin/bash
DB_USER="root"

# Find comand to run DB init scripts inside webclient/cts/

## Step 1: Create DB scripts 
for file in $(find /gt/sc-prog-repos/emr/webclient/cts/ -type f -name "create-db-*.sql" -print)
do
    echo "== executing create DB $file";
    mysql -u $DB_USER  < $file 
done

## Step 2: structure of tables
for file in $(find /gt/sc-prog-repos/emr/webclient/cts/ -type f -name "structure-gen-*.sql" -print)
do
    echo "== executing create structure $file";
    mysql -u $DB_USER  < $file 
done

## Mock data
for file in $(find /gt/sc-prog-repos/emr/webclient/cts/ -type f -name "mock-data*.sql" -print)
do
    echo "== executing insert mock data $file";
    mysql -u $DB_USER  < $file 
done
