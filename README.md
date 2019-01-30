# car-gallery

Simple web app that allows a user to select their car from a directory of registered cars.

**NOTE: Requirements [here](assignment.md)**

## On this page

1.  [Service](#service)
1.  [Scripts](#scripts)

## Service

There's an API service running on a [Heroku app](https://car-list-service.herokuapp.com) to provide data.  
It is a dockerized node app, which is available at [sombreroenpuntas/car-list-service](https://hub.docker.com/r/sombreroenpuntas/car-list-service).  
Source code is included also in [Dockerfile](apiserver/Dockerfile).

## Scripts

The provided web app is built with `Next.js`.

The following scripts are available:

```js
yarn test   // run unit & integration tests with jest
yarn lint   // run eslint & prettier code checks
yarn dev    // starts dev server locally, with hot reload
yarn build  // generate PRD bundle
yarn start  // starts PRD server
```
