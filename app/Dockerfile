FROM node:14-alpine as builder

WORKDIR /usr/src/app

COPY . .

RUN yarn install

RUN yarn build


FROM nginx as production

COPY --from=builder /usr/src/app/build /usr/share/nginx/html 

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
