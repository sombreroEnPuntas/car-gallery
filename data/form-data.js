// @flow

// Utils
import { path, pathOr } from 'ramda'

// Components
import type { DropdownFieldT } from '../components/dropdown-filed'

export const makeFieldHelper: (*, *) => string => DropdownFieldT = (
  state,
  handleUpdate
) => key => ({
  disabled: key === 'model' && !path(['formData', 'make', 'valid'], state),
  handleUpdate: handleUpdate,
  name: key,
  placeholder:
    key === 'model' && !path(['formData', 'make', 'valid'], state)
      ? 'Chose make first!'
      : undefined,
  // $FlowIgnore compose returns boolean when evaluated
  valid: pathOr(false, ['formData', key, 'valid'], state),
  // $FlowIgnore compose returns string when evaluated
  value: pathOr('', ['formData', key, 'value'], state),
  // $FlowIgnore compose returns [string] when evaluated
  values: pathOr([], ['formData', key, 'values'], state),
})
