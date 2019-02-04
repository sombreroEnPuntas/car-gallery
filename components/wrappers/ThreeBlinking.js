import styled from 'styled-components'
import { animations } from '.'

const ThreeBlinking = styled.div`
  animation: ${animations.blink} 1.4s linear infinite both;
  display: inline-block;

  ::before {
    content: '.';
  }

  :nth-child(2) {
    animation-delay: 0.2s;
  }
  :nth-child(3) {
    animation-delay: 0.4s;
  }
`

export default ThreeBlinking
