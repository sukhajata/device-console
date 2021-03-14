FROM node:10-alpine AS build

COPY /client/public /app/public
COPY /client/src /app/src
COPY /client/.env /app
COPY /client/package.json /app

WORKDIR /app

# install dependencies
RUN npm install

# build react-app into build/ folder
RUN npm run build

#start fresh, create server
FROM node:12.7.0-alpine

#copy build folder from step 1
COPY --from=build /app/build /build

COPY /server .

RUN npm install

EXPOSE 9013

CMD ["node", "server.js"]