import styled from 'styled-components'
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from 'phosphor-react'

export interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <Container>
      <span>
        Página {pageIndex} de {pages}
      </span>

      <PaginationContainer>
        <PaginationBoxWrapper
          onClick={() => onPageChange(0)}
          disabled={pageIndex <= 1}
        >
          <CaretDoubleLeft />
        </PaginationBoxWrapper>

        <PaginationBoxWrapper
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={pageIndex <= 1}
        >
          <CaretLeft />
        </PaginationBoxWrapper>

        <PaginationBoxWrapper
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={pageIndex >= pages}
        >
          <CaretRight />
        </PaginationBoxWrapper>

        <PaginationBoxWrapper
          onClick={() => onPageChange(pages)}
          disabled={pageIndex >= pages}
        >
          <CaretDoubleRight />
        </PaginationBoxWrapper>
      </PaginationContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;

  span {
    font-size: 0.875rem;
  }
`
const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const PaginationBoxWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2rem;
  height: 2rem;

  color: ${(props) => props.theme.primary};
  background: ${(props) => props.theme['base-post']};
  border: 1px solid ${(props) => props.theme['base-border']};
  border-radius: 2px;

  line-height: 0;

  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
  }

  &:disabled {
    cursor: not-allowed;
    color: ${(props) => props.theme['base-span']};
  }

  &:not(:disabled):hover {
    opacity: 0.8;
  }
`
