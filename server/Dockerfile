FROM node:14.16.1-alpine3.13

ARG NODE_ENV="development"

RUN mkdir /server

RUN mkdir -p /var/www/html/images

RUN apk add --no-cache python3 make g++ && \
    python3 -m ensurepip && \
    ln -sf python3 /usr/bin/python && \
    pip3 install --upgrade pip

WORKDIR /server

COPY package*.json ./

RUN npm install -g nodemon
RUN npm install -g sequelize-cli

RUN npm install

COPY . .

EXPOSE 3000

CMD sequelize db:migrate && sequelize db:seed:all && npm start
