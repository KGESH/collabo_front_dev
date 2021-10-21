
FROM node:14-alpine AS builder

WORKDIR /collabo_front

ENV PATH /collabo_front/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --silent

COPY . .

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/configfile.template

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY --from=builder /collabo_front/build .

ENV PORT 8080
ENV HOST 0.0.0.0
ENV NODE_ENV production
EXPOSE 8080

CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
