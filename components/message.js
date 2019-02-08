// @flow
import React from 'react'

// Components
import ErrorBox from './wrappers/ErrorBox'
import ErrorCode from './wrappers/ErrorCode'
import MessageBox from './wrappers/MessageBox'
import ThreeBlinking from './wrappers/ThreeBlinking'
import Countdown from './countdown'

type PropsT = {| +message: ?string, +retry: boolean |}

const Message = ({ message, retry }: PropsT) =>
  message ? (
    <MessageBox>
      <h3>{'Ooops...'}</h3>
      <p>{'Something went sideways :$'}</p>
      <ErrorBox>
        <ErrorCode>{message}</ErrorCode>
      </ErrorBox>
      {retry ? <Countdown /> : <p>{'Try again later!'}</p>}
    </MessageBox>
  ) : (
    <MessageBox>
      <h3>
        {'Loading '}
        <ThreeBlinking />
        <ThreeBlinking />
        <ThreeBlinking />
      </h3>
    </MessageBox>
  )

export default Message
