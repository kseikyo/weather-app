FROM node:latest

WORKDIR /user/src/app 

COPY ./package.json ./

COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm" ]

CMD ["start"]