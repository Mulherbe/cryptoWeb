FROM node:16-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install dotenv cors bcrypt nodemon express mysql

COPY . .

EXPOSE 5000

CMD ["npm","run","dev"]