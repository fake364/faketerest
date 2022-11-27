FROM node:14.17.1 as dependencies

WORKDIR /faketerest

EXPOSE 3000

COPY . .

RUN npm install

RUN npm run build

CMD npm run start