// @flow
import React from 'react'
import { shallow } from 'enzyme'

// Dependencies
import ErrorCode from './wrappers/ErrorCode'

// Tested Unit
import TestedComponent from './message'

const getProps = customProps => ({
  message: 'Hello world!',
  ...customProps,
})

describe('Message', () => {
  const wrapper = shallow(<TestedComponent {...getProps()} />)

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('shows "Hello world!"', () => {
    const actual = wrapper.find(ErrorCode).text()
    const expected = 'Hello world!'

    expect(actual).toEqual(expected)
  })

  it('shows Loading status', () => {
    wrapper.setProps({ message: null })

    const actual = wrapper.find('h3').text()
    const expected = 'Loading '

    expect(actual).toEqual(expected)
  })
})
