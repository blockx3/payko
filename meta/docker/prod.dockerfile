FROM node:lts-iron AS build_stage
RUN --mount=type=cache,target=~/.npm npm install pnpm -g
COPY . /app
WORKDIR /app
RUN --mount=type=cache,target=node_modules --mount=type=cache,target=.next/cache pnpm install --frozen-lockfile
RUN --mount=type=cache,target=node_modules --mount=type=cache,target=.next/cache pnpm build

FROM node:lts-iron AS run_stage
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLE 1
WORKDIR /app
COPY --from=build_stage /app/public ./public
COPY --from=build_stage /app/.next/standalone ./
COPY --from=build_stage /app/.next/static ./.next/static
COPY --from=build_stage /app/.env.example ./.env.example
COPY --from=build_stage /app/meta/docker/prod.run.sh ./prod.run.sh

ENTRYPOINT ./prod.run.sh 


