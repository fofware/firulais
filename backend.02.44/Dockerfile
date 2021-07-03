FROM node:16.3.0-alpine3.13 AS builderbackend

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

#RUN npm install --production --silent && mv node_modules ../
RUN npm install

COPY . .

RUN npm run build


## Final image
FROM node:16.3.0-alpine3.13 AS backend

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY --from=builderbackend /usr/src /usr/src

RUN rm -R src

RUN rm -R *.json

#EXPOSE 4400

CMD ["node", "dist/index.js"]