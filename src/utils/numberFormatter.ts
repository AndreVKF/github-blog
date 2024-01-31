export function numberFormatter(value: number) {
  return new Intl.NumberFormat('pt-BR').format(value)
}
