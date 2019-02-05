import styled from 'styled-components'
import { breakpoints } from '.'

const PageWrapper = styled.div`
  margin: auto;
  width: 96vw;

  @media (min-width: ${breakpoints['mobile']}) {
    width: 80vw;
  }
`

export default PageWrapper
