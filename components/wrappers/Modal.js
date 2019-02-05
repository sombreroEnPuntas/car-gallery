import styled from 'styled-components'

const Modal = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  display: ${({ open }) => (open ? 'flex' : 'none')};
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: auto;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
`

export default Modal
