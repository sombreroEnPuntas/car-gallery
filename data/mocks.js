// @flow

export const makesList = ['ford', 'opel']
export const modelsList = ['explorer', 'fiesta']

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
