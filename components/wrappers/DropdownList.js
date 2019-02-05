import styled from 'styled-components'
import { colors, fonts } from '.'

const DropdownList = styled.ul`
  background-color: white;
  border: solid 2px;
  border-top: 0;
  box-shadow: 4px 0 ${colors['black'].shadow}, 0 -4px ${colors['black'].shadow},
    -4px 0 ${colors['black'].shadow}, 0 4px ${colors['black'].shadow};
  list-style: none;
  margin: 0 4px;
  max-height: calc(6 * ${fonts.lineHeight});
  overflow-y: hidden;
  padding: 0;
  position: absolute;
  top: 0;
  width: calc(100% - 12px);
`

export default DropdownList
