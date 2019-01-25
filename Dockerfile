FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9002

ENV RELIC_KEY=a82596e685757bc86351abb9b4e61a77ec41a95a POSTGRES_USERNAME=postgres POSTGRES_PASSWORD=Leviathan6 NODE_ENV=production API_URL=ec2-18-235-34-167.compute-1.amazonaws.com DB_URL=ec2-52-201-21-135.compute-1.amazonaws.com

CMD ["npm", "run", "dev"]