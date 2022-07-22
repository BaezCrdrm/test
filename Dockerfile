FROM node:16-alpine as ts-compiler

RUN mkdir /app
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build


FROM node:16-alpine as main

RUN mkdir /app
WORKDIR /app
COPY package*.json .
COPY --from=ts-compiler /app/dist ./

RUN npm install --omit=dev

EXPOSE 8080

CMD [ "node", "src/index.js" ]
