# Pokédex

This repository is a template for a Pokédex application. It contains a server-side
REST API built using [NestJS](https://nestjs.com) and a client-side single-page
application built in [Angular](https://angular.dev).

## Prerequisites
* [Node.js v20](https://nodejs.org/en)

## Run in Docker environment
1. Clone the repository.
2. Turn on your Docker daemon and ensure that it is running.
3. Run the following command in the root directory of the project

```shell
docker-compose up --build
```
`URL: http://localhost:4200`

## Run locally (dev)
1. Clone the repository.
2. Install Client and Server dependencies:
    ```shell
    npm run install:all
    ```

3. Start the Client and Server:
    ```shell
    npm run start:all
    ```
    `Server URL: http://localhost:3000`
    `Frontend URL: http://localhost:4200`

## Run Nest JS tests (server side) with Jest
```shell
cd api/
npm run test
```

## Run Angular tests (client side) with Jest
```shell
cd app/
npm run test
```