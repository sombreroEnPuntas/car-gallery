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

type FieldDataT = { valid: boolean, value: string, values: [string] }

type PropsT = {}

type StateT = {
  error: ?string,
  formData: { [string]: FieldDataT },
  isLoading: boolean,
}

export type AsyncRequestT = (Promise<*>) => Promise<*>

export type HandleUpdateT = (string, string) => void
export type HandleAsyncFetchResponseT = string => (*) => *

class Index extends Component<PropsT, StateT> {
  state = {
    error: null,
    isLoading: true,
    formData: {},
  }

  _asyncRequest: AsyncRequestT = promise => {
    const wrappedPromise = new Promise(resolve => {
      promise.then(val => resolve(val))
    })

    return wrappedPromise
  }

  componentDidMount() {
    this.fetchAsyncData()
  }

  componentDidUpdate() {
    this.fetchAsyncData()
  }

  fetchAsyncData: () => void = () => {
    const {
      error,
      formData: { make, model },
    } = this.state

    // Did it fail already?
    if (error) {
      return
    }
    // should fetch makes?
    else if (!make || !make.values) {
      this._asyncRequest(getMakes().then(this.handleAsyncFetchResponse('make')))
    }
    // should fetch models?
    else if (!!make.value && make.valid && (!model || !model.values)) {
      this._asyncRequest(
        getModels(make.value).then(this.handleAsyncFetchResponse('model'))
      )
    }
  }

  handleAsyncFetchResponse: HandleAsyncFetchResponseT = key => data => {
    this.setState(
      compose(
        assocPath(['isLoading'], false),
        assocPath(['error'], data.error || null),
        assocPath(['formData', key, 'values'], data.error ? null : data)
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
      // Needs fetching?
      if (!valid && path(['formData', 'make', 'valid'], this.state)) {
        cleanValues = 'model'
      }

      // will trigger a loading state?
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
    const { error, isLoading } = this.state
    const fieldHelper = makeFieldHelper(this.state, this.handleUpdate)

    return (
      <Form isLoading={isLoading} message={error}>
        <p>{'Available makes:'}</p>
        <DropdownField {...fieldHelper('make')} />

        <p>{'Available models:'}</p>
        <DropdownField {...fieldHelper('model')} />
      </Form>
    )
  }
}

export default Index
