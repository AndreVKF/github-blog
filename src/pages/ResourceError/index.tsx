import { Link } from 'react-router-dom'
import { Container, ErrorWrapper } from './styles'
import { Header } from '../../components/Header'

export function ResourceError() {
  return (
    <Container>
      <Header />
      <ErrorWrapper>
        <h2>422 error</h2>
        <span>Erro ao obter recursos do Github!</span>
        <Link to={'/'}>Voltar para a home</Link>
      </ErrorWrapper>
    </Container>
  )
}
