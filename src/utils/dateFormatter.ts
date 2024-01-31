import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function dateFormatter(date: Date) {
  return formatDistance(date, new Date(), {
    locale: ptBR,
    addSuffix: true,
  })
}
