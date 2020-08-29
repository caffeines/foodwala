FROM node:10.16.3

RUN mkdir -p /home/manush-ai-task/app/node_modules && chown -R node:node /home/manush-ai-task/app

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

WORKDIR /home/manush-ai-task/app

COPY package*.json ./

USER node

COPY --chown=node:node . .

EXPOSE 4123

CMD [ "node", "server.js" ]