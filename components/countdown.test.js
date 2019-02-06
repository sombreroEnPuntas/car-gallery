// @flow
import React from 'react'
import { shallow } from 'enzyme'

// Tested unit
import TestedComponent from './countdown'

// Mocks
jest.useFakeTimers()

const getProps = customProps => ({
  ...customProps,
})

describe('Countdown', () => {
  const wrapper = shallow(<TestedComponent {...getProps()} />)

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('decreases the number', () => {
    jest.runOnlyPendingTimers()
    expect(wrapper.state().time).toBe(2)
    jest.runOnlyPendingTimers()
    expect(wrapper.state().time).toBe(1)
  })

  it('unmounts cleanly', () => {
    wrapper.unmount()
    // If an Interval is still existing, jest will keep running timers until
    // an infinite recursion error ocurrs
    jest.runAllTimers()
  })
})
