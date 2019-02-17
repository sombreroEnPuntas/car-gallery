// @flow

import React, { Component, Fragment } from 'react'

// Components
import Coin from './wrappers/Coin'
import DropdownItem from './wrappers/DropdownItem'
import DropdownList from './wrappers/DropdownList'
import DropdownWrap from './wrappers/DropdownWrap'
import Earned from './wrappers/Earned'
import FormLineWrap from './wrappers/FormLineWrap'
import Input from './wrappers/Input'

import type { HandleUpdateT } from '../pages'

type HandleEventT = ({ target: { id: string, value: string } }) => void

export type DropdownFieldT = {|
  +disabled: boolean,
  +handleUpdate: HandleUpdateT,
  +name: string,
  +placeholder?: string,
  +valid: boolean,
  +value: string,
  +values: Array<string>,
|}

class DropdownField extends Component<DropdownFieldT> {
  handleEvent: HandleEventT = ({ target: { value, id } }) =>
    this.props.handleUpdate(value || id, this.props.name)

  render() {
    const { name, valid, value, values, ...inputProps } = this.props
    const { handleEvent } = this
    const options = values
      .filter(option => value && option.includes(value))
      .slice(0, 6)

    return (
      <Fragment>
        <FormLineWrap>
          {valid && (
            <Earned>
              <Coin />
            </Earned>
          )}
          <Input
            name={name}
            autoComplete="off"
            onChange={handleEvent}
            status={valid ? 'success' : null}
            type="text"
            value={value}
            {...inputProps}
          />
        </FormLineWrap>
        {options.length >= 1 && !valid && (
          <FormLineWrap>
            <DropdownWrap>
              <DropdownList>
                {options.map(value => (
                  <DropdownItem
                    id={value}
                    key={`${name}-${value}`}
                    onClick={handleEvent}
                  >
                    {value}
                  </DropdownItem>
                ))}
              </DropdownList>
            </DropdownWrap>
          </FormLineWrap>
        )}
      </Fragment>
    )
  }
}

export default DropdownField
