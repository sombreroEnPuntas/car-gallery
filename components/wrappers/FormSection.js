import styled from 'styled-components'

const FormSection = styled.section`
  display: ${props => (props.active ? 'block' : 'none')};
`

export default FormSection
