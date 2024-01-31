import { Link } from 'react-router-dom'
import { Container, ErrorWrapper } from './styles'

export function Error() {
  return (
    <Container>
      <ErrorWrapper>
        <h2>404 error</h2>
        <span>Essa página não existe!</span>
        <Link to={'/'}>Voltar para a home</Link>
      </ErrorWrapper>
    </Container>
  )
}
