FROM node:12.18-alpine as app-builder
ENV NODE_ENV production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent


FROM node:12.18-alpine
ENV NODE_ENV production
WORKDIR /app

COPY --from=app-builder /app/node_modules /app/node_modules
COPY . .
EXPOSE 3000

CMD ["npm", "run", "start"]