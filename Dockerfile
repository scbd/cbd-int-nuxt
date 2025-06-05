FROM node:22.16.0-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

RUN npm install --prefix assets/bootstrap
RUN npm run dist --prefix assets/bootstrap
RUN npm run build

ENV PORT=3000

EXPOSE 3000

CMD ["node", "-r", "dotenv/config", ".output/server/index.mjs"]
