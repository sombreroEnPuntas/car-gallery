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
  Input,
  MessageBox,
  Modal,
  PageWrapper,
  ThreeBlinking,
}

const getProps = customProps => ({
  ...customProps,
})

describe.each`
  displayName        | props
  ${'Coin'}          | ${null}
  ${'CoinEarned'}    | ${null}
  ${'DropdownItem'}  | ${null}
  ${'DropdownList'}  | ${null}
  ${'DropdownWrap'}  | ${null}
  ${'ErrorBox'}      | ${null}
  ${'ErrorCode'}     | ${null}
  ${'FormLineWrap'}  | ${null}
  ${'Input'}         | ${{ status: 'error' }}
  ${'Input'}         | ${{ status: 'success' }}
  ${'Input'}         | ${{ status: null }}
  ${'MessageBox'}    | ${null}
  ${'Modal'}         | ${{ open: false }}
  ${'Modal'}         | ${{ open: true }}
  ${'PageWrapper'}   | ${null}
  ${'ThreeBlinking'} | ${null}
`(`TestedComponent is $displayName and`, ({ displayName, props }) => {
  it(`matches snapshot`, () => {
    const TestedComponent = wrappers[displayName]
    const wrapper =
      props === null
        ? shallow(<TestedComponent />)
        : mount(<TestedComponent {...getProps(props)} />)

    expect(wrapper).toMatchSnapshot()
  })
})
