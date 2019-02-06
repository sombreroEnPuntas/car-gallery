// @flow

// NextJS requires a polyfill
import fetch from 'isomorphic-unfetch'
import { CAR_SERVICE_URL } from './constants'

const fetchFromEndpoint = async (
  endpoint: 'makes' | 'models' | 'vehicles',
  params: ?string
) => {
  let result

  try {
    const response = await fetch(
      `${CAR_SERVICE_URL}/${endpoint}${params ? `?${params}` : ''}`
    )
    const text = await response.text()
    let json

    // response check
    try {
      json = JSON.parse(text)
    } catch (error) {
      throw text
    }

    // normalize output
    let data: Array<*> = []
    json.forEach(item => {
      if (typeof item === 'string') {
        data.push(item.toLowerCase())
      } else {
        let pairs: VehicleT = {}
        Object.keys(item).forEach(key => {
          pairs[key] =
            typeof item[key] === 'string'
              ? item[key].toLowerCase()
              : parseInt(item[key], 10)
        })
        data.push(pairs)
      }
    })

    result = data
  } catch (error) {
    result = error.message
      ? { error: `${error.message}. ${error.name}` }
      : { error }
  }

  return result
}

export type APIErrorResponseT = { error: string }

export type GetMakesResponseT = Array<string> | APIErrorResponseT
type GetMakesT = () => Promise<GetMakesResponseT>
export const getMakes: GetMakesT = () => fetchFromEndpoint('makes')

export type GetModelsResponseT = Array<string> | APIErrorResponseT
type GetModelsT = (make: string) => Promise<GetModelsResponseT>
export const getModels: GetModelsT = make =>
  fetchFromEndpoint('models', `make=${make.toLowerCase()}`)

export type VehicleT = {
  make: string,
  model: string,
  enginePowerPS: number,
  enginePowerKW: number,
  fuelType: string,
  bodyType: string,
  engineCapacity: number,
}

export type GetVehiclesResponseT = Array<VehicleT> | APIErrorResponseT
type GetVehiclesT = (
  make: string,
  model: string
) => Promise<GetVehiclesResponseT>
export const getVehicles: GetVehiclesT = (make, model) =>
  fetchFromEndpoint(
    'vehicles',
    `make=${make.toLowerCase()}&model=${model.toLowerCase()}`
  )
