import { Form } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SearchWrapper = styled(Form)`
  width: 54rem;
  padding: 2.5rem;
  border-radius: 10px;

  background: ${(props) => props.theme['base-profile']};
  box-shadow: 0px 2px 28px 0px rgba(0, 0, 0, 0.2);

  margin-top: -104px;

  display: flex;
  align-items: center;
  gap: 0.8rem;

  input {
    flex: 1;
  }
`

interface ButtonSearchProps {
  $disabled: boolean
}

export const ButtonSearch = styled.button<ButtonSearchProps>`
  background: transparent;
  border: 0;

  cursor: pointer;

  svg {
    width: 4rem;
    height: 4rem;
    color: ${(props) =>
      props.$disabled ? props.theme['base-span'] : props.theme.primary};
  }
`
