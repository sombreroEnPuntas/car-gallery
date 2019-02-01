// @flow
import React from 'react'
import styled from 'styled-components'

// Components
import { colors, fonts, PageWrapper } from './wrappers'

export const ErrorBox = styled.pre`
  background-color: ${colors.error.background};
  box-shadow: 4px 0 ${colors.error.shadow}, 0 -4px ${colors.error.shadow},
    -4px 0 ${colors.error.shadow}, 0 4px ${colors.error.shadow};
  display: block;
  margin: 0.5em 0;
  overflow-x: auto;
  padding: 0.5em;
  white-space: pre-wrap;
`

export const ErrorCode = styled.code`
  color: ${colors.error.outline};
  font-family: ${fonts.fontFamily};
  font-size: 0.65em;
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
