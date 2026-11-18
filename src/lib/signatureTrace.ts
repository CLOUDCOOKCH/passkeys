// Only used to draw a repeatable illustration. Verification happens outside this component.
function drawingSeed(text: string) {
  let seed = 2166136261
  for (let i = 0; i < text.length; i++) seed = Math.imul(seed ^ text.charCodeAt(i), 16777619)
  return seed >>> 0
}

export const plotWidth = 720
export const plotHeight = 348
const pointsPerTrace = 192

/** Project fine strands laid along a winding tube, then fit the bundle inside the graticule. */
function ribbonPaths(seed: number, count: number, spread: number): string[] {
  const tilt = -.49 + ((seed >>> 24) / 255) * .34
  const rotation = .43 + ((seed & 255) / 255) * 1.18
  const twist = .3 + (((seed >>> 8) & 255) / 255) * 1.44
  const radius = .51 + (((seed >>> 16) & 255) / 255) * .18

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  const strands = Array.from({ length: count }, (_, strand) => {
    const offset = (strand / (count - 1) - .5) * spread
    return Array.from({ length: pointsPerTrace }, (_, i) => {
      const t = (2 * Math.PI * i) / pointsPerTrace
      const weave = 3 * t + twist + offset
      const ring = .92 + radius * Math.cos(weave)
      const x = ring * Math.cos(t + rotation)
      const y = ring * Math.sin(t + rotation) * tilt + radius * Math.sin(weave) + .12 * x
      minX = Math.min(minX, x)
      maxX = Math.max(maxX, x)
      minY = Math.min(minY, y)
      maxY = Math.max(maxY, y)
      return { x, y }
    })
  })

  const gutterX = 49, gutterY = 39
  const scaleX = (plotWidth - 2 * gutterX) / (maxX - minX)
  const scaleY = (plotHeight - 2 * gutterY) / (maxY - minY)
  return strands.map(points => 'M' + points.map(({ x, y }) =>
    (gutterX + (x - minX) * scaleX).toFixed(1) + ',' +
    (gutterY + (y - minY) * scaleY).toFixed(1)
  ).join(' ') + 'Z')
}

export function messageTracePaths(message: string, challenge: string): string[] {
  return ribbonPaths(drawingSeed(message.length + ':' + message + challenge), 21, 2.32)
}

export function signatureTracePaths(signatureHex: string): string[] {
  return signatureHex ? ribbonPaths(drawingSeed(signatureHex), 3, .18) : []
}
