FROM node:22.21.1-slim@sha256:330fc735268c38d88788c3469a8dff2d0ad834af58569a42c61c47e4578d953b
WORKDIR /usr/src/app
COPY . .
RUN corepack enable yarn  \
    && yarn install \
    && yarn build
EXPOSE 8080
CMD yarn start
