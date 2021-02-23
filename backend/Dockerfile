FROM node:15.5.1 AS builder
RUN mkdir -p /src/usr/app
WORKDIR /src/usr/app
COPY package*.json ./
RUN npm install
COPY . .

CMD [ "npm", "run", "dev" ]

#FROM node:15.5.1 AS apiserver
#RUN mkdir -p /application
#WORKDIR /application
#COPY ./dist .
#EXPOSE 3000
#CMD [ "node", "index.js" ]