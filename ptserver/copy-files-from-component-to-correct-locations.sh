#!/bin/bash

# Why?
# the goal is that each Ct. keeps server and client side files all in one folder

# goal: Find cts that want to send files to ptserver
for file in $(find /gt/sc-prog-repos/emr/ptclient/cts/ -type f -name "files-for-ptserver.sh" -print)
do
    echo "== executing $file";
    $file
done
