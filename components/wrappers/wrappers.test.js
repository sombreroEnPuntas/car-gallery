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
import FormButtons from './FormButtons'
import FormLineWrap from './FormLineWrap'
import FormSection from './FormSection'
import Input from './Input'
import MessageBox from './MessageBox'
import Modal from './Modal'
import PageWrapper from './PageWrapper'
import Score from './Score'
import Select from './Select'
import SelectItem from './SelectItem'
import ThreeBlinking from './ThreeBlinking'

const wrappers = {
  Coin,
  CoinEarned,
  DropdownItem,
  DropdownList,
  DropdownWrap,
  ErrorBox,
  ErrorCode,
  FormButtons,
  FormLineWrap,
  FormSection,
  Input,
  MessageBox,
  Modal,
  PageWrapper,
  Score,
  Select,
  SelectItem,
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
  ${'FormButtons'}   | ${null}
  ${'FormLineWrap'}  | ${null}
  ${'FormSection'}   | ${{ active: false }}
  ${'FormSection'}   | ${{ active: true }}
  ${'Input'}         | ${{ disabled: true }}
  ${'Input'}         | ${{ status: 'error' }}
  ${'Input'}         | ${{ status: 'success' }}
  ${'Input'}         | ${{ status: null }}
  ${'MessageBox'}    | ${null}
  ${'Modal'}         | ${{ open: false }}
  ${'Modal'}         | ${{ open: true }}
  ${'PageWrapper'}   | ${null}
  ${'Score'}         | ${null}
  ${'Select'}        | ${{ disabled: true }}
  ${'Select'}        | ${{ status: 'error' }}
  ${'Select'}        | ${{ status: 'success' }}
  ${'Select'}        | ${{ status: null }}
  ${'SelectItem'}    | ${null}
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
