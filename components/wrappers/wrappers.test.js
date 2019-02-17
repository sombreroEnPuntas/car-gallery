// @flow
import React from 'react'
// Generate snapshots including the styles
import 'jest-styled-components'

import { shallow, mount } from 'enzyme'

import Coin from './Coin'
import DropdownItem from './DropdownItem'
import DropdownList from './DropdownList'
import DropdownWrap from './DropdownWrap'
import Earned from './Earned'
import ErrorBox from './ErrorBox'
import ErrorCode from './ErrorCode'
import FormButtons from './FormButtons'
import FormLineWrap from './FormLineWrap'
import FormSection from './FormSection'
import GitHubLink from './GitHubLink'
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
  DropdownItem,
  DropdownList,
  DropdownWrap,
  Earned,
  ErrorBox,
  ErrorCode,
  FormButtons,
  FormLineWrap,
  FormSection,
  GitHubLink,
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
  ${'DropdownItem'}  | ${null}
  ${'DropdownList'}  | ${null}
  ${'DropdownWrap'}  | ${null}
  ${'Earned'}        | ${null}
  ${'ErrorBox'}      | ${null}
  ${'ErrorCode'}     | ${null}
  ${'FormButtons'}   | ${null}
  ${'FormLineWrap'}  | ${null}
  ${'FormSection'}   | ${{ active: false }}
  ${'FormSection'}   | ${{ active: true }}
  ${'GitHubLink'}    | ${null}
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
