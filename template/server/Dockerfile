FROM node:16.0-alpine
WORKDIR /usr/server
COPY package*.json ./
RUN npm install pm2 -g
COPY . .
ENV DEBUG=server:*
CMD ["pm2-runtime", "npm", "--", "start"]