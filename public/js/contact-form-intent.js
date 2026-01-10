function initContactFormIntent() {
  const root = document.querySelector("[data-contact-form]")
  if (!root) return

  const intentSelect = root.querySelector("[data-intent-select]")
  const intentField = root.querySelector("[data-field-intent]")
  const planField = root.querySelector("[data-field-plan]")
  const modeLabel = root.querySelector("[data-mode-label]")

  const fieldsets = Array.from(root.querySelectorAll("fieldset[data-intent]"))

  const params = new URLSearchParams(window.location.search)
  const initialIntent = (params.get("intent") || "retainer").toLowerCase()
  const initialPlan = (params.get("plan") || "").toLowerCase()

  function labelFor(intent, plan) {
    if (intent === "project") return "Project (Hourly)"
    if (intent === "retainer") {
      if (plan === "partner") return "Partner Retainer"
      if (plan === "essentials") return "Essentials Retainer"
      return "Retainer (General)"
    }
    return "Inquiry"
  }

  function setMode(intent, plan) {

    // added after id change off project_message and  retainer_message
    const projectMsg = root.querySelector("#projectMessage")
    const retainerMsg = root.querySelector("#retainerMessage")

    if (projectMsg && retainerMsg) {
      if (intent === "project") {
        projectMsg.required = true
        retainerMsg.required = false
      } else {
        projectMsg.required = false
        retainerMsg.required = true
      }
    }
    // set hidden fields for Formspree submission
    if (intentField) intentField.value = intent
    if (planField) planField.value = plan || ""

    // update dropdown UI
    if (intentSelect) intentSelect.value = intent

    // show/hide fieldsets
    fieldsets.forEach((fs) => {
      fs.hidden = fs.getAttribute("data-intent") !== intent
    })

    // header line
    if (modeLabel) modeLabel.textContent = labelFor(intent, plan)
  }

  // initial state from query string
  setMode(initialIntent === "project" ? "project" : "retainer", initialPlan)

  // allow manual switching
  intentSelect?.addEventListener("change", (e) => {
    const intent = e.target.value
    // if user manually switches, keep plan but it’s ok if empty
    setMode(intent, initialPlan)
  })
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initContactFormIntent)
} else {
  initContactFormIntent()
}
