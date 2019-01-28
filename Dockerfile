FROM node:11-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add yarn
RUN yarn
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]
