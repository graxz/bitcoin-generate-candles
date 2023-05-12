FROM node:12.18.3-alpine3.12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN docker-compose up -d

COPY . .

EXPOSE 3000

CMD ["npm", "start"]