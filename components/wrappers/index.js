import { keyframes } from 'styled-components'

export const animations = {
  blink: keyframes`
  0% {
    opacity: .2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: .2;
  }
  `,
  rotateIn: keyframes`
  0% {
    opacity: 0;
    transform: rotateY(0) translateY(100%);
  }
  100% {
    opacity: 1;
    transform: rotateY(1800deg) translateY(0);
  }
  `,
  fadeOut: keyframes`
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }`,
}

export const breakpoints = {
  mobile: '768px',
}

export const colors = {
  coin: { main: 'gold', border: 'black', accent: 'goldenrod' },
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

export const fonts = {
  fontFamily: "'Press Start 2P', monospace",
  lineHeight: '1.5em',
}
