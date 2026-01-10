function initServicesTabs(root) {
  const tabs = Array.from(root.querySelectorAll("[data-tab]"))
  const panels = Array.from(root.querySelectorAll("[data-panel]"))
  if (!tabs.length || !panels.length) return

  function setActive(id) {
    tabs.forEach((t) => {
      const active = t.getAttribute("data-tab") === id
      t.classList.toggle("is-active", active)
      t.setAttribute("aria-selected", active ? "true" : "false")
    })

    panels.forEach((p) => {
      p.hidden = p.getAttribute("data-panel") !== id
    })
  }

  root.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-tab]")
    if (!btn) return
    const id = btn.getAttribute("data-tab")
    setActive(id)

    // keep the active tab visible when horizontally scrollable
    btn.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    })
  })

  setActive(tabs[0].getAttribute("data-tab"))
}

function initAll() {
  document.querySelectorAll("[data-services-tabs]").forEach((root) => {
    // prevent double-init if you ever mount twice
    if (root.dataset.tabsBound === "true") return
    root.dataset.tabsBound = "true"
    initServicesTabs(root)
  })
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAll)
} else {
  initAll()
}
