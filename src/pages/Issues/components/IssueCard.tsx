import styled from 'styled-components'
import Markdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { IssueItem } from '..'
import { dateFormatter } from '../../../utils/dateFormatter'

interface IssueCardProps {
  issueItem: IssueItem
  username: string
  repoName: string
}

export function IssueCard({ issueItem, username, repoName }: IssueCardProps) {
  return (
    <Container>
      <HeaderWrapper>
        <Link to={`/${username}/${repoName}/issues/${issueItem.number}`}>
          {issueItem.title}
        </Link>
        <time>{dateFormatter(new Date(issueItem.created_at))}</time>
      </HeaderWrapper>

      <MarkdownContainer>{issueItem.body}</MarkdownContainer>
    </Container>
  )
}

const Container = styled.article`
  background: ${(props) => props.theme['base-post']};
  border-radius: 10px;

  min-width: 416px;
  min-height: 260px;

  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const MarkdownContainer = styled(Markdown)`
  color: ${(props) => props.theme['base-text']};
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;

  height: 10rem;
`

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  a {
    font-size: 1.25rem;
    color: ${(props) => props.theme['base-title']};
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme.primary};
    }
  }

  time {
    font-size: 0.75rem;
    color: ${(props) => props.theme['base-span']};
    line-height: 1.4;
  }
`
