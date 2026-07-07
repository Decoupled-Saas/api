FROM node:22.23.1-slim@sha256:53ada149d435c38b14476cb57e4a7da73c15595aba79bd6971b547ceb6d018bf
WORKDIR /usr/src/app
COPY . .
RUN corepack enable yarn  \
    && yarn install \
    && yarn build
EXPOSE 8080
CMD yarn start
