import styled from 'styled-components'

import {
  ArrowLineUpRight,
  Calendar,
  CaretLeft,
  GithubLogo,
  WarningCircle,
} from 'phosphor-react'
import { Link } from 'react-router-dom'
import { RepoDataProps } from '../pages/Issues'
import { dateFormatter } from '../utils/dateFormatter'
import { numberFormatter } from '../utils/numberFormatter'

interface RepoHeaderProps {
  repoData: RepoDataProps
  username: string
}

export function RepoHeader({ repoData, username }: RepoHeaderProps) {
  return (
    <Container>
      <HeaderWrapper>
        <Link to={`/${username}/repos`}>
          <CaretLeft />
          VOLTAR
        </Link>

        <Link to={repoData.html_url}>
          <ArrowLineUpRight />
          VER NO GITHUB
        </Link>
      </HeaderWrapper>

      <h2>{repoData.full_name}</h2>

      <FooterWrapper>
        <span>
          <GithubLogo />
          {username}
        </span>

        <span>
          <Calendar />
          {dateFormatter(new Date(repoData.created_at))}
        </span>

        <span>
          <WarningCircle />
          {numberFormatter(repoData.open_issues)} issues
        </span>
      </FooterWrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 2.5rem;
  border-radius: 10px;

  background: ${(props) => props.theme['base-profile']};
  box-shadow: 0px 2px 28px 0px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;

  h2 {
    margin-top: 1.25rem;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.3;
    color: ${(props) => props.theme['base-title']};
  }
`

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > a {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    color: ${(props) => props.theme.primary};
    font-weight: 700;
    font-size: 0.75rem;
    text-transform: uppercase;

    svg {
      width: 18px;
      height: 18px;
      margin-bottom: 2px;
    }
  }
`

const FooterWrapper = styled.footer`
  margin-top: 0.75rem;
  color: ${(props) => props.theme['base-span']};

  display: flex;
  align-items: center;
  gap: 2rem;

  svg {
    width: 18px;
    height: 18px;
    margin-bottom: 2px;
  }

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`
