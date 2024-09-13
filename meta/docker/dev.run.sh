#!/bin/env bash

id 

pnpm install 

migration_dir=prisma/migrations
migration_name=$(find $migration_dir -not -path $migration_dir -type d | xargs -n 1 basename | awk -F '_' 'END {print $2}')
if [[ "$migration_name" == "" ]]; then
  migration_name="init"
fi

echo migration_name: $migration_name

pnpm dlx prisma migrate dev --name $migration_name  

pnpm dev
