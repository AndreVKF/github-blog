import styled from 'styled-components'
import { GitFork, WarningCircle } from 'phosphor-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { RepositoryItem } from '..'
import { dateFormatter } from '../../../utils/dateFormatter'

interface RepoCardProps {
  repoItem: RepositoryItem
}

export function RepoCard({ repoItem }: RepoCardProps) {
  const navigate = useNavigate()
  const { username } = useParams()

  function handleGoToIssues() {
    navigate(`/${username}/${repoItem.name}/issues`)
  }

  return (
    <Container>
      <HeaderWrapper>
        <h2 onClick={handleGoToIssues}>{repoItem.name}</h2>
        <div>
          <time>publicado {dateFormatter(new Date(repoItem.created_at))}</time>
          <time>
            último update {dateFormatter(new Date(repoItem.updated_at))}
          </time>
        </div>
      </HeaderWrapper>
      <p>{repoItem.description}</p>
      <FooterWrapper>
        <span>{repoItem.language}</span>
        <div>
          <Link to={repoItem.forks_url}>
            <GitFork />
            {repoItem.forks}
          </Link>

          <Link to={repoItem.issues_url}>
            <WarningCircle />
            {repoItem.open_issues}
          </Link>
        </div>
      </FooterWrapper>
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

  > p {
    color: ${(props) => props.theme['base-text']};
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: justify;

    height: 10rem;
  }
`

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  h2 {
    font-size: 1.25rem;
    color: ${(props) => props.theme['base-title']};

    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme.primary};
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: start;

    time {
      font-size: 0.75rem;
      color: ${(props) => props.theme['base-span']};
      line-height: 1.4;
    }
  }
`

const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > span {
    color: ${(props) => props.theme.primary};
  }

  > div {
    display: flex;
    align-items: center;

    gap: 0.5rem;

    a {
      display: flex;
      align-items: center;
      gap: 0.125rem;
      color: ${(props) => props.theme['base-span']};

      svg {
        width: 18px;
        height: 18px;
        margin-bottom: 4px;
      }
    }
  }
`
