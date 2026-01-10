function initPosterSamples() {
  const root = document.querySelector("[data-posters]")
  if (!root) return

  const modal = root.querySelector("[data-posters-modal]")
  const img = root.querySelector("[data-posters-img]")
  const caption = root.querySelector("[data-posters-caption]")

  const thumbs = Array.from(root.querySelectorAll("[data-poster-thumb]"))
  const closeEls = Array.from(root.querySelectorAll("[data-posters-close]"))
  const prevBtn = root.querySelector("[data-posters-prev]")
  const nextBtn = root.querySelector("[data-posters-next]")

  if (!modal || !img || !caption || !thumbs.length) return

  const preloaded = new Set()

  const conn =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection
  const saveData = conn && conn.saveData
  const slow = conn && /2g/.test(conn.effectiveType || "")

  function preloadSrc(src) {
    if (saveData || slow) return
    if (!src || preloaded.has(src)) return
    preloaded.add(src)
    const im = new Image()
    im.src = src
  }

  let index = 0

  const getData = (i) => {
    const el = thumbs[i]
    return {
      src: el.getAttribute("data-full"), // <-- full image for modal
      alt: el.getAttribute("data-alt") || `Poster ${i + 1}`,
    }
  }

  function render() {
    const { src, alt } = getData(index)
    img.src = src
    img.alt = alt
    caption.textContent = `${index + 1} / ${thumbs.length}`

    // Preload next/prev full images for faster navigation
    const nextIndex = (index + 1) % thumbs.length
    const prevIndex = (index - 1 + thumbs.length) % thumbs.length

    preloadSrc(getData(nextIndex).src)
    preloadSrc(getData(prevIndex).src)
  }

  function openAt(i) {
    index = i
    render()
    modal.hidden = false
    modal.setAttribute("aria-hidden", "false")
    document.body.style.overflow = "hidden"
  }

  function close() {
    modal.hidden = true
    modal.setAttribute("aria-hidden", "true")
    document.body.style.overflow = ""
    img.src = ""
  }

  function prev() {
    index = (index - 1 + thumbs.length) % thumbs.length
    render()
  }

  function next() {
    index = (index + 1) % thumbs.length
    render()
  }

  thumbs.forEach((t) => {
    t.addEventListener("click", () =>
      openAt(Number(t.getAttribute("data-index")) || 0)
    )
  })

  closeEls.forEach((el) => el.addEventListener("click", close))
  prevBtn?.addEventListener("click", prev)
  nextBtn?.addEventListener("click", next)

  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return
    if (e.key === "Escape") close()
    if (e.key === "ArrowLeft") prev()
    if (e.key === "ArrowRight") next()
  })
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPosterSamples)
} else {
  initPosterSamples()
}
