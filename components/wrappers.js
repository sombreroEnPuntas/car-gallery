import styled from 'styled-components'

export const fonts = {
  fontFamily: "'Press Start 2P', monospace",
  lineHeight: '1.5em',
}

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

export const breakpoints = {
  mobile: '768px',
}

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

export const PageWrapper = styled.div`
  margin: auto;
  width: 96vw;

  @media (min-width: ${breakpoints['mobile']}) {
    width: 80vw;
  }
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
  font-family: ${fonts.fontFamily};
  line-height: calc(2 * ${fonts.lineHeight});
  margin: 4px;
  outline-color: ${props => colors[props.status || 'black'].outline};
  padding: 0.5rem 1rem;
  text-transform: capitalize;
  width: 100%;

  @media (min-width: ${breakpoints['mobile']}) {
    font-size: ${fonts.lineHeight};
    line-height: ${fonts.lineHeight};
  }
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
