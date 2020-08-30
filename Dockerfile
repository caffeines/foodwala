FROM node:10.16.3

RUN mkdir -p /home/foodwala/app/node_modules && chown -R node:node /home/foodwala/app

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

WORKDIR /home/foodwala/app

COPY package*.json ./

USER node

COPY --chown=node:node . .

RUN npm install

EXPOSE 4123

CMD [ "node", "server.js" ]