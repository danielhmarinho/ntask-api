FROM node:8.3

RUN mkdir /api
WORKDIR /api
ADD . /api

RUN npm install nodemon -g
RUN npm install
