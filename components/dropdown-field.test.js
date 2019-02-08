// @flow
import React from 'react'
import { shallow } from 'enzyme'

// Dependencies
import CoinEarned from '../components/wrappers/CoinEarned'
import DropdownItem from '../components/wrappers/DropdownItem'
import Input from '../components/wrappers/Input'

// Tested unit
import TestedComponent from './dropdown-field'

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
    status              | Component       | event                          | options | value
    ${'char typed'}     | ${Input}        | ${{ target: { value: 'r' } }}  | ${2}    | ${'r'}
    ${'char typed'}     | ${Input}        | ${{ target: { value: 'x' } }}  | ${1}    | ${'x'}
    ${'option clicked'} | ${DropdownItem} | ${{ target: { id: 't-rex' } }} | ${1}    | ${'t-rex'}
  `('$status', ({ Component, event, options, value }) => {
    const wrapper = shallow(<TestedComponent {...getProps({ value })} />)

    it(`handles the event properly`, () => {
      wrapper
        .find(Component)
        .simulate(Component === Input ? 'change' : 'click', event)

      expect(handleUpdate).toHaveBeenCalledWith(value, getProps().name)
    })

    it('filters the list adnd shows options', () => {
      wrapper
        .find(DropdownItem)
        .forEach((item, index) =>
          expect(item.text()).toBe(getProps().values[index])
        )

      expect(wrapper.find(DropdownItem)).toHaveLength(options)
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
        .find(Input)
        .dive()
        .prop('status')
    ).toBe('success')

    expect(wrapper.find(CoinEarned)).toHaveLength(1)
  })
})
