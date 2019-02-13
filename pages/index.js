// @flow

import React, { Component, Fragment } from 'react'

// Data
import { getMakes, getModels, getVehicles } from '../data/car-service'
import {
  getCarOptionsByKey,
  getCarsFiltered,
  getScore,
  isVehicleKey,
  makeFieldHelper,
} from '../data/form-data'
import type { VehicleT } from '../data/car-service'

// Components
import DropdownField from '../components/dropdown-field'
import Form from '../components/form'
import FormButtons from '../components/wrappers/FormButtons'
import FormSection from '../components/wrappers/FormSection'
import GitHubLink from '../components/wrappers/GitHubLink'
import Score from '../components/wrappers/Score'
import SelectField from '../components/select-field'

// Utils
import { assocPath, compose, dissocPath, path, pathSatisfies } from 'ramda'

const threeSecondsInMiliSeconds = 1000 * 3

type FieldDataT = {
  valid: boolean,
  value: string,
  values: [string] | [VehicleT],
}

type PropsT = {}

type StateT = {
  error: ?string,
  formData: { make: FieldDataT, model: FieldDataT, vehicle: FieldDataT },
  isLoading: boolean,
  retries: number,
  step: number,
}

export type HandleUpdateT = (string, string) => void
export type FetchAsyncDataT = () => *

class Index extends Component<PropsT, StateT> {
  state = {
    error: null,
    formData: {},
    isLoading: true,
    retries: 0,
    step: 1,
  }

  async componentDidMount() {
    try {
      await this.fetchAsyncData()
    } catch (error) {
      // unmount!
    }
  }

  async componentDidUpdate() {
    try {
      await this.fetchAsyncData()
    } catch (error) {
      // unmount!
    }
  }

  fetchAsyncData: FetchAsyncDataT = async () => {
    const {
      error,
      formData: { make, model, vehicle },
      retries,
    } = this.state

    // Did it fail already?
    if (error) {
      retries < 3 &&
        setTimeout(
          () =>
            this.setState(prevState => ({
              error: null,
              retries: prevState.retries + 1,
            })),
          threeSecondsInMiliSeconds
        )

      return
    }

    let key = ''
    let result

    try {
      // should fetch makes?
      if (!make || !make.values) {
        key = 'make'
        result = await getMakes()
      }
      // should fetch models?
      else if (!!make.value && make.valid && (!model || !model.values)) {
        key = 'model'
        result = await getModels(make.value)
      }
      // should fetch vehicles?
      else if (
        !!make.value &&
        make.valid &&
        !!model.value &&
        model.valid &&
        (!vehicle || !vehicle.values)
      ) {
        key = 'vehicle'
        result = await getVehicles(make.value, model.value)
      }
      // nothing to do here!
      else {
        return
      }
    } catch (error) {
      result = error
    }

    this.setState(
      compose(
        assocPath(['isLoading'], false),
        assocPath(['error'], result.error || null),
        assocPath(['formData', key, 'values'], result.error ? null : result)
      )(this.state)
    )
  }

  handleUpdate: HandleUpdateT = (newValue, name) => {
    let nextState

    // normalize input
    const value =
      newValue != null
        ? newValue.toLowerCase()
        : path(['formData', name, 'value'], this.state) || ''

    // validate input
    const valid = isVehicleKey(name)
      ? pathSatisfies(
          values => getCarOptionsByKey(name)(values).includes(value),
          ['formData', 'vehicle', 'values'],
          this.state
        )
      : pathSatisfies(
          values => values.includes(value),
          ['formData', name, 'values'],
          this.state
        )

    nextState = compose(
      assocPath(['isLoading'], valid && !isVehicleKey(name)),
      assocPath(['formData', name, 'value'], value),
      assocPath(['formData', name, 'valid'], valid)
      // $FlowIgnore compose returns StateT when evaluated
    )(this.state)

    // Needs re-fetching?
    if (!valid) {
      if (name === 'make') {
        // $FlowIgnore compose takes any mnumber of args
        nextState = compose(
          dissocPath(['formData', 'model', 'values']),
          dissocPath(['formData', 'model', 'valid']),
          dissocPath(['formData', 'vehicle', 'values']),
          dissocPath(['formData', 'vehicle', 'valid']),
          dissocPath(['formData', 'bodyType']),
          dissocPath(['formData', 'fuelType']),
          dissocPath(['formData', 'engineCapacity']),
          dissocPath(['formData', 'enginePowerKW'])
        )(nextState)
      }
      if (name === 'model') {
        nextState = compose(
          dissocPath(['formData', 'vehicle', 'values']),
          dissocPath(['formData', 'vehicle', 'valid']),
          dissocPath(['formData', 'bodyType']),
          dissocPath(['formData', 'fuelType']),
          dissocPath(['formData', 'engineCapacity']),
          dissocPath(['formData', 'enginePowerKW'])
        )(nextState)
      }
    }

    this.setState(nextState)
  }

  handleStepClick = (direction: 'back' | 'next') =>
    direction === 'next'
      ? () =>
          this.setState(prevState => ({
            step: prevState.step + 1,
          }))
      : () =>
          this.setState(prevState => ({
            step: prevState.step - 1,
          }))

  render() {
    const { error, isLoading, retries, step } = this.state
    const fieldHelper = makeFieldHelper(this.state, this.handleUpdate)

    const carsFound = getCarsFiltered(this.state)
    const score = getScore(this.state)

    return (
      <Fragment>
        <GitHubLink
          href="https://github.com/sombreroEnPuntas/car-gallery"
          target="_blank"
          rel="noopener noreferrer"
        >
          {'Check the code on github!'}
        </GitHubLink>
        <Form isLoading={isLoading} message={error} retry={retries < 3}>
          <Score>{`Score: ${('00' + score).slice(-3)}`}</Score>
          <FormSection active={step === 1} id="part-1">
            <p>{'Available makes:'}</p>
            <DropdownField {...fieldHelper('make')} />

            <p>{'Available models:'}</p>
            <DropdownField {...fieldHelper('model')} />
          </FormSection>
          <FormSection active={step === 2} id="part-2">
            <p>{'Available body types:'}</p>
            <SelectField {...fieldHelper('bodyType')} />

            <p>{'Available fuel types:'}</p>
            <SelectField {...fieldHelper('fuelType')} />
          </FormSection>
          <FormSection active={step === 3} id="part-3">
            <p>{'Available engine capacities:'}</p>
            <SelectField {...fieldHelper('engineCapacity')} />

            <p>{'Available engine power:'}</p>
            <SelectField {...fieldHelper('enginePowerKW')} />
          </FormSection>

          {/* // $FlowIgnore ramda.filter returns array when evaluated */}
          <p>{`Available cars: ${carsFound.length}`}</p>
          <FormButtons>
            {step !== 1 ? (
              <a data-test-id="back" onClick={this.handleStepClick('back')}>
                {'< Back'}
              </a>
            ) : (
              <div />
            )}
            {step !== 3 ? (
              <a data-test-id="next" onClick={this.handleStepClick('next')}>
                {'Next >'}
              </a>
            ) : (
              <div />
            )}
          </FormButtons>
        </Form>
      </Fragment>
    )
  }
}

export default Index
