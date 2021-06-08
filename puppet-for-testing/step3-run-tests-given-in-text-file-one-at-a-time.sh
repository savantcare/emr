#!/usr/bin/env bash
echo run-tests-given-in-text-file-one-at-a-time.sh $1 $2 $3 $4
./run-tests-given-in-text-file-one-at-a-time.sh $1 $2 $3 $4
#echo "Sl   Path                                                                                            Status"
#function output(){
#while read line
#do
#    title="$(cut -d ":"  -f 1 <<<"$line")"
#    composer="$(cut -d ":" -f 2 <<<"$line")"
#    price="$(cut -d ":" -f 3 <<<"$line")"
#    echo "$title $composer $price " 
#done < result.txt
#}
#output | column -t
