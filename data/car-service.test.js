// @flow

// Data
import { CAR_SERVICE_URL } from './constants'
import {
  errorAPIResponse,
  internalError,
  makesList,
  modelsList,
  setAPIMockImplementation,
  vehiclesList,
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
    displayName      | data                  | response            | endpoint                                                | make         | model        | error
    ${'getMakes'}    | ${makesList}          | ${makesList}        | ${`${CAR_SERVICE_URL}/makes`}                           | ${undefined} | ${undefined} | ${null}
    ${'getMakes'}    | ${`Wut?`}             | ${internalError}    | ${`${CAR_SERVICE_URL}/makes`}                           | ${undefined} | ${undefined} | ${`internal`}
    ${'getMakes'}    | ${`418 I'm a teapot`} | ${errorAPIResponse} | ${`${CAR_SERVICE_URL}/makes`}                           | ${undefined} | ${undefined} | ${`API`}
    ${'getModels'}   | ${`Wut?`}             | ${internalError}    | ${`${CAR_SERVICE_URL}/models?make=ford`}                | ${'ford'}    | ${undefined} | ${`internal`}
    ${'getModels'}   | ${modelsList}         | ${modelsList}       | ${`${CAR_SERVICE_URL}/models?make=ford`}                | ${'ford'}    | ${undefined} | ${null}
    ${'getModels'}   | ${`418 I'm a teapot`} | ${errorAPIResponse} | ${`${CAR_SERVICE_URL}/models?make=ford`}                | ${'ford'}    | ${undefined} | ${`API`}
    ${'getVehicles'} | ${vehiclesList}       | ${vehiclesList}     | ${`${CAR_SERVICE_URL}/vehicles?make=ford&model=fiesta`} | ${'ford'}    | ${'fiesta'}  | ${null}
    ${'getVehicles'} | ${`Wut?`}             | ${internalError}    | ${`${CAR_SERVICE_URL}/vehicles?make=ford&model=fiesta`} | ${'ford'}    | ${'fiesta'}  | ${`internal`}
    ${'getVehicles'} | ${`418 I'm a teapot`} | ${errorAPIResponse} | ${`${CAR_SERVICE_URL}/vehicles?make=ford&model=fiesta`} | ${'ford'}    | ${'fiesta'}  | ${`API`}
  `(
    `$displayName`,
    ({ displayName, data, response, endpoint, make, model, error }) => {
      afterEach(() => {
        fetch.mockClear()
      })

      it(`calls the right endpoint and returns ${
        error ? `${error} error` : 'data'
      }`, async () => {
        setFetchMock(data, error)

        const result = await carService[displayName](make, model)

        expect(result).toEqual(response)

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(endpoint)
      })
    }
  )
})
