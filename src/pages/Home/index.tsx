import { GithubLogo } from 'phosphor-react'
import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { useState } from 'react'
import { ButtonSearch, Container, SearchWrapper } from './styles'
import { Input } from '../../components/Input'

export async function action(props: ActionFunctionArgs) {
  const data = await props.request.formData()
  const username = data.get('username')

  return redirect(`/${username}/repos`)
}

export function Home() {
  const [query, setQuery] = useState('')

  return (
    <Container>
      <SearchWrapper method="POST" action="/">
        <Input
          placeholder="Buscar usuário do github..."
          name="username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <ButtonSearch type="submit" $disabled={!query}>
          <GithubLogo />
        </ButtonSearch>
      </SearchWrapper>
    </Container>
  )
}
