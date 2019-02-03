// @flow

// NextJS requires a polyfill
import fetch from 'isomorphic-unfetch'
import { CAR_SERVICE_URL } from './constants'

export type APIErrorResponseT = { error: string }

export type GetMakesResponseT = Array<string> | APIErrorResponseT
type GetMakesT = () => Promise<GetMakesResponseT>
export const getMakes: GetMakesT = async () => {
  let result

  try {
    const response = await fetch(`${CAR_SERVICE_URL}/makes`)
    const text = await response.text()
    let json

    // response check
    try {
      json = JSON.parse(text)
    } catch (error) {
      throw text
    }

    // normalize output
    let makes = []
    json.forEach(make => makes.push(make.toLowerCase()))

    result = makes
  } catch (error) {
    result = error.message
      ? { error: `${error.message}. ${error.name}` }
      : { error }
  }

  return result
}

export type GetModelsResponseT = Array<string> | APIErrorResponseT
type GetModelsT = (make: string) => Promise<GetModelsResponseT>
export const getModels: GetModelsT = async make => {
  let result

  try {
    // normalize input
    const param = make.toLowerCase()

    const response = await fetch(`${CAR_SERVICE_URL}/models?make=${param}`)
    const text = await response.text()
    let json

    // response check
    try {
      json = JSON.parse(text)
    } catch (error) {
      throw text
    }

    // normalize output
    let models = []
    json.forEach(model => models.push(model.toLowerCase()))

    result = models
  } catch (error) {
    result = error.message
      ? { error: `${error.message}. ${error.name}` }
      : { error }
  }

  return result
}
