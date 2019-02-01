// @flow

export const makesList = ['Ford', 'Opel']

// API
export const errorAPIResponse = {
  error: true,
  message:
    'invalid json response body at https://car-list-service.herokuapp.com/api/some-end-point reason: Unexpected token U in JSON at position 0',
  type: 'invalid-json',
}

export const makesAPIResponse = makesList
