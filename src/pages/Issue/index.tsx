import Markdown from 'react-markdown'
import { LoaderFunctionArgs, useLoaderData, useParams } from 'react-router-dom'
import { Container, ContentWrapper } from './styles'
import { IssueHeader } from '../../components/IssueHeader'
import { api } from '../../lib/api'

type UserIssueInfo = {
  login: string
}

export interface IssueRequestItem {
  html_url: string
  title: string
  user: UserIssueInfo
  created_at: string
  body: string
  comments: number
}

type UseParamsProps = {
  username: string
  repoName: string
}

export async function loader(props: LoaderFunctionArgs) {
  const username = props.params.username
  const repoName = props.params.repoName
  const issueNumber = props.params.issueNumber

  const githubResponse = await api.get<IssueRequestItem>(
    `/repos/${username}/${repoName}/issues/${issueNumber}`,
  )

  const data = githubResponse.data

  return data
}

export function Issue() {
  const data = useLoaderData() as IssueRequestItem
  const { username, repoName } = useParams<UseParamsProps>()

  if (!username || !repoName) {
    return <Container></Container>
  }

  return (
    <Container>
      <IssueHeader issueItem={data} username={username} repoName={repoName} />

      <ContentWrapper>
        <Markdown>{data.body}</Markdown>
      </ContentWrapper>
    </Container>
  )
}
