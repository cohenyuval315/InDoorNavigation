FROM node:20.11.1-alpine as base

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install


# Build dist
RUN yarn build


RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]