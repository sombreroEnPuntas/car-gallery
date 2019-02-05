// @flow
import React, { Fragment } from 'react'
import type { Node } from 'react'

// Components
import Message from './message'
import Modal from './wrappers/Modal'
import PageWrapper from './wrappers/PageWrapper'

type PropsT = {| +children: Node, +isLoading: boolean, +message: ?string |}

const Form = ({ children, isLoading, message }: PropsT) => (
  <Fragment>
    <PageWrapper>{children}</PageWrapper>
    <Modal open={isLoading || !!message}>
      <Message message={message} />
    </Modal>
  </Fragment>
)

export default Form
