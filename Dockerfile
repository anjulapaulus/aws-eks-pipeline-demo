FROM node:12.4.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8000
CMD ["node", "index.js"]


