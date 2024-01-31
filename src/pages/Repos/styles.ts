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

export const SearchRepoWrapper = styled.form`
  width: 100%;
  max-width: 54rem;

  margin-top: 4.5rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > label {
      font-size: 1.125rem;
      font-weight: 700;
      color: ${(props) => props.theme['base-subtitle']};
    }

    > span {
      font-size: 0.875rem;
      color: ${(props) => props.theme['base-span']};
    }
  }
  input {
    margin-top: 0.5rem;
  }
`

export const RepoContainersWrapper = styled.main`
  width: 100%;
  max-width: 54rem;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  padding-top: 3rem;
  margin-bottom: 1.5rem;
`
