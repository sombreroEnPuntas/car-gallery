// @flow
import React from 'react'
import { shallow } from 'enzyme'

// Data
import {
  makesList,
  modelsList,
  setCarServiceMockImplementation,
} from '../data/mocks'

// Dependencies
import { getMakes, getModels } from '../data/car-service'

// Tested unit
import TestedComponent from '../pages/index.js'

// Utils
import { assocPath } from 'ramda'

// Mocks
jest.mock('../data/car-service')
const setGetMakesMock = (data, error) =>
  getMakes.mockImplementation(setCarServiceMockImplementation(data, error))
const setGetModelsMock = (data, error) =>
  getModels.mockImplementation(setCarServiceMockImplementation(data, error))

jest.useFakeTimers()

const getProps = customProps => ({
  ...customProps,
})

describe('Index', () => {
  afterAll(() => {
    jest.resetAllMocks() // clean .mock
  })

  it(`matches snapshot`, async done => {
    setGetMakesMock(makesList)
    setGetModelsMock(modelsList)

    const wrapper = await shallow(<TestedComponent {...getProps({})} />)

    process.nextTick(() => {
      expect(wrapper).toMatchSnapshot()

      getMakes.mockClear()
      getModels.mockClear()

      done()
    })
  })

  it(`sets a retry status after a few seconds`, () => {
    setGetMakesMock(makesList)
    setGetModelsMock(modelsList)

    const wrapper = shallow(<TestedComponent {...getProps({})} />)

    wrapper.setState({ error: `418 I'm a teapot` })

    jest.runAllTimers()

    expect(wrapper.state().error).toBe(null)
    expect(wrapper.state().retries).toBe(1)

    getMakes.mockClear()
    getModels.mockClear()
  })

  it(`unmounts cleanly`, () => {
    // noticed there's no await?
    setGetMakesMock(makesList)
    setGetModelsMock(modelsList)

    const wrapper = shallow(<TestedComponent {...getProps({})} />)
    // if not handled...
    wrapper.unmount()
    // causes a rejection when fetchAsyncData promise has not resolved yet ;)
    // Error: ShallowWrapper::setState() can only be called on class components

    expect(wrapper).toMatchSnapshot()

    getMakes.mockClear()
    getModels.mockClear()
  })

  describe.each`
    displayName | error         | data                   | formData
    ${'make'}   | ${null}       | ${makesList}           | ${{}}
    ${'make'}   | ${'API'}      | ${`418 I'm a teapot`}  | ${{}}
    ${'make'}   | ${'internal'} | ${`Wut?. SyntaxError`} | ${{}}
    ${'model'}  | ${null}       | ${modelsList}          | ${{ make: { value: 'ford', valid: true, values: makesList } }}
    ${'model'}  | ${'API'}      | ${`418 I'm a teapot`}  | ${{ make: { value: 'ford', valid: true, values: makesList } }}
    ${'model'}  | ${'internal'} | ${`Wut?. SyntaxError`} | ${{ make: { value: 'ford', valid: true, values: makesList } }}
  `(`fetch $displayName`, ({ displayName, error, data, formData }) => {
    it(`fetches ${data}`, async done => {
      setGetMakesMock(makesList, error)
      setGetModelsMock(modelsList, error)

      const wrapper = await shallow(<TestedComponent {...getProps({})} />)

      wrapper.setState({
        error: null,
        formData,
        isLoading: true,
      })

      process.nextTick(() => {
        expect(wrapper.state()).toEqual({
          error: error ? data : null,
          formData: assocPath([displayName, 'values'], error ? null : data)(
            formData
          ),
          isLoading: false,
          retries: 0,
        })

        getMakes.mockClear()
        getModels.mockClear()

        done()
      })
    })

    it(`doesn't fetch if there's an error`, async done => {
      setGetMakesMock(makesList, error)
      setGetModelsMock(modelsList, error)

      const wrapper = await shallow(<TestedComponent {...getProps({})} />)

      wrapper.setState({
        error: `418 I'm a teapot`,
        formData,
        isLoading: true,
      })

      process.nextTick(() => {
        expect(wrapper.state()).toEqual({
          error: `418 I'm a teapot`,
          formData,
          isLoading: true,
          retries: 0,
        })

        expect(getMakes).toHaveBeenCalledTimes(1)
        expect(getModels).toHaveBeenCalledTimes(0)

        getMakes.mockClear()
        getModels.mockClear()

        done()
      })
    })
  })

  describe.each`
    value       | key        | wasMakeValid | fieldDataMake                                        | fieldDataModel
    ${null}     | ${'make'}  | ${false}     | ${{ values: makesList, valid: false, value: '' }}    | ${null}
    ${'f'}      | ${'make'}  | ${false}     | ${{ values: makesList, valid: false, value: 'f' }}   | ${null}
    ${'F'}      | ${'make'}  | ${false}     | ${{ values: makesList, valid: false, value: 'f' }}   | ${null}
    ${'Ford'}   | ${'make'}  | ${false}     | ${{ values: makesList, valid: true, value: 'ford' }} | ${{ values: modelsList }}
    ${'F'}      | ${'make'}  | ${true}      | ${{ values: makesList, valid: false, value: 'f' }}   | ${{}}
    ${'F'}      | ${'model'} | ${true}      | ${{ values: makesList, valid: true, value: 'ford' }} | ${{ values: modelsList, valid: false, value: 'f' }}
    ${'Fiesta'} | ${'model'} | ${true}      | ${{ values: makesList, valid: true, value: 'ford' }} | ${{ values: modelsList, valid: true, value: 'fiesta' }}
  `(
    `make.valid was $wasMakeValid, and handleUpdate receives value: $value, name: $key`,
    ({ value, key, wasMakeValid, fieldDataMake, fieldDataModel }) => {
      it(`updates state`, async done => {
        setGetMakesMock(makesList)
        setGetModelsMock(modelsList)

        const wrapper = await shallow(<TestedComponent {...getProps({})} />)
        wasMakeValid
          ? wrapper.instance().handleUpdate('Ford', 'make')
          : wrapper.instance().handleUpdate(value, key)

        process.nextTick(() => {
          wasMakeValid && wrapper.instance().handleUpdate(value, key)

          expect(wrapper.state()).toEqual({
            error: null,
            formData: {
              make: fieldDataMake,
              ...(fieldDataModel && { model: fieldDataModel }),
            },
            isLoading: false,
            retries: 0,
          })

          getMakes.mockClear()
          getModels.mockClear()

          done()
        })
      })
    }
  )
})
