FROM node:16.3.0-alpine

WORKDIR /app

COPY package.json .

# RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
