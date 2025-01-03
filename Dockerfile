FROM node:22.12.0-slim
WORKDIR /usr/src/app
COPY package.json .
RUN yarn && yarn build
EXPOSE 8080
CMD yarn start
