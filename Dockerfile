FROM node:20.5.1-alpine

WORKDIR /app

# RUN npm install -g yarn 

COPY package.json yarn.lock /app

RUN yarn install

COPY . /app

RUN yarn build

EXPOSE 3000

CMD ["yarn", "run", "start:prod"]