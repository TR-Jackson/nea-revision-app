export function calcTNR (n, EF) {
  if (n === 0) return new Date(Date.now() + 86400000)
  if (n === 1) return new Date(Date.now() + 86400000)
  if (n === 2) return new Date(Date.now + 6 * 86400000)
  return new Date(Date.now() + Math.ceil(EF ** (n - 2) * 6) * 86400000)
}

export function calcNewEF (EF, q) {
  if (EF === 1.3) return 1.3
  const newEF = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  if (newEF <= 1.3) return 1.3
  if (newEF >= 2.5) return 2.5
  return newEF
}
// [unrevised, n=0, 1, 2-3, 4-7, 8+]
export function calcBound (n) {
  if (n >= 8) return 5
  if (n >= 4 && n < 8) return 4
  if (n >= 2 && n < 4) return 3
  if (n === 1) return 2
  if (n === 0) return 1
  throw new Error('Invalid n')
}
