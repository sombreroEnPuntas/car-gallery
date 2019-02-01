// @flow
import React from 'react'
import { shallow } from 'enzyme'

// Dependencies
import { ErrorCode } from './wrappers'

// Tested Unit
import TestedComponent from './error-message'

const getProps = customProps => ({
  message: 'Hello world!',
  ...customProps,
})

describe('ErrorMessage', () => {
  const wrapper = shallow(<TestedComponent {...getProps()} />)

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('shows "Hello world!"', () => {
    const actual = wrapper.find(ErrorCode).text()
    const expected = 'Hello world!'

    expect(actual).toEqual(expected)
  })
})
