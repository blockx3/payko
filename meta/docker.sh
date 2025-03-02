#!/bin/env bash

available_commands='available_commands: dev, clean, psql, migrate, shell, build'

if [[ -z "$1" ]]; then
  echo $available_commands
fi

export project=$(realpath $(printf $(dirname $(realpath $0))'/..'))
export user=$(id -u)':'$(id -g)

echo [Project Dir] $project
echo [User] $user

if [ "$1" == "dev" ]; then
  if [[ ! -e "$project/.env" ]]; then cp $project/.env.example $project/.env; fi
  docker-compose -f $project/meta/docker/dev.compose.yml up --build
elif [ "$1" == "clean" ]; then
  docker-compose -f $project/meta/docker/dev.compose.yml down -v
elif [ "$1" == "psql" ]; then
  docker-compose -f $project/meta/docker/dev.compose.yml exec -it postgresql ash -c "PGPASSWORD=password psql -Uuser1 -ddb1"
elif [ "$1" == "shell" ]; then
  docker-compose -f $project/meta/docker/dev.compose.yml exec -it web bash
elif [ "$1" == "migrate" ]; then
  _name=""
  if [[ -n $2 ]]; then
    _name=$2
  else
    migration_dir=$project/prisma/migrations
    _name=$(find $migration_dir -not -path $migration_dir -type d | xargs -n 1 basename | awk -F '_' 'END {print $2}')
  fi

  echo [migrating] name: $_name

  if [[ "$_name" != ""  ]]; then  
    _name=" --name "$_name
  fi

  docker-compose -f $project/meta/docker/dev.compose.yml exec -it web bash -c "pnpm dlx prisma migrate dev "$name
elif [ "$1" == "build" ]; then
  docker-compose -f $project/meta/docker/prod.compose.yml build
else
  echo
  echo unknown command
  echo available commands: $available_commands
fi
