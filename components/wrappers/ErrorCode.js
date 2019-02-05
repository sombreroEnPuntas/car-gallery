import styled from 'styled-components'
import { colors, fonts } from '.'

const ErrorCode = styled.code`
  color: ${colors.error.outline};
  font-family: ${fonts.fontFamily};
  font-size: 0.65em;
  font-weight: bold;
`

export default ErrorCode
