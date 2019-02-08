// @flow

// Data
import type { VehicleT } from './car-service'

// Utils
import { path, pathOr, compose, filter, propEq, always } from 'ramda'

// Components
import type { DropdownFieldT } from '../components/dropdown-field'

export const isVehicleKey: string => boolean = key =>
  [
    'bodyType',
    'engineCapacity',
    'enginePowerKW',
    'enginePowerPS',
    'fuelType',
  ].includes(key)

const getFieldPlaceholder = (key, state) => {
  if (key !== 'make' && !path(['formData', 'make', 'valid'], state)) {
    return { disabled: true, placeholder: 'Choose make!' }
  } else if (
    key !== 'make' &&
    key !== 'model' &&
    !path(['formData', 'model', 'valid'], state)
  ) {
    return { disabled: true, placeholder: 'Choose model!' }
  } else {
    return
  }
}

export const makeFieldHelper: (*, *) => string => DropdownFieldT = (
  state,
  handleUpdate
) => key => ({
  ...getFieldPlaceholder(key, state),
  handleUpdate: handleUpdate,
  name: key,
  // $FlowIgnore pathOr returns string when evaluated
  valid: pathOr(false, ['formData', key, 'valid'], state),
  // $FlowIgnore pathOr returns string when evaluated
  value: pathOr('', ['formData', key, 'value'], state),
  values: isVehicleKey(key)
    ? // $FlowIgnore compose returns array when evaluated
      getCarsFiltered(state)
    : // $FlowIgnore pathOr returns string when evaluated
      pathOr([], ['formData', key, 'values'], state),
})

export const getScore = (state: *) =>
  (path(['formData', 'make', 'valid'], state) ? 75 : 0) +
  (path(['formData', 'model', 'valid'], state) ? 75 : 0) +
  (path(['formData', 'bodyType', 'valid'], state) ? 25 : 0) +
  (path(['formData', 'engineCapacity', 'valid'], state) ? 25 : 0) +
  (path(['formData', 'enginePowerKW', 'valid'], state) ? 25 : 0) +
  (path(['formData', 'fuelType', 'valid'], state) ? 25 : 0)

export const getCarOptionsByKey: string => (
  Array<string>
) => Array<string> = key => data => {
  let options = []
  data.forEach(car => !options.includes(car[key]) && options.push(car[key]))
  return options
}

const getFilter = (key, value) =>
  !!value && value !== '' ? propEq(key, value) : always()

export const getCarsFiltered = (state: *) =>
  compose(
    // $FlowIgnore filter returns array when evaluated
    filter(
      getFilter(
        'bodyType',
        // $FlowIgnore pathOr returns string when evaluated
        pathOr('', ['formData', 'bodyType', 'value'], state)
      )
    ),
    // $FlowIgnore filter returns array when evaluated
    filter(
      getFilter(
        'engineCapacity',
        // $FlowIgnore pathOr returns string when evaluated
        pathOr('', ['formData', 'engineCapacity', 'value'], state)
      )
    ),
    // $FlowIgnore filter returns array when evaluated
    filter(
      getFilter(
        'enginePowerKW',
        // $FlowIgnore pathOr returns string when evaluated
        pathOr('', ['formData', 'enginePowerKW', 'value'], state)
      )
    ),
    // $FlowIgnore filter returns array when evaluated
    filter(
      getFilter(
        'enginePowerPS',
        // $FlowIgnore pathOr returns string when evaluated
        pathOr('', ['formData', 'enginePowerPS', 'value'], state)
      )
    ),
    // $FlowIgnore filter returns array when evaluated
    filter(
      getFilter(
        'fuelType',
        // $FlowIgnore pathOr returns string when evaluated
        pathOr('', ['formData', 'fuelType', 'value'], state)
      )
    )
    // $FlowIgnore filter returns array when evaluated
  )(pathOr([], ['formData', 'vehicle', 'values'], state))
