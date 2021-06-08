#!/bin/bash


# 3 goals:
# 1. Run all prod.spec.js or dev.spec.js based on the argument.
# 2. Run them fast to give a quick feedback.
#    Do not write screenshots or html report or json report
#    Do not run UI of the browser -> Done
# 3. For each test give a simple Pass or Fail status

if [ $# -eq 0 ]
  then
    echo "Specify argument. Two alternative ways to run this script are:"
    echo "$./step3-run-tests-given-in-text-file-one-at-a-time.sh prod"
    echo "$./step3-run-tests-given-in-text-file-one-at-a-time.sh dev"
    exit
fi

echo run-tests-given-in-text-file-one-at-a-time.sh $1 $2 $3 $4

cat /dev/null > $1-passed.txt
input="./tests-found-that-are-in-$1-status.txt"
totalPassedTestCount=0

function executeTest {
    cat /dev/null > $1-failed.txt
    cat /dev/null > $1-re-encounter.txt

    failedTestCount=0
    totalTestCount=0

    #echo SL   Path     
    printf " %-5s | %-140s | %-20s\n " SL PATH STATUS
    #while IFS= read -r line
    while read line || [ -n "$line" ]
    do
        cat /dev/null > $1-error-msg.txt

        totalTestCount=$((totalTestCount+1))

        # folderName=`echo $line | rev | cut -d '/' -f 3- | rev`
        # echo "## The file is in the folder $folderName"

        sleep 5

        #Q. Why copy spec file?
        #Ans: We are not committed node_modules package for subfolder so if I run the test from the subfolder, it's throw error because node_modiules is not found
        # So that's why I install node_modules package here and run the test by copying the file here..
        # cp $line $1.spec.js

        #echo "Making changes to run in headless mode"
        #perl -i -p0e 's/let sessionConfig.*?;/`cat headless.session.config.js`/se' $1.spec.js

        # npm run mocha --reporter macaca-reporter --reporter-options reportJSONFilename=index,processAlwaysExitWithZero=true --bail prod.spec.js
        npm run start-dev $line $4 $3 > $1-error-msg.txt
        
        # This tells if the test passed or failed
        if [ $? -eq 0 ]; then
            #echo OK
            totalPassedTestCount=$((totalPassedTestCount+1))
            #echo "$totalTestCount  $line  PASSED"
            #echo -e hello'\033[0;31mred\033[0;32mgreen\033[0;34mblue\033[0mnormal';echo 1
            printf "\033[32m%-5s\033[m | \033[32m%-140s\033[m | \033[32m%-20s\033[m\n " $totalTestCount $line PASSED
            #echo       @@@@@@@@ PASSED @@@@@@@@@
            #echo       
            echo $totalPassedTestCount . $line ------- PASSED >> $1-passed.txt



            echo $totalPassedTestCount:$line:Passed>> result.txt


        else
            failedTestCount=$((failedTestCount+1))
            #echo "$totalTestCount  $line  Failed"


            printf "\033[41m%-5s\033[0m | \033[41m%-140s\033[0m | \033[31;5m%-20s\033[0m\n " $totalTestCount $line FAILED
            #echo       ======= FAILED =========
            #echo 
            echo  >> $1-failed.txt
            echo $failedTestCount   $line ------- FAILED >> $1-failed.txt
            echo ================================================================================================================================ >> $1-failed.txt

            echo $line >> $1-re-encounter.txt
            cat $1-error-msg.txt >> $1-failed.txt
        fi

        #echo "Finished"
    done < "$2"
    cp $1-re-encounter.txt $2
}


if [ -s $input ]
    then 
        for i in $(seq $2 $END);
        do 

            num_of_lines=$(cat $input | wc -l)
            if [ -s $input ]
                then 
                    echo ;
                    echo ============================================================================;
                    echo ===============================   LOOP: $i  ====================================;
                    echo ============================================================================;
                    echo ;

                    # execute main function
                    executeTest $1 $input $3 $4
            else
                echo ;
                echo ============================================================================;
                echo ===============================   LOOP: END  ====================================;
                echo ============================================================================;
                echo ;
                echo FINAL RESULT;
                echo ===================;
                echo $'\e[1;32m'PASSED TEST: $totalPassedTestCount;
                echo $'\e[1;31m'FAILED TEST: $num_of_lines;
                echo ;
                exit;     
            fi  
        done

        echo ;
        echo ============================================================================;
        echo ===============================   LOOP: END  ====================================;
        echo ============================================================================;
        echo ;
        echo FINAL RESULT;
        echo ===================;
        echo $'\e[1;32m'PASSED TEST: $totalPassedTestCount;
        echo $'\e[1;31m'FAILED TEST: $num_of_lines;
        echo ;
else
    echo NO SPEC FOUND FOR TEST;
fi    
