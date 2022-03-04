export function trimObj (vals) {
  const trimmed = {}
  Object.keys(vals).forEach(k => {
    if (typeof vals[k] === 'string') trimmed[k] = vals[k].trim()
    else trimmed[k] = vals[k]
  })
  return trimmed
}
