FROM node:8.2.1

RUN mkdir -p /app/project

WORKDIR /app/project

COPY . /app/project

EXPOSE 13022

ENTRYPOINT ["npm", "run", "start"]
