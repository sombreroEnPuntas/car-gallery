// @flow
import React from 'react'

// Components
import { ErrorBox, ErrorCode, PageWrapper } from './wrappers'

type PropsT = {| message: string |}

const ErrorMessage = ({ message }: PropsT) => (
  <PageWrapper>
    <h3>{'Ooops...'}</h3>
    <p>{'Something went sideways :$'}</p>
    <ErrorBox>
      <ErrorCode>{message}</ErrorCode>
    </ErrorBox>
  </PageWrapper>
)

export default ErrorMessage
