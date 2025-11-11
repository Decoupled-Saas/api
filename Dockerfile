FROM node:22.21.1-slim@sha256:8833056542b4e17c27154beeabbc27c3e14ddfe3fb9183f43b3adf7eb0462923
WORKDIR /usr/src/app
COPY . .
RUN corepack enable yarn  \
    && yarn install \
    && yarn build
EXPOSE 8080
CMD yarn start
