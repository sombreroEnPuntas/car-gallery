// Data
import { CAR_SERVICE_URL } from './constants'
import { errorAPIResponse, makesAPIResponse } from './mocks'

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

  describe('getMakes', () => {
    afterEach(() => {
      fetch.mockClear()
    })

    it('calls the right endpoint and returns data', async () => {
      setFetchMock(makesAPIResponse)

      const data = await carService.getMakes()

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(`${CAR_SERVICE_URL}/makes`)

      expect(data).toEqual(makesAPIResponse)
    })

    it('handles errors!', async () => {
      setFetchMock(makesAPIResponse, errorAPIResponse)

      const data = await carService.getMakes()

      expect(data).toEqual(errorAPIResponse)
    })
  })
})
