import styled from 'styled-components'
import { colors } from '.'

const Coin = styled.div`
  width: 21px;
  height: 12px;
  background: ${colors.coin.main};
  box-shadow:
    /* 
    * Inner Background Color
    */ 0 -6px 0 -2px
      ${colors.coin.main},
    0 6px 0 -2px ${colors.coin.main}, 0 -12px 0 -4px ${colors.coin.main},
    0 12px 0 -4px ${colors.coin.main}, 0 -18px 0 -8px ${colors.coin.main},
    0 18px 0 -8px ${colors.coin.main}, 0 -24px 0 -12px ${colors.coin.main},
    0 24px 0 -12px ${colors.coin.main},
    /* 
    * Inner Border
    */ -2px 0 0 0 ${colors.coin.border},
    2px 0 0 0 ${colors.coin.border}, 0 -4px 0 0 ${colors.coin.border},
    0 4px 0 0 ${colors.coin.border}, 0 -10px 0 -2px ${colors.coin.border},
    0 10px 0 -2px ${colors.coin.border}, 0 -14px 0 -4px ${colors.coin.border},
    0 14px 0 -4px ${colors.coin.border}, 0 -20px 0 -8px ${colors.coin.border},
    0 20px 0 -8px ${colors.coin.border}, 0 -26px 0 -12px ${colors.coin.border},
    0 26px 0 -12px ${colors.coin.border},
    /* 
    * Middle Border 
    */ -4px 0 0 0 ${colors.coin.accent},
    4px 0 0 0 ${colors.coin.accent}, 0 -2px 0 2px ${colors.coin.accent},
    0 2px 0 2px ${colors.coin.accent}, 0 -8px 0 0px ${colors.coin.accent},
    0 8px 0 0px ${colors.coin.accent}, 0 -12px 0 -2px ${colors.coin.accent},
    0 12px 0 -2px ${colors.coin.accent}, 0 -16px 0 -4px ${colors.coin.accent},
    0 16px 0 -4px ${colors.coin.accent}, 0 -22px 0 -8px ${colors.coin.accent},
    0 22px 0 -8px ${colors.coin.accent}, 0 -28px 0 -12px ${colors.coin.accent},
    0 28px 0 -12px ${colors.coin.accent},
    /*
    * Outer Border
    */ -6px 0 0 0 ${colors.coin.border},
    6px 0 0 0 ${colors.coin.border}, 0 0 0 4px ${colors.coin.border},
    0 -6px 0 2px ${colors.coin.border}, 0 6px 0 2px ${colors.coin.border},
    0 -10px 0 0 ${colors.coin.border}, 0 10px 0 0 ${colors.coin.border},
    0 -14px 0 -2px ${colors.coin.border}, 0 14px 0 -2px ${colors.coin.border},
    0 -18px 0 -4px ${colors.coin.border}, 0 18px 0 -4px ${colors.coin.border},
    0 -24px 0 -8px ${colors.coin.border}, 0 24px 0 -8px ${colors.coin.border},
    0 -30px 0 -12px ${colors.coin.border}, 0 30px 0 -12px ${colors.coin.border};
`

export default Coin
