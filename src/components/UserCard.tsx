import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ArrowLineUpRight, GithubLogo, Buildings, Users } from 'phosphor-react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { User } from '../layouts/UserLayout'
import { numberFormatter } from '../utils/numberFormatter'

import { defaultTheme } from '../styles/themes/default'

interface UserCardProps {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  return (
    <SkeletonTheme
      baseColor={defaultTheme['base-background']}
      highlightColor={defaultTheme['base-border']}
    >
      <Container>
        {user ? (
          <img src={`${user.html_url}.png`} alt="" />
        ) : (
          <Skeleton width={148} height={148} />
        )}

        <UserDescriptionWrapper>
          {user ? (
            <HeaderWrapper>
              <h3>{user.name}</h3>
              <Link to={`${user.html_url}`}>
                GITHUB
                <ArrowLineUpRight />
              </Link>
            </HeaderWrapper>
          ) : (
            <HeaderWrapper>
              <Skeleton count={5} width={600} height={18} />
            </HeaderWrapper>
          )}

          {user && <article>{user.bio}</article>}

          {user ? (
            <FooterWrapper>
              <span>
                <GithubLogo />
                {user.login}
              </span>

              <span>
                <Buildings />
                {user.company ?? 'Developer'}
              </span>

              <span>
                <Users />
                {numberFormatter(user.followers)} seguidores
              </span>
            </FooterWrapper>
          ) : (
            <FooterWrapper>
              <Skeleton count={3} width={160} height={18} />
            </FooterWrapper>
          )}
        </UserDescriptionWrapper>
      </Container>
    </SkeletonTheme>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 2.5rem;
  border-radius: 10px;

  background: ${(props) => props.theme['base-profile']};
  box-shadow: 0px 2px 28px 0px rgba(0, 0, 0, 0.2);

  display: flex;
  gap: 2rem;

  > img {
    width: 148px;
    height: 148px;
    object-fit: contain;
    border-radius: 8px;
  }
`

const UserDescriptionWrapper = styled.section`
  flex: 1;
  height: 100%;

  display: flex;
  flex-direction: column;

  article {
    margin-top: 1rem;
    color: ${(props) => props.theme['base-text']};
  }
`

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.3;
    color: ${(props) => props.theme['base-title']};
  }

  a {
    display: flex;
    align-items: center;

    color: ${(props) => props.theme.primary};
    gap: 0.5rem;

    svg {
      color: ${(props) => props.theme.primary};
      line-height: 0;
    }
  }
`

const FooterWrapper = styled.footer`
  padding-top: 1.75rem;

  display: flex;
  align-items: center;
  gap: 1.5rem;

  span {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    color: ${(props) => props.theme['base-subtitle']};

    svg {
      width: 24px;
      height: 24px;
      color: ${(props) => props.theme['base-label']};
      line-height: 0;
      padding-bottom: 2px;
    }
  }
`
