// @flow
import React from 'react'
import { shallow } from 'enzyme'

import TestedComponent, { ErrorCode } from './error-message'

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
