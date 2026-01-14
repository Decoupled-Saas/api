FROM node:22.21.1-slim@sha256:25b3eb23a00590b7499f2a2ce939322727fcce1b15fdd69754fcd09536a3ae2c
WORKDIR /usr/src/app
COPY . .
RUN corepack enable yarn  \
    && yarn install \
    && yarn build
EXPOSE 8080
CMD yarn start
