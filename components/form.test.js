// @flow
import React from 'react'
import { shallow } from 'enzyme'

// Dependencies
import PageWrapper from './wrappers/PageWrapper'
import Modal from './wrappers/Modal'

// Tested Unit
import TestedComponent from './form'

const getProps = customProps => ({
  children: <div>{':)'}</div>,
  isLoading: false,
  message: null,
  ...customProps,
})

describe('Message', () => {
  const wrapper = shallow(<TestedComponent {...getProps()} />)

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('shows children', () => {
    const actual = wrapper.find(PageWrapper).text()
    const expected = ':)'

    expect(actual).toEqual(expected)
  })

  it('opens Modal when loading', () => {
    wrapper.setProps({ isLoading: true, message: null })

    expect(
      wrapper
        .find(Modal)
        .dive()
        .prop('open')
    ).toBe(true)
  })

  it('opens Modal when error', () => {
    wrapper.setProps({ isLoading: false, message: `418 I'm a teapot` })

    expect(
      wrapper
        .find(Modal)
        .dive()
        .prop('open')
    ).toBe(true)
  })
})
