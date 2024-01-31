import { Outlet, useOutletContext, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { Header } from '../components/Header'
import { api } from '../lib/api'

export type User = {
  login: string
  id: number
  html_url: string
  name: string
  bio?: string
  company?: string
  public_repos: number
  followers: number
}

interface OutletContext {
  user: User
}

export default function UserLayout() {
  const [user, setUser] = useState<User | null>(null)
  const { username } = useParams()

  useEffect(() => {
    if (user !== null) return

    api
      .get(`/users/${username}`)
      .then((resp: AxiosResponse) => {
        const {
          login,
          id,
          html_url,
          name,
          bio,
          company,
          public_repos,
          followers,
        } = resp.data
        setUser({
          login,
          id,
          html_url,
          name,
          bio,
          company,
          public_repos,
          followers,
        })
      })
      .catch((err: AxiosError) => {
        console.log(err)
        setUser(null)
      })
  }, [username, user])

  return (
    <Container>
      <Header />
      <Outlet context={{ user }} />
    </Container>
  )
}

export function useUserContext() {
  return useOutletContext<OutletContext>()
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 18.5rem 1fr;
`
