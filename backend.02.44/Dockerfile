FROM node:16.3.0-alpine3.13 AS builderbackend

WORKDIR /usr/src/app

COPY package*.json ./

#RUN npm install --production --silent && mv node_modules ../
RUN npm install

COPY . .

RUN npm run build


## Final image
FROM node:16.3.0-alpine3.13 AS backend

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production && npm cache clean --force

COPY --from=builderbackend /usr/src /usr/src

RUN rm -R src

RUN rm -R *.json

CMD ["node", "dist/index.js"]