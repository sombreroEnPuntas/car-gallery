import styled from 'styled-components'
import { breakpoints, colors, fonts } from '.'

const Select = styled.select`
  appearance: none;
  background-color: ${({ disabled }) => (disabled ? colors.disabled : 'white')};
  ::-ms-expand {
    display: none;
  }
  border: none;
  box-shadow: 0 4px ${({ status }) => colors[status || 'black'].shadow},
    0 -4px ${({ status }) => colors[status || 'black'].shadow},
    4px 0 ${({ status }) => colors[status || 'black'].shadow},
    -4px 0 ${({ status }) => colors[status || 'black'].shadow};
  font-family: ${fonts.fontFamily};
  line-height: calc(2 * ${fonts.lineHeight});
  margin: 4px;
  outline-color: ${({ status }) => colors[status || 'black'].outline};
  padding: 0.5rem 1rem;
  text-transform: capitalize;
  width: 100%;

  @media (min-width: ${breakpoints['mobile']}) {
    font-size: ${fonts.lineHeight};
    line-height: ${fonts.lineHeight};
  }
`

export default Select
