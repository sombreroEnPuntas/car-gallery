// @flow

export const makesList = ['ford', 'opel']
export const modelsList = ['explorer', 'fiesta']
export const vehiclesList = [
  {
    make: 'ford',
    model: 'fiesta',
    enginePowerPS: '54',
    enginePowerKW: '40',
    fuelType: 'diesel',
    bodyType: 'limousine',
    engineCapacity: '1119',
  },
  {
    make: 'ford',
    model: 'fiesta',
    enginePowerPS: '60',
    enginePowerKW: '44',
    fuelType: 'benzin',
    bodyType: 'limousine',
    engineCapacity: '1299',
  },
  {
    make: 'ford',
    model: 'fiesta',
    enginePowerPS: '68',
    enginePowerKW: '50',
    fuelType: 'diesel',
    bodyType: 'limousine',
    engineCapacity: '1399',
  },
]

// API
export const internalError = {
  error: `Wut?. SyntaxError`,
}

export const errorAPIResponse = { error: `418 I'm a teapot` }

type ErrorTypeT = 'internal' | 'API'

export const setAPIMockImplementation = (data: *, error: ?ErrorTypeT) => () =>
  error === 'internal'
    ? Promise.reject(new SyntaxError(data))
    : Promise.resolve({
        text: () =>
          Promise.resolve(error === 'API' ? data : JSON.stringify(data)),
      })

export const setCarServiceMockImplementation = (
  data: *,
  error: ?ErrorTypeT
) => () =>
  error === 'internal'
    ? Promise.reject(internalError)
    : Promise.resolve(error ? errorAPIResponse : data)
