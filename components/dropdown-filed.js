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
    const { valid, value, values, ...inputProps } = this.props
    const { handleEvent } = this
    const options = values
      .filter(option => value && option.includes(value))
      .slice(0, 6)

    return (
      <Fragment>
        <FormLineWrap>
          <Input
            onChange={handleEvent}
            status={valid ? 'success' : null}
            type="text"
            value={value}
            {...inputProps}
          />
          {valid && <CoinEarned />}
        </FormLineWrap>
        {options.length >= 1 && !valid && (
          <FormLineWrap>
            <DropdownWrap>
              <DropdownList>
                {options.map(value => (
                  <DropdownItem id={value} key={value} onClick={handleEvent}>
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
