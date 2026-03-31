FROM node:22.22.2-slim@sha256:80fdb3f57c815e1b638d221f30a826823467c4a56c8f6a8d7aa091cd9b1675ea
WORKDIR /usr/src/app
COPY . .
RUN corepack enable yarn  \
    && yarn install \
    && yarn build
EXPOSE 8080
CMD yarn start
