// @flow

import React, { Component } from 'react'

// Data
import { getMakes } from '../data/car-service'
import type { APIErrorResponseT, GetMakesResponseT } from '../data/car-service'

// Components
import {
  DropdownItem,
  DropdownList,
  DropdownWrap,
  FormLineWrap,
  Input,
  PageWrapper,
} from '../components/wrappers'
import ErrorMessage from '../components/error-message'

type HandleChangeT = (SyntheticInputEvent<HTMLInputElement>) => void
type HandleClickT = ({ target: { id: string } }) => void
type HandleUpdateT = string => void

type PropsT = {|
  data: GetMakesResponseT,
  error?: APIErrorResponseT,
  makes?: Array<string>,
|}

type StateT = {|
  isValid: boolean,
  make: string,
  makes: Array<string>,
  message: string,
  options: Array<string>,
|}

class Index extends Component<PropsT, StateT> {
  state = {
    isValid: false,
    make: '',
    makes: [],
    message: '',
    options: [],
  }

  // It is covered, but jest won't be able to find getInitialProps on shallow
  // rendered component

  static async getInitialProps() /* istanbul ignore next */ {
    const data = await getMakes()

    if (data.error) {
      return { error: data }
    }

    return { makes: data }
  }

  componentWillMount() {
    this.setState({
      makes: this.props.makes || [],
      message: this.props.error ? this.props.error.message : '',
    })
  }

  handleChange: HandleChangeT = ({ target: { value } }) =>
    this.handleUpdate(value)

  handleClick: HandleClickT = ({ target: { id } }) => this.handleUpdate(id)

  handleUpdate: HandleUpdateT = value => {
    const make =
      value != null
        ? /* normalize input */ value.toLowerCase()
        : this.state.make
    const options = this.state.makes
      .filter(option => make && option.includes(make))
      .slice(0, 6)

    // validate input
    const isValid = options.length === 1 && make === options[0]

    this.setState({
      make,
      options,
      isValid,
    })
  }

  render() {
    if (this.props.error) {
      return <ErrorMessage message={this.state.message} />
    }

    const { options, isValid } = this.state

    const showOptions = options.length >= 1 && !isValid

    return (
      <PageWrapper>
        <p>{'Available makes:'}</p>
        <FormLineWrap>
          <Input
            name="make"
            onChange={this.handleChange}
            type="text"
            value={this.state.make}
            status={isValid ? 'success' : null}
          />
        </FormLineWrap>
        {showOptions && (
          <FormLineWrap>
            <DropdownWrap>
              <DropdownList>
                {options.map(make => (
                  <DropdownItem id={make} key={make} onClick={this.handleClick}>
                    {make}
                  </DropdownItem>
                ))}
              </DropdownList>
            </DropdownWrap>
          </FormLineWrap>
        )}
      </PageWrapper>
    )
  }
}

export default Index
