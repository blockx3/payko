#!/bin/bash

is_all_var_set=1
for var in $(cat .env.example | grep = | awk -F '=' '{ print $1 }')
  do if [[ $var ]] 
    then echo "$var not set!"
    is_all_var_set=0
  fi
done
if [[ $is_all_var_set == 0 ]]
  then exit
fi

HOSTNAME="0.0.0.0" node server.js

