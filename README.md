# car-gallery

Try it out on [`Heroku`](https://car-gallery-demo.herokuapp.com/)!

[![Build Status](https://travis-ci.com/sombreroEnPuntas/car-gallery.svg?branch=master)](https://travis-ci.com/sombreroEnPuntas/car-gallery)
[![codecov](https://codecov.io/gh/sombreroEnPuntas/car-gallery/branch/master/graph/badge.svg)](https://codecov.io/gh/sombreroEnPuntas/car-gallery)
[![Maintainability](https://api.codeclimate.com/v1/badges/ee4b4c3135deb8981c42/maintainability)](https://codeclimate.com/github/sombreroEnPuntas/car-gallery/maintainability)

Simple web app that allows a user to select their car from a directory of registered cars.

**NOTE: Requirements [here](assignment.md)**

## On this page

1.  [Service](#service)
1.  [Scripts](#scripts)
1.  [CI](#ci)
1.  [Web app](#web-app)

## Service

There's an API service running on a [Heroku app](https://car-list-service.herokuapp.com) to provide data.  
It is a dockerized node app, which is available at [sombreroenpuntas/car-list-service](https://hub.docker.com/r/sombreroenpuntas/car-list-service).  
Source code is included also in [Dockerfile](apiserver/Dockerfile).

## Scripts

The provided web app is built with `Next.js`.

The following scripts are available:

```js
yarn test   // run unit & integration tests with jest
yarn lint   // run flow, eslint & prettier code checks
yarn dev    // starts dev server locally, with hot reload
yarn build  // generate PRD bundle
yarn start  // starts PRD server
```

## CI

- `husky` enforces linting when committing code (runs locally)
- Travis CI will pick every _push_ and run test suites, and will trigger a `Heroku` deploy for `master` branch.
- `codecov` keeps an eye on the test coverage, and `codeclimate` prevents accumulating technical debt

## Web app

There's a web app deployed as a [Heroku app](https://car-gallery-demo.herokuapp.com/), mmatching latest master.
