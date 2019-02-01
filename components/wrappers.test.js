// @flow
import React from 'react'

import { shallow } from 'enzyme'

import { PageWrapper } from './wrappers'

const getProps = customProps => ({
  children: <div>{'Hello world!'}</div>,
  ...customProps,
})

describe('Index', () => {
  const wrapper = shallow(<PageWrapper {...getProps()} />)

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
