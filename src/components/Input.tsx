import { InputHTMLAttributes } from 'react'
import styled from 'styled-components'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
}

export function Input({ placeholder, ...rest }: InputProps) {
  return <Container placeholder={placeholder} {...rest} />
}

const Container = styled.input`
  width: 100%;
  border-radius: 6px;
  padding: 0.75rem 1rem;

  background: ${(props) => props.theme['base-input']};
  border: 1px solid ${(props) => props.theme['base-border']};
  color: ${(props) => props.theme['base-text']};
`
