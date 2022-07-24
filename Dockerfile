FROM node:16-alpine as ts-compiler

RUN mkdir /app
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build


FROM nginx:1.13.12-alpine as main

COPY --from=ts-compiler /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
