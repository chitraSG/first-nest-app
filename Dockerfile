FROM node:18.16.1-buster as build
COPY . /var/app/user
WORKDIR /var/app/user
RUN npm install
RUN npm run build