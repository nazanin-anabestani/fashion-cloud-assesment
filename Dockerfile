FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run migrate

EXPOSE 8080
CMD [ "npm", "start" ]
