function initWistiaShowcase() {
  const root = document.querySelector("[data-wistia-showcase]")
  if (!root) return

  const modal = root.querySelector("[data-wistia-modal]")
  const frame = root.querySelector("[data-wistia-frame]")
  const fallbackLink = root.querySelector("[data-wistia-fallback-link]")
  const closeEls = root.querySelectorAll("[data-wistia-close]")

  if (!modal || !frame || !fallbackLink) return

  function openModal(embedUrl, fallbackUrl) {
    // Inject iframe only on demand
    frame.innerHTML = `
  <div class="wistia_responsive_padding">
    <div class="wistia_responsive_wrapper">
      <iframe
        src="${embedUrl}"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        loading="lazy"
        scrolling="no"
        class="wistia_embed"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  </div>
`

    fallbackLink.href = fallbackUrl

    modal.hidden = false
    modal.setAttribute("aria-hidden", "false")
    document.body.style.overflow = "hidden"
  }

  function closeModal() {
    modal.hidden = true
    modal.setAttribute("aria-hidden", "true")
    frame.innerHTML = "" // stop playback + free resources
    document.body.style.overflow = ""
  }

  root.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-wistia-open]")
    if (!btn) return

    const embedUrl = btn.getAttribute("data-wistia-embed")
    const fallbackUrl = btn.getAttribute("data-wistia-fallback")

    if (!embedUrl || !fallbackUrl) return
    openModal(embedUrl, fallbackUrl)
  })

  closeEls.forEach((el) => el.addEventListener("click", closeModal))

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal()
  })
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWistiaShowcase)
} else {
  initWistiaShowcase()
}
