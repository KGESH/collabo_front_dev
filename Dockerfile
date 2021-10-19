
FROM node:14

WORKDIR /collabo_front

ENV PATH /collabo_front/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --silent

RUN npm install react-scripts@ 4.0.3 -g

CMD [ "npm", "start" ]