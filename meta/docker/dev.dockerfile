FROM node:lts-iron

RUN npm install pnpm -g

WORKDIR /app

CMD  id && \
  pnpm install && \
  pnpm dlx prisma migrate dev --name init && \
  pnpm dev
