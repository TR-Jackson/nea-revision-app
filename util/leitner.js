export function genNextReview (box) {
  switch (box) {
    case 0:
      return Date.now() + 1 * 86400000
    case 1:
      return Date.now() + 2 * 86400000
    case 2:
      return Date.now() + 3 * 86400000
    case 3:
      return Date.now() + 4 * 86400000
    case 4:

    default:
      return Date.now()
  }
}
