// @flow

import React, { Component } from 'react'

// Data
import { getCarOptionsByKey } from '../data/form-data'

// Components
import Coin from './wrappers/Coin'
import Earned from './wrappers/Earned'
import FormLineWrap from './wrappers/FormLineWrap'
import Select from './wrappers/Select'
import SelectItem from './wrappers/SelectItem'

import type { HandleUpdateT } from '../pages'

type HandleEventT = ({ target: { value: string } }) => void

export type SelectFieldT = {|
  +disabled: boolean,
  +handleUpdate: HandleUpdateT,
  +name: string,
  +placeholder?: string,
  +valid: boolean,
  +value: string,
  +values: Array<string>,
|}

class SelectField extends Component<SelectFieldT> {
  handleEvent: HandleEventT = ({ target: { value } }) =>
    this.props.handleUpdate(value, this.props.name)

  render() {
    const { name, valid, values, placeholder, ...inputProps } = this.props
    const { handleEvent } = this
    const options = getCarOptionsByKey(name)(values)

    return (
      <FormLineWrap>
        <Select
          autoComplete="off"
          name={name}
          onChange={handleEvent}
          status={valid ? 'success' : null}
          type="text"
          {...inputProps}
        >
          <SelectItem id={`${name}-placeholder`} key={`${name}-placeholder`}>
            {placeholder || ''}
          </SelectItem>
          {options.map(value => (
            <SelectItem id={`${name}-${value}`} key={`${name}-${value}`}>
              {value}
            </SelectItem>
          ))}
        </Select>
        {valid && (
          <Earned>
            <Coin />
          </Earned>
        )}
      </FormLineWrap>
    )
  }
}

export default SelectField
