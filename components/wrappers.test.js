// @flow
import React from 'react'
// Generate snapshots including the styles
import 'jest-styled-components'

import { shallow, mount } from 'enzyme'

import * as wrappers from './wrappers'

const getProps = customProps => ({
  ...customProps,
})

describe('TestedComponent is ', () => {
  describe.each`
    displayName
    ${'DropdownItem'}
    ${'DropdownList'}
    ${'DropdownWrap'}
    ${'ErrorBox'}
    ${'ErrorCode'}
    ${'FormLineWrap'}
    ${'PageWrapper'}
  `(`$displayName`, ({ displayName }) => {
    it(`matches snapshot`, () => {
      const TestedComponent = wrappers[displayName]
      const wrapper = shallow(<TestedComponent />)

      expect(wrapper).toMatchSnapshot()
    })
  })
})

describe('TestedComponent is Input', () => {
  describe('when status is', () => {
    describe.each`
      status
      ${{ status: null }}
      ${{ status: 'success' }}
      ${{ status: 'error' }}
    `('status: $status', ({ status }) => {
      it(`matches snapshot`, () => {
        const TestedComponent = wrappers.Input
        const wrapper = mount(<TestedComponent {...getProps(status)} />)

        expect(wrapper).toMatchSnapshot()
      })
    })
  })
})
