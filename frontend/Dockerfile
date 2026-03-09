FROM node:24-bookworm

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
EXPOSE 51731
CMD [ "npm","run","dev","--","--host" ]
