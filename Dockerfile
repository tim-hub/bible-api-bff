FROM node:lts-alpine

EXPOSE 3000
WORKDIR /src/bible-api-gateway

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run test
RUN npm run build


CMD [ "npm", "start" ]
