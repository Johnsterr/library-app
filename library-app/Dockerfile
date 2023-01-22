FROM node:18.12.0-alpine
WORKDIR /usr/library-app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install -g npm@8.19.3
RUN npm install -g typescript
RUN npm install -g @nestjs/cli
RUN npm install
COPY . .
EXPOSE 3000
RUN chown -R node /usr/library-app
USER node
RUN tsc
CMD ["npm", "run", "start:dev"]