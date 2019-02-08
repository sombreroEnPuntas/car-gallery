// @flow
import React from 'react'
import { shallow } from 'enzyme'

// Data
import {
  makesList,
  modelsList,
  vehiclesList,
  setCarServiceMockImplementation,
} from '../data/mocks'

// Dependencies
import { getMakes, getModels, getVehicles } from '../data/car-service'

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
const setGetVehiclesMock = (data, error) =>
  getVehicles.mockImplementation(setCarServiceMockImplementation(data, error))

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
    setGetVehiclesMock(vehiclesList)

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
    setGetVehiclesMock(vehiclesList)

    const wrapper = shallow(<TestedComponent {...getProps({})} />)

    wrapper.setState({ error: `418 I'm a teapot` })

    jest.runAllTimers()

    expect(wrapper.state().error).toBe(null)
    expect(wrapper.state().retries).toBe(1)

    getMakes.mockClear()
    getModels.mockClear()
  })

  it(`has a steper`, () => {
    setGetMakesMock(makesList)
    setGetModelsMock(modelsList)
    setGetVehiclesMock(vehiclesList)

    const wrapper = shallow(<TestedComponent {...getProps({})} />)

    expect(wrapper.find('[data-test-id="back"]').length).toBe(0)
    expect(wrapper.find('[data-test-id="next"]').length).toBe(1)

    wrapper
      .find('[data-test-id="next"]')
      .first()
      .simulate('click')

    expect(wrapper.state().step).toBe(2)
    expect(wrapper.find('[data-test-id="back"]').length).toBe(1)
    expect(wrapper.find('[data-test-id="next"]').length).toBe(1)

    wrapper
      .find('[data-test-id="next"]')
      .first()
      .simulate('click')

    expect(wrapper.state().step).toBe(3)
    expect(wrapper.find('[data-test-id="back"]').length).toBe(1)
    expect(wrapper.find('[data-test-id="next"]').length).toBe(0)

    wrapper
      .find('[data-test-id="back"]')
      .first()
      .simulate('click')

    expect(wrapper.state().step).toBe(2)

    getMakes.mockClear()
    getModels.mockClear()
  })

  it(`unmounts cleanly`, () => {
    // noticed there's no await?
    setGetMakesMock(makesList)
    setGetModelsMock(modelsList)
    setGetVehiclesMock(vehiclesList)

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
      setGetVehiclesMock(vehiclesList)

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
          step: 1,
        })

        getMakes.mockClear()
        getModels.mockClear()

        done()
      })
    })

    it(`doesn't fetch if there's an error`, async done => {
      setGetMakesMock(makesList, error)
      setGetModelsMock(modelsList, error)
      setGetVehiclesMock(vehiclesList)

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
          step: 1,
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
    value          | key           | wasMakeValid | wasModelValid | fieldDataMake                                        | fieldDataModel                                          | fieldDataVehicle            | fieldBodyType
    ${null}        | ${'make'}     | ${false}     | ${false}      | ${{ values: makesList, valid: false, value: '' }}    | ${null}                                                 | ${null}                     | ${null}
    ${'f'}         | ${'make'}     | ${false}     | ${false}      | ${{ values: makesList, valid: false, value: 'f' }}   | ${null}                                                 | ${null}                     | ${null}
    ${'F'}         | ${'make'}     | ${false}     | ${false}      | ${{ values: makesList, valid: false, value: 'f' }}   | ${null}                                                 | ${null}                     | ${null}
    ${'Ford'}      | ${'make'}     | ${false}     | ${false}      | ${{ values: makesList, valid: true, value: 'ford' }} | ${{ values: modelsList }}                               | ${null}                     | ${null}
    ${'F'}         | ${'make'}     | ${true}      | ${false}      | ${{ values: makesList, valid: false, value: 'f' }}   | ${{}}                                                   | ${null}                     | ${null}
    ${'F'}         | ${'model'}    | ${true}      | ${false}      | ${{ values: makesList, valid: true, value: 'ford' }} | ${{ values: modelsList, valid: false, value: 'f' }}     | ${null}                     | ${null}
    ${'Fiesta'}    | ${'model'}    | ${true}      | ${false}      | ${{ values: makesList, valid: true, value: 'ford' }} | ${{ values: modelsList, valid: true, value: 'fiesta' }} | ${{ values: vehiclesList }} | ${null}
    ${'limousine'} | ${'bodyType'} | ${true}      | ${true}       | ${{ values: makesList, valid: true, value: 'ford' }} | ${{ values: modelsList, valid: true, value: 'fiesta' }} | ${{ values: vehiclesList }} | ${{ valid: true, value: 'limousine' }}
  `(
    `make.valid was $wasMakeValid, and handleUpdate receives value: $value, name: $key`,
    ({
      value,
      key,
      wasMakeValid,
      wasModelValid,
      fieldDataMake,
      fieldDataModel,
      fieldDataVehicle,
      fieldBodyType,
    }) => {
      it(`updates state`, async done => {
        setGetMakesMock(makesList)
        setGetModelsMock(modelsList)
        setGetVehiclesMock(vehiclesList)

        const wrapper = await shallow(<TestedComponent {...getProps({})} />)
        wasMakeValid && (await wrapper.instance().handleUpdate('Ford', 'make'))
        wasModelValid &&
          (await wrapper.instance().handleUpdate('Fiesta', 'model'))
        await wrapper.instance().handleUpdate(value, key)

        process.nextTick(() => {
          wasMakeValid && wrapper.instance().handleUpdate(value, key)

          expect(wrapper.state('formData')).toEqual({
            make: fieldDataMake,
            ...(fieldDataModel && { model: fieldDataModel }),
            ...(fieldDataVehicle && { vehicle: fieldDataVehicle }),
            ...(fieldBodyType && { bodyType: fieldBodyType }),
          })

          getMakes.mockClear()
          getModels.mockClear()

          done()
        })
      })
    }
  )
})
