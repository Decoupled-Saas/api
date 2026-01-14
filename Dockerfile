FROM node:22.22.0-slim@sha256:fbec45099b67841ba7d32c74b42c55fd96403e43d0c3181dc049606737f1ee5c
WORKDIR /usr/src/app
COPY . .
RUN corepack enable yarn  \
    && yarn install \
    && yarn build
EXPOSE 8080
CMD yarn start
