# Hawkeye [![Build Status](https://semaphoreci.com/api/v1/lobarr/hawkeye/branches/master/badge.svg)](https://semaphoreci.com/lobarr/hawkeye)
This is an application that shows rtsp and rtmp streams in a web dashboard

## Setup Instruction
* Install Node 8.6.0
* Clone the repo to your local environment
* Install Yarn package manager `npm install -g yarn`
* Install dependencies `yarn install`
* Install client dependencies by running `yarn install` in the client folder
* Run application (Server, Client and apidocs) `yarn run start-dev`
  * To individually run client `yarn run client`
  * To individually run server `yarn run server`
  * To individually run apidocs `yarn run apidoc`
  * To run server unit tests `yarn run test-server-unit`
  * To run server integration tests `yarn run test-server-integration`

Client would be running on http://localhost:3000, Server would be running on http://localhost:3001 and apidocs would be running on http://localhost:5000

#### Note: Saving would automatically restart the application

#### Note: You'll need a .env file I have so when you clone this repo, ask me for it
