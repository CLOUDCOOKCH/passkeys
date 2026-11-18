/* global document, window, ResizeObserver */
const frame = document.querySelector('.poster-viewport')
function fitPoster() {
  frame.style.setProperty('--screen-scale', String(frame.clientWidth / 800))
}
fitPoster()
new ResizeObserver(fitPoster).observe(frame)

async function printPoster() {
  await document.fonts.ready
  await Promise.all(Array.from(document.images, (image) => image.decode().catch(() => {})))
  window.print()
}
document.querySelector('.print-tools button').addEventListener('click', printPoster)
window.addEventListener('load', printPoster, { once: true })
