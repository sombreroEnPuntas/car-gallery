// @flow

// Data
import { CAR_SERVICE_URL } from './constants'
import {
  badInputAPIResponse,
  errorAPIResponse,
  makesAPIResponse,
  makesList,
  modelsAPIResponse,
} from './mocks'

// Dependencies
import fetch from 'isomorphic-unfetch'

// Tested unit
import * as carService from './car-service'

// Mocks
jest.mock('isomorphic-unfetch')
const setFetchMock = (data, error) =>
  fetch.mockImplementation(() =>
    error
      ? Promise.reject(error)
      : Promise.resolve({ json: () => Promise.resolve(data) })
  )

describe('carService', () => {
  afterAll(() => {
    jest.resetAllMocks() // clean .mock
  })

  describe.each`
    displayName    | APIResponse            | endpoint                             | param        | error
    ${'getMakes'}  | ${makesAPIResponse}    | ${`${CAR_SERVICE_URL}/makes`}        | ${undefined} | ${false}
    ${'getMakes'}  | ${errorAPIResponse}    | ${`${CAR_SERVICE_URL}/makes`}        | ${undefined} | ${true}
    ${'getModels'} | ${modelsAPIResponse}   | ${`${CAR_SERVICE_URL}/models?make=`} | ${'ford'}    | ${false}
    ${'getModels'} | ${errorAPIResponse}    | ${`${CAR_SERVICE_URL}/models?make=`} | ${'ford'}    | ${true}
    ${'getModels'} | ${badInputAPIResponse} | ${`${CAR_SERVICE_URL}/models?make=`} | ${'space x'} | ${true}
  `(`$displayName`, ({ displayName, APIResponse, endpoint, param, error }) => {
    afterEach(() => {
      fetch.mockClear()
    })

    it(`calls the right endpoint and returns ${
      error ? 'error' : 'data'
    }`, async () => {
      setFetchMock(APIResponse, error ? errorAPIResponse : null)

      const data = await carService[displayName](
        param,
        param ? makesList : undefined
      )

      expect(data).toEqual(APIResponse)

      if (APIResponse.type1 == 'bad-input') {
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`${endpoint}${param ? param : ''}`)
      }
    })
  })
})
