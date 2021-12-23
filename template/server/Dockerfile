FROM node:16.0-alpine
WORKDIR /usr/server
COPY package*.json ./
#RUN npm install
COPY . .
ENV DEBUG=server:*
CMD ["npm", "start"]