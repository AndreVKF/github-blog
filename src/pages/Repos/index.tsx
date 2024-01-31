import {
  LoaderFunctionArgs,
  useLoaderData,
  useSearchParams,
} from 'react-router-dom'
import { SyntheticEvent, useState } from 'react'
import { Container, RepoContainersWrapper, SearchRepoWrapper } from './styles'
import { RepoCard } from './components/RepoCard'
import { UserCard } from '../../components/UserCard'
import { Input } from '../../components/Input'
import { api } from '../../lib/api'
import { useUserContext } from '../../layouts/UserLayout'
import { Pagination } from '../../components/Pagination'
import { numberFormatter } from '../../utils/numberFormatter'

export type RepositoryItem = {
  id: number
  name: string
  description?: string
  language: string
  html_url: string
  created_at: string
  updated_at: string
  open_issues: number
  forks: number
  forks_url: string
  issues_url: string
}

type RepositoriesData = {
  total_count: number
  items: RepositoryItem[]
}

const perPage = 10

export async function loader(props: LoaderFunctionArgs) {
  const username = props.params.username
  const page = new URL(props.request.url).searchParams.get('page') ?? '1'
  const query = new URL(props.request.url).searchParams.get('query')
  const adjustedPage = Number(page) > 100 ? '100' : page

  const githubResponse = await api.get<RepositoriesData>(
    '/search/repositories',
    {
      params: {
        q: `user:${username}${query ? ` ${query} in:name` : ''}`,
        per_page: perPage,
        page: adjustedPage,
      },
    },
  )
  const data = githubResponse.data

  return data
}

export function Repos() {
  const data = useLoaderData() as RepositoriesData

  const { user } = useUserContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')

  const pageIndex = Number(searchParams.get('page')) || 1
  const adjustedPageIndex = pageIndex > 100 ? 100 : pageIndex

  function handlePagination(pageIndex: number) {
    setSearchParams((params) => {
      params.set('page', pageIndex.toString())

      return params
    })
  }

  function handleQuerySearch(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) {
    event.preventDefault()
    if (!query) {
      setSearchParams((params) => {
        params.delete('query')

        return params
      })
      return
    }

    setSearchParams((params) => {
      params.delete('page')
      params.set('query', query)

      return params
    })
  }

  const maxPageCount = data.total_count > 1000 ? 1000 : data.total_count // github api limits searchs

  // create skeleton handler

  return (
    <Container>
      <UserCard user={user} />

      <SearchRepoWrapper onSubmit={handleQuerySearch}>
        <header>
          <label htmlFor="">Repositories</label>
          <span>{numberFormatter(data.total_count)} repositórios</span>
        </header>
        <Input
          placeholder="Buscar um repositório pelo nome..."
          name="query"
          id="query"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
        />
      </SearchRepoWrapper>

      <RepoContainersWrapper>
        {data &&
          data.items.map((item) => {
            return <RepoCard key={item.id} repoItem={item} />
          })}
      </RepoContainersWrapper>

      <Pagination
        onPageChange={handlePagination}
        perPage={perPage}
        pageIndex={adjustedPageIndex}
        totalCount={maxPageCount}
      />
    </Container>
  )
}

// name
// created_at
// updated_at: last_update
// forks_count: total_forks
// open_issues_count: open_issues
// language
