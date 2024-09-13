FROM node:lts-iron

RUN npm install pnpm -g

WORKDIR /app

CMD bash meta/docker/dev.run.sh 
