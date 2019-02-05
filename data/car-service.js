// @flow

// NextJS requires a polyfill
import fetch from 'isomorphic-unfetch'
import { CAR_SERVICE_URL } from './constants'

const fetchFromEndpoint = async (
  endpoint: 'makes' | 'models',
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
    let data = []
    json.forEach(item => data.push(item.toLowerCase()))

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
