// @flow

import React, { Component, Fragment } from 'react'

// Components
import CoinEarned from '../components/wrappers/CoinEarned'
import DropdownItem from '../components/wrappers/DropdownItem'
import DropdownList from '../components/wrappers/DropdownList'
import DropdownWrap from '../components/wrappers/DropdownWrap'
import FormLineWrap from '../components/wrappers/FormLineWrap'
import Input from '../components/wrappers/Input'

import type { HandleUpdateT } from '../pages'

type HandleChangeT = (SyntheticInputEvent<HTMLInputElement>) => void
type HandleClickT = ({ target: { id: string } }) => void

export type DropdownFieldT = {|
  +autocomplete: string,
  +disabled: boolean,
  +handleUpdate: HandleUpdateT,
  +name: string,
  +placeholder?: string,
  +valid: boolean,
  +value: string,
  +values: Array<string>,
|}

class DropdownField extends Component<DropdownFieldT> {
  handleChange: HandleChangeT = ({ target: { value } }) =>
    this.props.handleUpdate(value, this.props.name)

  handleClick: HandleClickT = ({ target: { id } }) =>
    this.props.handleUpdate(id, this.props.name)

  render() {
    const { valid, name, value, values, ...inputProps } = this.props

    const options = values
      .filter(option => value && option.includes(value))
      .slice(0, 6)

    const showOptions = options.length >= 1 && !valid

    return (
      <Fragment>
        <FormLineWrap>
          <Input
            name={name}
            onChange={this.handleChange}
            status={valid ? 'success' : null}
            type="text"
            value={value}
            {...inputProps}
          />
          {valid && <CoinEarned />}
        </FormLineWrap>
        {showOptions && (
          <FormLineWrap>
            <DropdownWrap>
              <DropdownList>
                {options.map(value => (
                  <DropdownItem
                    id={value}
                    key={value}
                    onClick={this.handleClick}
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
