import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 3rem;

  > div:first-child {
    max-width: 54rem;
    margin-top: -104px;
  }
`

export const ContentWrapper = styled.main`
  max-width: 54rem;
  margin-top: 2.5rem;
`
