function initBeforeAfter(root) {
  console.log("[BeforeAfter] init", root)

  //   const dataEl = root.querySelector("[data-beforeafter-data]")
  const card = root.querySelector("[data-beforeafter-pairs]")
  const compareEl = root.querySelector("[data-beforeafter-compare]")
  const range = root.querySelector("[data-beforeafter-range]")
  const beforeImg = root.querySelector("[data-beforeafter-before-img]")
  const afterImg = root.querySelector("[data-beforeafter-after-img]")
  const caption = root.querySelector("[data-beforeafter-caption]")
  const prevBtn = root.querySelector("[data-beforeafter-prev]")
  const nextBtn = root.querySelector("[data-beforeafter-next]")
  const dots = Array.from(root.querySelectorAll("[data-beforeafter-dot]"))
  const logoImg = root.querySelector("[data-beforeafter-logo]")

  console.log("[BeforeAfter] elements", {
    // dataEl: !!dataEl,
    compareEl: !!compareEl,
    range: !!range,
    beforeImg: !!beforeImg,
    afterImg: !!afterImg,
    caption: !!caption,
    prevBtn: !!prevBtn,
    nextBtn: !!nextBtn,
    dots: dots.length,
    logoImg: !!logoImg,
  })

  // If any of these are false, your markup data-attributes don't match the JS
  if (
    // !dataEl ||
    !compareEl ||
    !range ||
    !beforeImg ||
    !afterImg ||
    !caption ||
    !logoImg
  ) {
    console.warn(
      "[BeforeAfter] Missing required elements. Check data-* attributes in the component."
    )
    return
  }

  //   const pairs = JSON.parse(dataEl.textContent || "[]")
  const pairs = JSON.parse(card?.getAttribute("data-beforeafter-pairs") || "[]")
  console.log("[BeforeAfter] pairs loaded:", pairs.length)
  if (!pairs.length) return

  // set logo
  const logoSrc = root.getAttribute("data-logo-src")
  console.log("[BeforeAfter] logoSrc:", logoSrc)
  if (logoSrc) logoImg.src = logoSrc

  let index = 0

  function setPos(value) {
    const v = Math.max(0, Math.min(100, Number(value)))
    compareEl.style.setProperty("--pos", `${v}%`)
    range.value = String(v)
  }

  function setActiveDot(i) {
    dots.forEach((d) =>
      d.classList.toggle(
        "is-active",
        Number(d.getAttribute("data-index")) === i
      )
    )
  }

  function loadPair(i) {
    index = (i + pairs.length) % pairs.length
    const p = pairs[index]

    beforeImg.src = p.beforeSrc
    beforeImg.alt = p.beforeAlt || "Before"
    afterImg.src = p.afterSrc
    afterImg.alt = p.afterAlt || "After"
    caption.textContent = p.title || ""

    setActiveDot(index)
    setPos(50)
  }

  // slider
  range.addEventListener("input", (e) => setPos(e.target.value))

  // nav
  prevBtn?.addEventListener("click", () => {
    console.log("[BeforeAfter] prev click")
    loadPair(index - 1)
  })
  nextBtn?.addEventListener("click", () => {
    console.log("[BeforeAfter] next click")
    loadPair(index + 1)
  })

  // dots
  dots.forEach((d) => {
    d.addEventListener("click", () => {
      console.log("[BeforeAfter] dot click", d.getAttribute("data-index"))
      loadPair(Number(d.getAttribute("data-index")) || 0)
    })
  })

  loadPair(0)
}

function initAll() {
  const roots = document.querySelectorAll("[data-beforeafter]")
  console.log("[BeforeAfter] found roots:", roots.length)
  roots.forEach((root) => initBeforeAfter(root))
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAll)
} else {
  initAll()
}
