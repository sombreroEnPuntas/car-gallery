// @flow
import React from 'react'
// Generate snapshots including the styles
import 'jest-styled-components'

import { shallow, mount } from 'enzyme'

import Coin from './Coin'
import CoinEarned from './CoinEarned'
import DropdownItem from './DropdownItem'
import DropdownList from './DropdownList'
import DropdownWrap from './DropdownWrap'
import ErrorBox from './ErrorBox'
import ErrorCode from './ErrorCode'
import FormLineWrap from './FormLineWrap'
import Input from './Input'
import MessageBox from './MessageBox'
import Modal from './Modal'
import PageWrapper from './PageWrapper'
import ThreeBlinking from './ThreeBlinking'

const wrappers = {
  Coin,
  CoinEarned,
  DropdownItem,
  DropdownList,
  DropdownWrap,
  ErrorBox,
  ErrorCode,
  FormLineWrap,
  MessageBox,
  PageWrapper,
  ThreeBlinking,
}

const getProps = customProps => ({
  ...customProps,
})

describe.each`
  displayName
  ${'Coin'}
  ${'CoinEarned'}
  ${'DropdownItem'}
  ${'DropdownList'}
  ${'DropdownWrap'}
  ${'ErrorBox'}
  ${'ErrorCode'}
  ${'FormLineWrap'}
  ${'MessageBox'}
  ${'PageWrapper'}
  ${'ThreeBlinking'}
`(`TestedComponent is $displayName`, ({ displayName }) => {
  it(`matches snapshot`, () => {
    const TestedComponent = wrappers[displayName]
    const wrapper = shallow(<TestedComponent />)

    expect(wrapper).toMatchSnapshot()
  })
})

describe('TestedComponent is Input', () => {
  describe.each`
    status
    ${{ status: null }}
    ${{ status: 'success' }}
    ${{ status: 'error' }}
  `('when status is: $status', ({ status }) => {
    it(`matches snapshot`, () => {
      const wrapper = mount(<Input {...getProps(status)} />)

      expect(wrapper).toMatchSnapshot()
    })
  })
})

describe('TestedComponent is Modal', () => {
  describe.each`
    status
    ${{ open: true }}
    ${{ open: false }}
  `('when status is: $status', ({ status }) => {
    it(`matches snapshot`, () => {
      const wrapper = mount(<Modal {...getProps(status)} />)

      expect(wrapper).toMatchSnapshot()
    })
  })
})
