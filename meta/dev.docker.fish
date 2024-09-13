#!/bin/env fish

set available_commands 'dev, clean, psql, migrate'

if not set -q argv[1]
  echo available commands: $available_commands
  exit 
end

set -x project (realpath (printf (dirname (realpath (status --current-filename)))'/..'))
set -x user (id -u)':'(id -g)

echo [Project Dir] $project
echo [User] $user

if [ $argv[1] = "dev" ]
  docker-compose -f $project/meta/docker/dev.compose.yml up --build
else if [ $argv[1] = "clean" ]
  docker-compose -f $project/meta/docker/dev.compose.yml down -v
else if [ $argv[1] = "psql" ]
  docker-compose -f $project/meta/docker/dev.compose.yml exec -it postgresql ash -c "PGPASSWORD=password psql -Uuser1 -ddb1"
else if [ $argv[1] = "migrate" ]
  if not set -q argv[2]
    set argv[2] init
  end
  echo [migrating] name: $argv[2]

  docker-compose -f $project/meta/docker/dev.compose.yml exec -it web bash -c "pnpm dlx prisma migrate dev --name "$argv[2]
else
  echo
  echo unknown command
  echo available commands: $available_commands
end
