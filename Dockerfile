FROM node:22.20.0-slim@sha256:d943bf20249f8b92eff6f605362df2ee9cf2d6ce2ea771a8886e126ec8714f08
WORKDIR /usr/src/app
COPY . .
RUN corepack enable yarn  \
    && yarn install \
    && yarn build
EXPOSE 8080
CMD yarn start
