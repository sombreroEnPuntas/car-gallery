import styled from 'styled-components'
import { colors } from '.'

const Coin = styled.i`
  display: inline-block;
  height: 16px;
  margin-bottom: 32px;
  margin-right: 32px;
  position: relative;
  transform-origin: top left;
  transform: scale(3);
  width: 16px;

  &::before {
    position: absolute;
    top: -1px;
    left: -1px;
    display: block;
    content: '';
    background: 0 0;

    width: 1px;
    height: 1px;
    color: ${colors.coin.main};
    box-shadow: 6px 1px ${colors.coin.secondary},
      7px 1px ${colors.coin.secondary}, 8px 1px ${colors.coin.secondary},
      9px 1px ${colors.coin.secondary}, 10px 1px ${colors.coin.secondary},
      11px 1px ${colors.coin.secondary}, 4px 2px ${colors.coin.secondary},
      5px 2px ${colors.coin.secondary}, 6px 2px ${colors.coin.secondary},
      7px 2px ${colors.coin.accent}, 8px 2px ${colors.coin.accent},
      9px 2px ${colors.coin.accent}, 10px 2px ${colors.coin.secondary},
      11px 2px ${colors.coin.secondary}, 12px 2px ${colors.coin.secondary},
      13px 2px ${colors.coin.secondary}, 3px 3px ${colors.coin.secondary},
      4px 3px ${colors.coin.secondary}, 5px 3px ${colors.coin.accent},
      6px 3px ${colors.coin.accent}, 7px 3px, 8px 3px, 9px 3px, 10px 3px,
      11px 3px, 12px 3px ${colors.coin.secondary},
      13px 3px ${colors.coin.secondary}, 3px 4px ${colors.coin.secondary},
      4px 4px ${colors.coin.accent}, 5px 4px, 6px 4px,
      7px 4px ${colors.coin.accent}, 8px 4px ${colors.coin.accent},
      9px 4px ${colors.coin.accent}, 10px 4px ${colors.coin.secondary}, 11px 4px,
      12px 4px, 13px 4px ${colors.coin.secondary},
      14px 4px ${colors.coin.secondary}, 2px 5px ${colors.coin.secondary},
      3px 5px ${colors.coin.secondary}, 4px 5px ${colors.coin.accent}, 5px 5px,
      6px 5px, 7px 5px ${colors.coin.accent}, 8px 5px, 9px 5px,
      10px 5px ${colors.coin.secondary}, 11px 5px, 12px 5px,
      13px 5px ${colors.coin.secondary}, 14px 5px ${colors.coin.secondary},
      2px 6px ${colors.coin.secondary}, 3px 6px ${colors.coin.accent}, 4px 6px,
      5px 6px, 6px 6px, 7px 6px ${colors.coin.accent}, 8px 6px, 9px 6px,
      10px 6px ${colors.coin.secondary}, 11px 6px, 12px 6px, 13px 6px,
      14px 6px ${colors.coin.secondary}, 15px 6px ${colors.coin.secondary},
      2px 7px ${colors.coin.secondary}, 3px 7px ${colors.coin.accent}, 4px 7px,
      5px 7px, 6px 7px, 7px 7px ${colors.coin.accent}, 8px 7px, 9px 7px,
      10px 7px ${colors.coin.secondary}, 11px 7px, 12px 7px, 13px 7px,
      14px 7px ${colors.coin.secondary}, 15px 7px ${colors.coin.secondary},
      2px 8px ${colors.coin.secondary}, 3px 8px ${colors.coin.accent}, 4px 8px,
      5px 8px, 6px 8px, 7px 8px ${colors.coin.accent}, 8px 8px, 9px 8px,
      10px 8px ${colors.coin.secondary}, 11px 8px, 12px 8px, 13px 8px,
      14px 8px ${colors.coin.secondary}, 15px 8px ${colors.coin.secondary},
      2px 9px ${colors.coin.secondary}, 3px 9px ${colors.coin.accent}, 4px 9px,
      5px 9px, 6px 9px, 7px 9px ${colors.coin.accent}, 8px 9px, 9px 9px,
      10px 9px ${colors.coin.secondary}, 11px 9px, 12px 9px, 13px 9px,
      14px 9px ${colors.coin.secondary}, 15px 9px ${colors.coin.secondary},
      2px 10px ${colors.coin.secondary}, 3px 10px ${colors.coin.accent},
      4px 10px, 5px 10px, 6px 10px, 7px 10px ${colors.coin.accent}, 8px 10px,
      9px 10px, 10px 10px ${colors.coin.secondary}, 11px 10px, 12px 10px,
      13px 10px, 14px 10px ${colors.coin.secondary},
      15px 10px ${colors.coin.secondary}, 2px 11px ${colors.coin.secondary},
      3px 11px ${colors.coin.accent}, 4px 11px, 5px 11px, 6px 11px,
      7px 11px ${colors.coin.accent}, 8px 11px, 9px 11px,
      10px 11px ${colors.coin.secondary}, 11px 11px, 12px 11px, 13px 11px,
      14px 11px ${colors.coin.secondary}, 15px 11px ${colors.coin.secondary},
      2px 12px ${colors.coin.secondary}, 3px 12px ${colors.coin.secondary},
      4px 12px ${colors.coin.accent}, 5px 12px, 6px 12px,
      7px 12px ${colors.coin.accent}, 8px 12px, 9px 12px,
      10px 12px ${colors.coin.secondary}, 11px 12px, 12px 12px,
      13px 12px ${colors.coin.secondary}, 14px 12px ${colors.coin.secondary},
      3px 13px ${colors.coin.secondary}, 4px 13px ${colors.coin.accent},
      5px 13px, 6px 13px, 7px 13px ${colors.coin.accent},
      8px 13px ${colors.coin.secondary}, 9px 13px ${colors.coin.secondary},
      10px 13px ${colors.coin.secondary}, 11px 13px, 12px 13px,
      13px 13px ${colors.coin.secondary}, 14px 13px ${colors.coin.secondary},
      3px 14px ${colors.coin.secondary}, 4px 14px ${colors.coin.secondary},
      5px 14px ${colors.coin.accent}, 6px 14px, 7px 14px, 8px 14px, 9px 14px,
      10px 14px, 11px 14px, 12px 14px ${colors.coin.secondary},
      13px 14px ${colors.coin.secondary}, 4px 15px ${colors.coin.secondary},
      5px 15px ${colors.coin.secondary}, 6px 15px ${colors.coin.secondary},
      7px 15px, 8px 15px, 9px 15px, 10px 15px ${colors.coin.secondary},
      11px 15px ${colors.coin.secondary}, 12px 15px ${colors.coin.secondary},
      13px 15px ${colors.coin.secondary}, 6px 16px ${colors.coin.secondary},
      7px 16px ${colors.coin.secondary}, 8px 16px ${colors.coin.secondary},
      9px 16px ${colors.coin.secondary}, 10px 16px ${colors.coin.secondary},
      11px 16px ${colors.coin.secondary};
  }
`

export default Coin
