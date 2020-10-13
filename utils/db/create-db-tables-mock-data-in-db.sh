#!/bin/bash

echo "Run this from inside the DB container"
DB_USER="root"
DB_PASS="qwerty"

# Find comand to run DB init scripts inside webclient/components/

## Step 1: Create DB scripts 
for file in $(find /gt/sc-prog-repos/emr/webclient/components/ -type f -name "create-db*.sql" -print)
do
    echo "== executing create DB $file";
    mysql -u $DB_USER -p$DB_PASS  < $file 
done

## Step 2: structure of tables
for file in $(find /gt/sc-prog-repos/emr/webclient/components/ -type f -name "structure*.sql" -print)
do
    echo "== executing create structure $file";
    mysql -u $DB_USER -p$DB_PASS < $file 
done

## Mock data
for file in $(find /gt/sc-prog-repos/emr/webclient/components/ -type f -name "mock-data*.sql" -print)
do
    echo "== executing insert mock data $file";
    mysql -u $DB_USER -p$DB_PASS < $file 
done
