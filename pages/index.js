// @flow

import React, { Component } from 'react'

// Data
import { getMakes, getModels } from '../data/car-service'
import { makeFieldHelper } from '../data/form-data'

// Components
import DropdownField from '../components/dropdown-filed'
import Form from '../components/form'

// Utils
import { assocPath, compose, dissocPath, path, pathSatisfies } from 'ramda'

const threeSecondsInMiliSeconds = 1000 * 3

type FieldDataT = { valid: boolean, value: string, values: [string] }

type PropsT = {}

type StateT = {
  error: ?string,
  formData: { [string]: FieldDataT },
  isLoading: boolean,
  retries: number,
}

export type HandleUpdateT = (string, string) => void
export type FetchAsyncDataT = () => *

class Index extends Component<PropsT, StateT> {
  state = {
    error: null,
    formData: {},
    isLoading: true,
    retries: 0,
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
      formData: { make, model },
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
    // normalize input
    const value =
      newValue != null
        ? newValue.toLowerCase()
        : path(['formData', name, 'value'], this.state) || ''

    // validate input
    const valid = pathSatisfies(
      values => values.includes(value),
      ['formData', name, 'values'],
      this.state
    )

    let isLoading = false
    let cleanValues = ''
    if (name === 'make') {
      // Needs re-fetching?
      if (!valid && path(['formData', 'make', 'valid'], this.state)) {
        cleanValues = 'model'
      }

      // will it trigger a loading state?
      isLoading = valid
    }

    this.setState(
      compose(
        assocPath(['isLoading'], isLoading),
        assocPath(['formData', name, 'value'], value),
        assocPath(['formData', name, 'valid'], valid),
        dissocPath(['formData', cleanValues, 'values']),
        dissocPath(['formData', cleanValues, 'valid'])
        // $FlowIgnore compose returns StateT when evaluated
      )(this.state)
    )
  }

  render() {
    const { error, isLoading, retries } = this.state
    const fieldHelper = makeFieldHelper(this.state, this.handleUpdate)

    return (
      <Form isLoading={isLoading} message={error} retry={retries < 3}>
        <p>{'Available makes:'}</p>
        <DropdownField {...fieldHelper('make')} />

        <p>{'Available models:'}</p>
        <DropdownField {...fieldHelper('model')} />
      </Form>
    )
  }
}

export default Index
