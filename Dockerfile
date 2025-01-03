FROM node:22.12.0-slim
WORKDIR /usr/src/app
COPY . .
RUN corepack enable yarn  \
    && yarn install \
    && yarn build
EXPOSE 8080
CMD yarn start
