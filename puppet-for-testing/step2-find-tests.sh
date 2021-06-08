#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "Specify argument. Two alternative ways to run this script are:" 
    echo "$./step1-find-tests.sh prod"
    echo "$./step1-find-tests.sh dev"    
    exit
fi

echo "Emptying the previous file"
rm -rf tests-found-that-are-in-$1-status.txt

shopt -s dotglob
find /gt/sc-prog-repos/emr -maxdepth 2 -type d | while IFS= read -r d; do 
    if [ "$d" == "/gt/sc-prog-repos/emr" ]
    then
	  continue
    fi
    if [ "$d" == "/.git" ]
    then
	  continue
    fi
    echo "Searching for $1 quality tests inside $d"
    find $d -iname $1.spec.js | grep puppet-for-testing >> tests-found-that-are-in-$1-status.txt
done

echo "The tests found are"
cat  tests-found-that-are-in-$1-status.txt
