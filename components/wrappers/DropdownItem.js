import styled from 'styled-components'
import { fonts } from '.'

export const DropdownItem = styled.li`
  align-items: center;
  display: flex;
  height: ${fonts.lineHeight};
  justify-content: center;
  margin: 0;
  overflow: hidden;
  padding: 0;
  text-align: center;
  text-decoration: none;
  text-overflow: ellipsis;
  text-transform: capitalize;
  white-space: nowrap;
  width: 100%;
`

export default DropdownItem
