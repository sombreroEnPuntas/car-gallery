// @flow
import React from 'react'
import { shallow, mount } from 'enzyme'

import {
  DropdownItem,
  DropdownList,
  DropdownWrap,
  FormLineWrap,
  Input,
  PageWrapper,
} from './wrappers'

const getProps = customProps => ({
  ...customProps,
})

describe('DropdownItem', () => {
  const wrapper = shallow(<DropdownItem {...getProps()} />)

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})

describe('DropdownList', () => {
  const wrapper = shallow(<DropdownList {...getProps()} />)

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})

describe('DropdownWrap', () => {
  const wrapper = shallow(<DropdownWrap {...getProps()} />)

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})

describe('FormLineWrap', () => {
  const wrapper = shallow(<FormLineWrap {...getProps()} />)

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Input', () => {
  describe('when status is', () => {
    describe.each`
      status
      ${{ status: null }}
      ${{ status: 'success' }}
      ${{ status: 'error' }}
    `('status: $status', ({ status }) => {
      it(`matches snapshot`, () => {
        const wrapper = mount(<Input {...getProps(status)} />)

        expect(wrapper).toMatchSnapshot()
      })
    })
  })
})

describe('PageWrapper', () => {
  const wrapper = shallow(<PageWrapper {...getProps()} />)

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
