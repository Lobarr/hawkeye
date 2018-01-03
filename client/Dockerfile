FROM node:latest

COPY . /client
WORKDIR /client
RUN yarn install

CMD yarn run start

EXPOSE 3000