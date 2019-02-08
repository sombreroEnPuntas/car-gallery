// @flow
import React from 'react'
import { shallow } from 'enzyme'

// Dependencies
import CoinEarned from '../components/wrappers/CoinEarned'
import Select from '../components/wrappers/Select'

// Tested unit
import TestedComponent from './select-field'

const handleUpdate = jest.fn()
const getProps = customProps => ({
  disabled: false,
  handleUpdate,
  name: 'dinosaur-name',
  valid: false,
  value: '',
  values: ['t-rex', 'brontosaurus'],
  ...customProps,
})

describe('DropdownField', () => {
  describe.each`
    status          | Component | event                         | value
    ${'char typed'} | ${Select} | ${{ target: { value: 'r' } }} | ${'r'}
    ${'char typed'} | ${Select} | ${{ target: { value: 'x' } }} | ${'x'}
  `('$status', ({ Component, event, value }) => {
    const wrapper = shallow(<TestedComponent {...getProps({ value })} />)

    it(`handles the event properly`, () => {
      wrapper
        .find(Component)
        .simulate(Component === Select ? 'change' : 'click', event)

      expect(handleUpdate).toHaveBeenCalledWith(value, getProps().name)
    })
  })

  it(`matches snapshot`, () => {
    const wrapper = shallow(<TestedComponent {...getProps()} />)

    expect(wrapper).toMatchSnapshot()
  })

  it(`shows valid status`, () => {
    const wrapper = shallow(<TestedComponent {...getProps({ valid: true })} />)

    expect(
      wrapper
        .find(Select)
        .dive()
        .prop('status')
    ).toBe('success')

    expect(wrapper.find(CoinEarned)).toHaveLength(1)
  })
})
