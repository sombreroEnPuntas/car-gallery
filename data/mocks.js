// @flow

export const makesList = ['ford', 'opel']
export const modelsList = ['explorer', 'fiesta']

// API
export const errorAPIResponse = {
  error: true,
  message:
    'invalid json response body at https://car-list-service.herokuapp.com/api/some-end-point reason: Unexpected token U in JSON at position 0',
  type: 'invalid-json',
}

export const badInputAPIResponse = {
  error: true,
  message: `Invalid input provided as parameter.`,
  type: 'bad-input',
}

export const makesAPIResponse = makesList

export const modelsAPIResponse = modelsList
