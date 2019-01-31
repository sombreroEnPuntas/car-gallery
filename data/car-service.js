// NextJS requires a polyfill
import fetch from 'isomorphic-unfetch'
import { CAR_SERVICE_URL } from './constants'

export const getMakes = async () => {
  let result

  try {
    const response = await fetch(`${CAR_SERVICE_URL}/makes`)
    const json = await response.json()

    result = json
  } catch (error) {
    result = { error: true, ...error }
  }

  return result
}
