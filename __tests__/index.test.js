// @flow
import React from 'react'
import { shallow } from 'enzyme'

// Data
import { makesList, modelsList } from '../data/mocks'

// Dependencies
import { getMakes, getModels } from '../data/car-service'

// Tested unit
import TestedComponent from '../pages/index.js'

// Utils
import { assocPath } from 'ramda'

// Mocks
jest.mock('../data/car-service')
const setGetMakesMock = (data, error) =>
  getMakes.mockImplementation(() =>
    Promise.resolve(error ? { error: `418 I'm a teapot` } : data)
  )
const setGetModelsMock = (data, error) =>
  getModels.mockImplementation(() =>
    Promise.resolve(error ? { error: `418 I'm a teapot` } : data)
  )
const consoleSpy = jest.spyOn(console, 'log')

const getProps = customProps => ({
  ...customProps,
})

describe('Index', () => {
  afterAll(() => {
    jest.restoreAllMocks() // clean .spyOn mocks
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

  describe.each`
    displayName | error   | data                  | formData
    ${'make'}   | ${null} | ${makesList}          | ${{}}
    ${'make'}   | ${true} | ${`418 I'm a teapot`} | ${{}}
    ${'model'}  | ${null} | ${modelsList}         | ${{ make: { value: 'ford', valid: true, values: makesList } }}
    ${'model'}  | ${true} | ${`418 I'm a teapot`} | ${{ make: { value: 'ford', valid: true, values: makesList } }}
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
          })

          getMakes.mockClear()
          getModels.mockClear()

          done()
        })
      })
    }
  )
})
