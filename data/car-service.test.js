// @flow

// Data
import { CAR_SERVICE_URL } from './constants'
import {
  errorAPIResponse,
  internalError,
  makesList,
  modelsList,
  setAPIMockImplementation,
} from './mocks'

// Dependencies
import fetch from 'isomorphic-unfetch'

// Tested unit
import * as carService from './car-service'

// Mocks
jest.mock('isomorphic-unfetch')
const setFetchMock = (data, error) =>
  fetch.mockImplementation(setAPIMockImplementation(data, error))

describe('carService', () => {
  afterAll(() => {
    jest.resetAllMocks() // clean .mock
  })

  describe.each`
    displayName    | data                  | response            | endpoint                             | param        | error
    ${'getMakes'}  | ${makesList}          | ${makesList}        | ${`${CAR_SERVICE_URL}/makes`}        | ${undefined} | ${null}
    ${'getMakes'}  | ${`Wut?`}             | ${internalError}    | ${`${CAR_SERVICE_URL}/makes`}        | ${undefined} | ${`internal`}
    ${'getMakes'}  | ${`418 I'm a teapot`} | ${errorAPIResponse} | ${`${CAR_SERVICE_URL}/makes`}        | ${undefined} | ${`API`}
    ${'getModels'} | ${modelsList}         | ${modelsList}       | ${`${CAR_SERVICE_URL}/models?make=`} | ${'ford'}    | ${null}
    ${'getModels'} | ${`Wut?`}             | ${internalError}    | ${`${CAR_SERVICE_URL}/models?make=`} | ${'ford'}    | ${`internal`}
    ${'getModels'} | ${`418 I'm a teapot`} | ${errorAPIResponse} | ${`${CAR_SERVICE_URL}/models?make=`} | ${'ford'}    | ${`API`}
  `(
    `$displayName`,
    ({ displayName, data, response, endpoint, param, error }) => {
      afterEach(() => {
        fetch.mockClear()
      })

      it(`calls the right endpoint and returns ${
        error ? `${error} error` : 'data'
      }`, async () => {
        setFetchMock(data, error)

        const result = await carService[displayName](param)

        expect(result).toEqual(response)

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`${endpoint}${param ? param : ''}`)
      })
    }
  )
})
