# Pokédex

This repository is a template for a Pokédex application. It contains a server-side
REST API built using [NestJS](https://nestjs.com) and a client-side single-page
application built in [Angular](https://angular.dev).

## Prerequisites
* [Node.js v20](https://nodejs.org/en)

## Run in Docker environment
1. Turn on your Docker daemon and ensure that it is running.
2. Run the following command in the root directory of the project

```shell
docker-compose up --build
```

## Run locally (development)
1. Clone the repository.
2. Install dependencies:
    ```shell
    cd api/
    npm install
    ```
    ```shell
    cd ../app/
    npm install
    ```

3. In two separate shells, start the Api and App:
    ```shell
    cd api/
    npm run start
    ```
    `URL: http://localhost:3000`
    ```shell
    cd app/
    npm run start
    ```
    `URL: http://localhost:4200`


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