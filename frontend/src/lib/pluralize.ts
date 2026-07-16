/**
 * Склонение существительных после числительных.
 * Пример: pluralize(1, ['урок', 'урока', 'уроков']) => 'урок'
 *         pluralize(2, ['урок', 'урока', 'уроков']) => 'урока'
 *         pluralize(5, ['урок', 'урока', 'уроков']) => 'уроков'
 */
export function pluralize(
  count: number,
  forms: [nominative: string, genitiveSingular: string, genitivePlural: string],
): string {
  const abs = Math.abs(count)
  const lastDigit = abs % 10
  const lastTwoDigits = abs % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return forms[2]
  }
  if (lastDigit === 1) {
    return forms[0]
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return forms[1]
  }
  return forms[2]
}