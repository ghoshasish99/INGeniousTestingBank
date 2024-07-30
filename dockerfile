FROM node:20.15-alpine3.19

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps
RUN yarn install

EXPOSE 3000
EXPOSE 3001

CMD ["yarn", "dev"]