import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { Header } from '../components/Header'

export default function DefaultLayout() {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 18.5rem 1fr;
`
