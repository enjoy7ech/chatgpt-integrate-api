from node:16-slim

workdir /app
copy . .
run npm i

cmd ["npm", "start"]
expose 3000