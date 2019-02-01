import { shallow } from 'enzyme'

// Data
import { makesList, errorAPIResponse } from '../data/mocks'

// Dependencies
import { Input, DropdownItem } from '../components/wrappers'

// Tested unit
import TestedComponent from '../pages/index.js'

const getProps = customProps => ({
  ...customProps,
})

const getState = customProps => ({
  isValid: false,
  make: '',
  makes: ['ford', 'opel'],
  message: '',
  options: [],
  ...customProps,
})

describe('Index', () => {
  describe('when status is', () => {
    describe.each`
      status       | error               | makes
      ${'success'} | ${undefined}        | ${makesList}
      ${'error'}   | ${errorAPIResponse} | ${undefined}
    `('$status', ({ error, makes }) => {
      const wrapper = shallow(
        <TestedComponent {...getProps({ ...error, ...makes })} />
      )
      it(`matches snapshot`, () => {
        expect(wrapper).toMatchSnapshot()
      })
    })
  })

  describe('when input is', () => {
    const wrapper = shallow(
      <TestedComponent {...getProps({ makes: makesList })} />
    )
    describe.each`
      status               | state                                                           | Component       | event                          | options
      ${'empty selection'} | ${getState()}                                                   | ${Input}        | ${{ target: { value: null } }} | ${0}
      ${'char typed'}      | ${getState({ make: 'f', options: ['ford'] })}                   | ${Input}        | ${{ target: { value: 'f' } }}  | ${1}
      ${'option clicked'}  | ${getState({ make: 'ford', options: ['ford'], isValid: true })} | ${DropdownItem} | ${{ target: { id: 'ford' } }}  | ${0}
    `('$status', ({ state, Component, event, options }) => {
      it(`handles the event properly`, () => {
        wrapper
          .find(Component)
          .simulate(Component === Input ? 'change' : 'click', event)
        expect(wrapper.state()).toEqual(state)
      })
      it('filters the list adnd shows options', () => {
        expect(wrapper.find(DropdownItem)).toHaveLength(options)
        options !== 0 &&
          expect(
            wrapper
              .find(DropdownItem)
              .first()
              .text()
          ).toBe(state.options[0])
      })
    })
  })
})
