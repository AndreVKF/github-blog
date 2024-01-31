import {
  LoaderFunctionArgs,
  useLoaderData,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { Container, IssueContainersWrapper, SearchRepoWrapper } from './styles'
import { IssueCard } from './components/IssueCard'
import { Input } from '../../components/Input'
import { RepoHeader } from '../../components/RepoHeader'
import { api } from '../../lib/api'
import { numberFormatter } from '../../utils/numberFormatter'
import { Pagination } from '../../components/Pagination'

export type IssueItem = {
  id: number
  number: number
  title: string
  created_at: string
  body: string
}

interface IssueRequestData {
  total_count: number
  items: IssueItem[]
}

export interface RepoDataProps {
  id: number
  name: string
  full_name: string
  language: string
  html_url: string
  forks: number
  open_issues: number
  created_at: string
}

type UseParamsProps = {
  username: string
  repoName: string
}

const perPage = 10

export async function loader(props: LoaderFunctionArgs) {
  const username = props.params.username
  const repoName = props.params.repoName

  const page = new URL(props.request.url).searchParams.get('page') ?? '1'
  const query = new URL(props.request.url).searchParams.get('query')
  const adjustedPage = Number(page) > 100 ? '100' : page

  const githubResponse = await api.get<IssueRequestData>('/search/issues', {
    params: {
      q: `repo:${username}/${repoName}${query ? ` ${query} in:name` : ''}`,
      per_page: perPage,
      page: adjustedPage,
    },
  })

  const data = githubResponse.data

  return data
}

export function Issues() {
  const data = useLoaderData() as IssueRequestData
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [repoData, setRepoData] = useState<RepoDataProps | null>(null)

  const { username, repoName } = useParams<UseParamsProps>()

  const pageIndex = Number(searchParams.get('page')) || 1
  const adjustedPageIndex = pageIndex > 100 ? 100 : pageIndex

  function handlePagination(pageIndex: number) {
    setSearchParams((params) => {
      params.set('page', pageIndex.toString())

      return params
    })
  }

  function handleQuerySearch(event: FormEvent<HTMLFormElement>) {
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

  useEffect(() => {
    api
      .get(`repos/${username}/${repoName}`)
      .then((resp: AxiosResponse) => {
        const {
          id,
          name,
          full_name,
          language,
          forks,
          html_url,
          open_issues,
          created_at,
        } = resp.data
        setRepoData({
          id,
          name,
          full_name,
          language,
          forks,
          html_url,
          open_issues,
          created_at,
        })
      })
      .catch((err: AxiosError) => {
        console.log(err)
        setRepoData(null)
      })
  }, [repoData, username, repoName])

  const maxPageCount = data.total_count > 1000 ? 1000 : data.total_count // github api limits searchs

  if (!username || !repoName) {
    return <Container></Container>
  }

  return (
    <Container>
      {repoData && username && (
        <RepoHeader repoData={repoData} username={username} />
      )}

      <SearchRepoWrapper onSubmit={handleQuerySearch}>
        <header>
          <label htmlFor="">Issues</label>
          <span>{numberFormatter(data.total_count)} publicações</span>
        </header>
        <Input
          placeholder="Buscar por conteúdo..."
          id="query"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </SearchRepoWrapper>

      <IssueContainersWrapper>
        {data.items.map((issueItem) => {
          return (
            <IssueCard
              key={issueItem.id}
              issueItem={issueItem}
              username={username}
              repoName={repoName}
            />
          )
        })}
      </IssueContainersWrapper>

      <Pagination
        onPageChange={handlePagination}
        perPage={perPage}
        pageIndex={adjustedPageIndex}
        totalCount={maxPageCount}
      />
    </Container>
  )
}
