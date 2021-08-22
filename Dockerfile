# syntax=docker/dockerfile:1

FROM node:16.6.2
ENV NODE_ENV=production

RUN git clone https://github.com/hperronnet/discord-nasa-picture-of-the-day.git

WORKDIR /discord-nasa-picture-of-the-day

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "src/index.js" ]

