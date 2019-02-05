import styled from 'styled-components'
import { colors } from '.'

const ErrorBox = styled.pre`
  background-color: ${colors.error.background};
  box-shadow: 4px 0 ${colors.error.shadow}, 0 -4px ${colors.error.shadow},
    -4px 0 ${colors.error.shadow}, 0 4px ${colors.error.shadow};
  display: block;
  margin: 0.5em 0;
  overflow-x: auto;
  padding: 0.5em;
  white-space: pre-wrap;
`

export default ErrorBox
