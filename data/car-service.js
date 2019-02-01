// @flow

// NextJS requires a polyfill
import fetch from 'isomorphic-unfetch'
import { CAR_SERVICE_URL } from './constants'

export type APIErrorResponseT = { error: boolean, message: string }

export type GetMakesResponseT = Array<string> | APIErrorResponseT
type GetMakesT = () => Promise<GetMakesResponseT>
export const getMakes: GetMakesT = async () => {
  let result

  try {
    const response = await fetch(`${CAR_SERVICE_URL}/makes`)
    const json = await response.json()

    // normalize output
    let makes = []
    json.forEach(make => makes.push(make.toLowerCase()))

    result = makes
  } catch (error) {
    result = { error: true, ...error }
  }

  return result
}

export type GetModelsResponseT = Array<string> | APIErrorResponseT
type GetModelsT = (
  make: string,
  makes: Array<string>
) => Promise<GetModelsResponseT>
export const getModels: GetModelsT = async (make, makes) => {
  let result

  try {
    // normalize input
    const param = make.toLowerCase()

    // validate input
    if (!makes.includes(param)) {
      throw {
        message: `Invalid input provided as parameter.`,
        type: 'bad-input',
      }
    }

    const response = await fetch(`${CAR_SERVICE_URL}/models?make=${make}`)
    const json = await response.json()

    // normalize output
    let models = []
    json.forEach(model => models.push(model.toLowerCase()))

    result = json
  } catch (error) {
    result = { error: true, ...error }
  }

  return result
}
