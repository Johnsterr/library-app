FROM node:18.12.0-alpine
WORKDIR /usr/book-views-counter
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install -g npm@8.19.3
RUN npm install
COPY . .
EXPOSE 3030
RUN chown -R node /usr/book-views-counter
USER node
CMD ["npm", "run", "dev"]
