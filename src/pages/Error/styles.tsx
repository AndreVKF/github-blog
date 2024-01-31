import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  place-items: center;
`

export const ErrorWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 1.5rem;

  h2 {
    font-size: 6.4rem;
    color: ${(props) => props.theme['base-title']};
  }

  span {
    font-size: 1.5rem;
  }

  a {
    font-size: 1.5rem;
    color: ${(props) => props.theme['base-text']};

    &:hover {
      color: ${(props) => props.theme.primary};
    }
  }
`
