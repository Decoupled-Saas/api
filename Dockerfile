FROM node:24.11.1-slim@sha256:f752e4821362614eab35016f01dea3af61d2f59d0445381c25683e4331520a7b
WORKDIR /usr/src/app
COPY . .
RUN corepack enable yarn  \
    && yarn install \
    && yarn build
EXPOSE 8080
CMD yarn start
