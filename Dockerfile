FROM node:latest

COPY . /hawkeye
WORKDIR /hawkeye
RUN yarn install

CMD yarn run server

EXPOSE 3001