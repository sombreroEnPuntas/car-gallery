import styled from 'styled-components'
import { animations } from '.'
import Coin from './Coin'

const CoinEarned = styled(Coin)`
  animation: ${animations.rotateIn} 1.4s ease-out forwards,
    ${animations.fadeOut} 2s ease-out forwards;

  position: absolute;
`

export default CoinEarned
