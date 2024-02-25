FROM node:latest
WORKDIR /app
COPY package*.json ./
COPY . .
RUN rm -rf node_modules/
RUN npm install&& npm install -g typescript
RUN npm install --production
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
