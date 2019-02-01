// @flow
import React from 'react'
import styled from 'styled-components'

// Components
import { PageWrapper } from './wrappers'

const ErrorBox = styled.pre`
  background-color: rgba(206, 17, 38, 0.05);
  border-radius: 0.25rem;
  display: block;
  margin: 0.5em 0;
  overflow-x: auto;
  padding: 0.5em;
  white-space: pre-wrap;
`

export const ErrorCode = styled.code`
  color: #c80000;
  font-weight: bold;
`
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
