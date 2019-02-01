import styled from 'styled-components'

export const colors = {
  black: {
    background: 'white',
    outline: '"#e7e7e7"',
    shadow: '#212529',
  },
  error: {
    background: 'rgba(231, 110, 85, 0.5)',
    outline: '#ce372b',
    shadow: '#e76e55',
  },
  success: {
    background: 'rgba(146, 204, 65, 0.5)',
    outline: '#76c442',
    shadow: '#92cc41',
  },
}

export const PageWrapper = styled.div`
  margin: auto;
  width: 80vw;
`

export const FormLineWrap = styled.div`
  display: flex;
  width: 100%;
`

export const Input = styled.input`
  border: none;
  box-shadow: 0 4px ${props => colors[props.status || 'black'].shadow},
    0 -4px ${props => colors[props.status || 'black'].shadow},
    4px 0 ${props => colors[props.status || 'black'].shadow},
    -4px 0 ${props => colors[props.status || 'black'].shadow};
  font-family: 'Press Start 2P', monospace;
  margin: 4px;
  outline-color: ${props => colors[props.status || 'black'].outline};
  padding: 0.5rem 1rem;
  text-transform: capitalize;
  width: 100%;
`

export const DropdownWrap = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
`

export const DropdownList = styled.ul`
  background-color: white;
  border: solid 2px;
  border-top: 0;
  box-shadow: 4px 0 #212529, 0 -4px #212529, -4px 0 #212529, 0 4px #212529;
  list-style: none;
  margin: 0 4px;
  max-height: 9.5rem;
  overflow-y: hidden;
  padding: 0;
  position: absolute;
  top: 0;
  width: calc(100% - 12px);
`

export const DropdownItem = styled.li`
  align-items: center;
  display: flex;
  height: 1.6rem;
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
