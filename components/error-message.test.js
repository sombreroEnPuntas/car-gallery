// @flow
import React from 'react'
import { shallow } from 'enzyme'
// Generate snapshots including the styles
import 'jest-styled-components'

import * as wrappers from './error-message'

const getProps = customProps => ({
  message: 'Hello world!',
  ...customProps,
})

describe('ErrorMessage', () => {
  const TestedComponent = wrappers.default
  const wrapper = shallow(<TestedComponent {...getProps()} />)

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('shows "Hello world!"', () => {
    const actual = wrapper.find(wrappers.ErrorCode).text()
    const expected = 'Hello world!'

    expect(actual).toEqual(expected)
  })
})

describe('TestedComponent is ', () => {
  describe.each`
    displayName
    ${'ErrorBox'}
    ${'ErrorCode'}
  `(`$displayName`, ({ displayName }) => {
    it(`matches snapshot`, () => {
      const TestedComponent = wrappers[displayName]
      const wrapper = shallow(<TestedComponent />)

      expect(wrapper).toMatchSnapshot()
    })
  })
})
