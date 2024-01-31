import styled from 'styled-components'

import { Link } from 'react-router-dom'
import LeftEffect from '../assets/images/left_effect.svg'
import RightEffect from '../assets/images/right_effect.svg'
import Logo from '../assets/images/logo.svg'

export function Header() {
  return (
    <Container>
      <img src={LeftEffect} alt="" />
      <LogoContainer to={'/'}>
        <img src={Logo} alt="" />
        <span>GITHUB BLOG</span>
      </LogoContainer>
      <img src={RightEffect} alt="" />
    </Container>
  )
}

const Container = styled.header`
  background: rgb(17, 33, 49);
  background: linear-gradient(
    0deg,
    rgba(17, 33, 49, 1) 0%,
    rgba(7, 20, 34, 1) 90%
  );

  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    flex: 1;
    max-width: 440px;
    object-fit: cover;
  }
`

const LogoContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1.25rem;

  margin-bottom: 4rem;

  > img {
    width: 45px;
    height: 40px;
    object-fit: contain;
  }

  > span {
    color: ${(props) => props.theme.primary};
    font-size: 1.5rem;
    white-space: nowrap;

    text-shadow:
      0 0 1px ${(props) => props.theme.white},
      0 0 16px ${(props) => props.theme.primary};
  }
`
