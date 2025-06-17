// ===== VARIABLES GLOBALES =====
let currentSection = 0
let isScrolling = false
let touchStartX = 0
let touchStartY = 0
let currentTheme = localStorage.getItem("theme") || "dark"

// ===== INITIALISATION =====
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  // Thème
  initializeTheme()

  // Navigation
  initializeNavigation()

  // Scroll horizontal (page d'accueil uniquement)
  if (document.querySelector(".scroll-container")) {
    initializeHorizontalScroll()
  }

  // Animations au scroll
  initializeScrollAnimations()

  // Menu contextuel avancé
  initializeAdvancedContextMenu()

  // Filtres projets
  if (document.querySelector(".filters-container")) {
    initializeProjectFilters()
  }

  // Formulaire de contact
  if (document.querySelector("#contact-form")) {
    initializeContactForm()
  }

  // FAQ
  if (document.querySelector(".faq-container")) {
    initializeFAQ()
  }

  // Compteurs animés
  initializeCounters()

  // Barres de compétences
  initializeSkillBars()

  // Effets de morphing
  initializeMorphingEffects()

  // Gestion responsive
  initializeResponsive()

  // Effets visuels avancés
  initializeAdvancedEffects()
}

// ===== GESTION DU THÈME =====
function initializeTheme() {
  // Appliquer le thème sauvegardé
  document.documentElement.setAttribute("data-theme", currentTheme)

  // Créer le bouton de changement de thème
  createThemeToggle()
}

function createThemeToggle() {
  const navContainer = document.querySelector(".nav-container")
  if (!navContainer) return

  const themeToggle = document.createElement("button")
  themeToggle.className = "theme-toggle"
  themeToggle.innerHTML = `<span class="theme-toggle-icon">${currentTheme === "dark" ? "☀️" : "🌙"}</span>`
  themeToggle.setAttribute("aria-label", "Changer le thème")

  themeToggle.addEventListener("click", toggleTheme)
  navContainer.appendChild(themeToggle)
}

function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark"
  document.documentElement.setAttribute("data-theme", currentTheme)
  localStorage.setItem("theme", currentTheme)

  // Mettre à jour l'icône
  const icon = document.querySelector(".theme-toggle-icon")
  if (icon) {
    icon.textContent = currentTheme === "dark" ? "☀️" : "🌙"
  }

  // Animation de transition
  document.body.style.transition = "all 0.3s ease"
  setTimeout(() => {
    document.body.style.transition = ""
  }, 300)

  showNotification(`Thème ${currentTheme === "dark" ? "sombre" : "clair"} activé`, "success")
}

// ===== NAVIGATION =====
function initializeNavigation() {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")
  const navbar = document.getElementById("navbar")

  // Menu hamburger
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Fermer le menu au clic sur un lien
    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })
  }

  // Navbar au scroll avec effet glassmorphism
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  }
}

// ===== SCROLL HORIZONTAL =====
function initializeHorizontalScroll() {
  const scrollContainer = document.getElementById("scroll-container")
  const sections = document.querySelectorAll(".section")
  const progressBar = document.getElementById("progress-bar")
  const navLeft = document.getElementById("nav-left")
  const navRight = document.getElementById("nav-right")

  if (!scrollContainer || !sections.length) return

  const totalSections = sections.length

  // Navigation par flèches
  if (navLeft && navRight) {
    navLeft.addEventListener("click", () => navigateSection(-1))
    navRight.addEventListener("click", () => navigateSection(1))
  }

  // Navigation au clavier
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      navigateSection(-1)
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      navigateSection(1)
    }
  })

  // Navigation à la molette avec debouncing
  let wheelTimeout
  document.addEventListener(
    "wheel",
    (e) => {
      if (isScrolling) return

      clearTimeout(wheelTimeout)
      wheelTimeout = setTimeout(() => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          // Scroll horizontal
          if (e.deltaX > 0) {
            navigateSection(1)
          } else {
            navigateSection(-1)
          }
        } else if (Math.abs(e.deltaY) > 50) {
          // Scroll vertical converti en horizontal
          if (e.deltaY > 0) {
            navigateSection(1)
          } else {
            navigateSection(-1)
          }
        }
      }, 50)
    },
    { passive: true },
  )

  // Touch gestures améliorés
  document.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    },
    { passive: true },
  )

  document.addEventListener(
    "touchend",
    (e) => {
      if (isScrolling) return

      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY
      const deltaX = touchStartX - touchEndX
      const deltaY = touchStartY - touchEndY

      // Détecter le swipe horizontal
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          navigateSection(1) // Swipe left -> section suivante
        } else {
          navigateSection(-1) // Swipe right -> section précédente
        }
      }
    },
    { passive: true },
  )

  function navigateSection(direction) {
    if (isScrolling) return

    const newSection = currentSection + direction

    if (newSection < 0 || newSection >= totalSections) return

    currentSection = newSection
    updateScrollPosition()
    updateNavigation()
    updateProgressBar()
  }

  function updateScrollPosition() {
    isScrolling = true
    const translateX = -currentSection * 100

    scrollContainer.style.transform = `translateX(${translateX}vw)`

    // Réactiver la navigation après l'animation
    setTimeout(() => {
      isScrolling = false
    }, 800)

    // Déclencher les animations de la section active
    triggerSectionAnimations(currentSection)
  }

  function updateNavigation() {
    if (navLeft && navRight) {
      navLeft.disabled = currentSection === 0
      navRight.disabled = currentSection === totalSections - 1
    }
  }

  function updateProgressBar() {
    if (progressBar) {
      const progress = ((currentSection + 1) / totalSections) * 100
      progressBar.style.width = `${progress}%`
    }
  }

  function triggerSectionAnimations(sectionIndex) {
    const section = sections[sectionIndex]
    if (!section) return

    const animatedElements = section.querySelectorAll(".animate-on-scroll")
    animatedElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("animate")
      }, index * 100)
    })
  }

  // Initialiser la première section
  updateNavigation()
  updateProgressBar()
  triggerSectionAnimations(0)
}

// ===== ANIMATIONS AU SCROLL =====
function initializeScrollAnimations() {
  // Intersection Observer pour les animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target
        const delay = element.dataset.delay || 0

        setTimeout(() => {
          element.classList.add("animate")
        }, delay * 1000)

        observer.unobserve(element)
      }
    })
  }, observerOptions)

  // Observer tous les éléments à animer
  document.querySelectorAll(".animate-on-scroll").forEach((element) => {
    observer.observe(element)
  })

  // Parallaxe sur les images
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll("[data-parallax]")

    parallaxElements.forEach((element) => {
      const speed = element.dataset.parallax || 0.5
      const yPos = -(scrolled * speed)
      element.style.transform = `translateY(${yPos}px)`
    })
  })
}

// ===== MENU CONTEXTUEL AVANCÉ =====
function initializeAdvancedContextMenu() {
  const contextMenu = document.getElementById("context-menu")
  if (!contextMenu) return

  let currentElement = null

  // Désactiver le menu contextuel par défaut
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    currentElement = e.target
    showAdvancedContextMenu(e.clientX, e.clientY, e.target)
  })

  // Fermer le menu au clic
  document.addEventListener("click", () => {
    hideContextMenu()
  })

  // Fermer le menu à l'échap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideContextMenu()
    }
  })

  // Actions du menu contextuel
  contextMenu.addEventListener("click", (e) => {
    const action = e.target.closest(".context-menu-item")?.dataset.action
    if (action) {
      handleAdvancedContextMenuAction(action, currentElement)
    }
    hideContextMenu()
  })

  function showAdvancedContextMenu(x, y, targetElement) {
    // Analyser le contexte
    const context = analyzeContext(targetElement)
    updateContextMenuItems(context)

    contextMenu.style.left = `${x}px`
    contextMenu.style.top = `${y}px`
    contextMenu.classList.add("show")

    // Ajuster la position si le menu dépasse de l'écran
    const rect = contextMenu.getBoundingClientRect()
    if (rect.right > window.innerWidth) {
      contextMenu.style.left = `${x - rect.width}px`
    }
    if (rect.bottom > window.innerHeight) {
      contextMenu.style.top = `${y - rect.height}px`
    }
  }

  function analyzeContext(element) {
    const context = {
      isImage: false,
      isText: false,
      isLink: false,
      isProject: false,
      hasDownload: false,
    }

    // Vérifier si c'est une image
    if (
      element.tagName === "IMG" ||
      element.closest(".project-image") ||
      element.closest(".hero-image-container") ||
      element.closest(".profile-image")
    ) {
      context.isImage = true
      context.hasDownload = true
    }

    // Vérifier si c'est un projet
    if (element.closest(".project-item") || element.closest(".project-card")) {
      context.isProject = true
    }

    // Vérifier si c'est un lien
    if (element.tagName === "A" || element.closest("a")) {
      context.isLink = true
    }

    // Vérifier si c'est du texte sélectionnable
    if (
      element.tagName === "P" ||
      element.tagName === "H1" ||
      element.tagName === "H2" ||
      element.tagName === "H3" ||
      element.tagName === "SPAN" ||
      element.tagName === "DIV"
    ) {
      context.isText = true
    }

    return context
  }

  function updateContextMenuItems(context) {
    const menuItems = contextMenu.querySelectorAll(".context-menu-item")

    menuItems.forEach((item) => {
      const action = item.dataset.action
      let shouldShow = true
      let shouldEnable = true

      switch (action) {
        case "view":
          shouldShow = context.isImage
          shouldEnable = context.isImage
          break
        case "download":
          shouldShow = context.isImage || context.isProject
          shouldEnable = context.hasDownload
          break
        case "share":
          shouldShow = true
          shouldEnable = true
          break
        case "copy":
          shouldShow = context.isText || context.isLink
          shouldEnable = context.isText || context.isLink
          break
        case "inspect":
          shouldShow = true
          shouldEnable = true
          break
      }

      if (!shouldShow) {
        item.style.display = "none"
      } else {
        item.style.display = "flex"
        if (!shouldEnable) {
          item.classList.add("disabled")
        } else {
          item.classList.remove("disabled")
        }
      }
    })
  }

  // Ajouter des actions supplémentaires au menu contextuel
  function addContextMenuActions() {
    const contextMenu = document.getElementById("context-menu")
    if (!contextMenu) return

    // Ajouter l'action "Copier l'URL de la page"
    const copyUrlItem = document.createElement("li")
    copyUrlItem.className = "context-menu-item"
    copyUrlItem.dataset.action = "copy-url"
    copyUrlItem.innerHTML = `
      <span class="context-icon">🔗</span>
      Copier l'URL
    `

    // Ajouter l'action "Recharger la page"
    const reloadItem = document.createElement("li")
    reloadItem.className = "context-menu-item"
    reloadItem.dataset.action = "reload"
    reloadItem.innerHTML = `
      <span class="context-icon">🔄</span>
      Recharger
    `

    const menuList = contextMenu.querySelector(".context-menu-list")
    menuList.appendChild(copyUrlItem)
    menuList.appendChild(reloadItem)
  }

  addContextMenuActions()

  function hideContextMenu() {
    contextMenu.classList.remove("show")
    currentElement = null
  }

  function handleAdvancedContextMenuAction(action, element) {
    switch (action) {
      case "view":
        handleViewAction(element)
        break
      case "download":
        handleDownloadAction(element)
        break
      case "share":
        handleShareAction(element)
        break
      case "copy":
        handleCopyAction(element)
        break
      case "inspect":
        handleInspectAction(element)
        break
      case "copy-url":
        copyToClipboard(window.location.href)
        showNotification("URL copiée dans le presse-papiers", "success")
        break
      case "reload":
        window.location.reload()
        break
    }
  }

  function handleViewAction(element) {
    let imageUrl = null
    let imageAlt = "Image"

    if (element.tagName === "IMG") {
      imageUrl = element.src
      imageAlt = element.alt || "Image"
    } else {
      const img = element.querySelector("img") || element.closest(".project-image")?.querySelector("img")
      if (img) {
        imageUrl = img.src
        imageAlt = img.alt || "Image"
      }
    }

    if (imageUrl) {
      openImageModal(imageUrl, imageAlt)
      showNotification("Image ouverte en grand", "success")
    }
  }

  function handleDownloadAction(element) {
    let imageUrl = null
    let filename = "image"

    if (element.tagName === "IMG") {
      imageUrl = element.src
      filename = element.alt?.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "image"
    } else {
      const img = element.querySelector("img") || element.closest(".project-image")?.querySelector("img")
      if (img) {
        imageUrl = img.src
        filename = img.alt?.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "image"
      }
    }

    if (imageUrl) {
      downloadImageFile(imageUrl, filename)
      showNotification("Téléchargement démarré", "success")
    } else {
      showNotification("Impossible de télécharger cet élément", "error")
    }
  }

  function handleShareAction(element) {
    const shareData = {
      title: "Portfolio Alex Dubois",
      text: "Découvrez le portfolio d'Alex Dubois, Designer Graphique & Illustrateur Digital",
      url: window.location.href,
    }

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => showNotification("Partagé avec succès", "success"))
        .catch(() => {
          copyToClipboard(shareData.url)
          showNotification("Lien copié dans le presse-papiers", "success")
        })
    } else {
      copyToClipboard(shareData.url)
      showNotification("Lien copié dans le presse-papiers", "success")
    }
  }

  function handleCopyAction(element) {
    let textToCopy = ""

    if (element.tagName === "A") {
      textToCopy = element.href
    } else {
      textToCopy = element.textContent || element.innerText
    }

    if (textToCopy) {
      copyToClipboard(textToCopy)
      showNotification("Texte copié", "success")
    }
  }

  function handleInspectAction(element) {
    // Simuler l'inspection d'élément
    const elementInfo = {
      tag: element.tagName.toLowerCase(),
      classes: Array.from(element.classList).join(", "),
      id: element.id || "Aucun",
      text: element.textContent?.substring(0, 50) + "..." || "Aucun texte",
    }

    const info = `Élément: ${elementInfo.tag}\nClasses: ${elementInfo.classes}\nID: ${elementInfo.id}\nTexte: ${elementInfo.text}`

    showNotification("Informations de l'élément copiées", "success")
    copyToClipboard(info)
  }
}

function openImageModal(src, alt) {
  const modal = document.createElement("div")
  modal.className = "image-modal"
  modal.innerHTML = `
    <div class="image-modal-content" style="
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      background: var(--background-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      overflow: hidden;
      box-shadow: var(--shadow-glow);
    ">
      <button class="image-modal-close" style="
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 40px;
        height: 40px;
        background: var(--background-glass);
        border: 1px solid var(--border-color);
        border-radius: 50%;
        color: var(--text-primary);
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 10;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
      ">&times;</button>
      <img src="${src}" alt="${alt}" style="
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
      ">
      <div style="
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--background-glass);
        backdrop-filter: blur(20px);
        padding: 1rem;
        border-top: 1px solid var(--border-color);
        color: var(--text-primary);
        text-align: center;
      ">
        ${alt}
      </div>
    </div>
  `

  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3000;
    opacity: 0;
    transition: opacity 0.3s ease;
  `

  document.body.appendChild(modal)

  requestAnimationFrame(() => {
    modal.style.opacity = "1"
  })

  const closeModal = () => {
    modal.style.opacity = "0"
    setTimeout(() => {
      document.body.removeChild(modal)
    }, 300)
  }

  modal.querySelector(".image-modal-close").addEventListener("click", closeModal)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal()
  })

  // Fermer avec Échap
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      closeModal()
      document.removeEventListener("keydown", handleEscape)
    }
  }
  document.addEventListener("keydown", handleEscape)
}

function downloadImageFile(src, filename) {
  try {
    const link = document.createElement("a")
    link.href = src
    link.download = filename + ".jpg"
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error("Erreur lors du téléchargement:", error)
    showNotification("Erreur lors du téléchargement", "error")
  }
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopyTextToClipboard(text))
  } else {
    fallbackCopyTextToClipboard(text)
  }
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea")
  textArea.value = text
  textArea.style.position = "fixed"
  textArea.style.left = "-999999px"
  textArea.style.top = "-999999px"
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    document.execCommand("copy")
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err)
  }

  document.body.removeChild(textArea)
}

function showNotification(message, type = "success") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  document.body.appendChild(notification)

  requestAnimationFrame(() => {
    notification.classList.add("show")
  })

  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

// ===== FILTRES PROJETS =====
function initializeProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectItems = document.querySelectorAll(".project-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.dataset.filter

      // Mettre à jour les boutons actifs
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Filtrer les projets avec animation
      projectItems.forEach((item, index) => {
        const category = item.dataset.category

        if (filter === "all" || category === filter) {
          item.style.display = "block"
          item.classList.remove("hidden")

          // Animation d'apparition échelonnée
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "translateY(0)"
          }, index * 100)
        } else {
          item.style.opacity = "0"
          item.style.transform = "translateY(20px)"

          setTimeout(() => {
            item.style.display = "none"
            item.classList.add("hidden")
          }, 300)
        }
      })

      showNotification(`Filtre "${this.textContent}" appliqué`, "success")
    })
  })
}

// ===== MODAL PROJETS =====
function openProjectModal(projectId) {
  const modal = document.getElementById("project-modal")
  const modalBody = document.getElementById("modal-body")

  if (!modal || !modalBody) return

  // Contenu du modal selon le projet
  const projectContent = getProjectContent(projectId)
  modalBody.innerHTML = projectContent

  modal.classList.add("active")
  document.body.style.overflow = "hidden"

  // Fermer le modal
  const closeBtn = document.getElementById("modal-close")
  if (closeBtn) {
    closeBtn.addEventListener("click", closeProjectModal)
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeProjectModal()
    }
  })

  // Fermer avec Échap
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      closeProjectModal()
      document.removeEventListener("keydown", handleEscape)
    }
  }
  document.addEventListener("keydown", handleEscape)
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal")
  if (modal) {
    modal.classList.remove("active")
    document.body.style.overflow = ""
  }
}

function getProjectContent(projectId) {
  const projects = {
    "tech-start": `
      <div class="project-modal-content">
        <img src="https://source.unsplash.com/800x400/?branding,tech,startup" alt="Tech Start" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 2rem; filter: brightness(1.1);">
        <h2 style="font-size: 2rem; margin-bottom: 1rem; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Identité visuelle Tech Start</h2>
        <p style="font-size: 1.125rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 2rem;">
          Création complète de l'identité visuelle pour une startup technologique innovante. 
          Le projet comprenait la conception du logo, le développement de la charte graphique, 
          et toutes les déclinaisons nécessaires pour les supports print et digital.
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
          <div>
            <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">Client</h4>
            <p style="color: var(--text-secondary);">Tech Start Inc.</p>
          </div>
          <div>
            <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">Année</h4>
            <p style="color: var(--text-secondary);">2024</p>
          </div>
          <div>
            <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">Durée</h4>
            <p style="color: var(--text-secondary);">6 semaines</p>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span style="background: var(--background-glass); border: 1px solid var(--border-color); padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.875rem; color: var(--text-primary);">Branding</span>
          <span style="background: var(--background-glass); border: 1px solid var(--border-color); padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.875rem; color: var(--text-primary);">Logo Design</span>
          <span style="background: var(--background-glass); border: 1px solid var(--border-color); padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.875rem; color: var(--text-primary);">Charte Graphique</span>
        </div>
      </div>
    `,
    "urban-dreams": `
      <div class="project-modal-content">
        <img src="https://source.unsplash.com/800x400/?urban,street,art" alt="Urban Dreams" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 2rem; filter: brightness(1.1);">
        <h2 style="font-size: 2rem; margin-bottom: 1rem; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Série Urban Dreams</h2>
        <p style="font-size: 1.125rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 2rem;">
          Série d'illustrations digitales explorant l'esthétique urbaine contemporaine. 
          Chaque œuvre combine techniques traditionnelles et outils numériques pour créer 
          des univers visuels immersifs et poétiques.
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
          <div>
            <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">Technique</h4>
            <p style="color: var(--text-secondary);">Digital Art</p>
          </div>
          <div>
            <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">Nombre d'œuvres</h4>
            <p style="color: var(--text-secondary);">12 illustrations</p>
          </div>
          <div>
            <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">Format</h4>
            <p style="color: var(--text-secondary);">2000x3000px</p>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span style="background: var(--background-glass); border: 1px solid var(--border-color); padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.875rem; color: var(--text-primary);">Illustration</span>
          <span style="background: var(--background-glass); border: 1px solid var(--border-color); padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.875rem; color: var(--text-primary);">Art Digital</span>
          <span style="background: var(--background-glass); border: 1px solid var(--border-color); padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.875rem; color: var(--text-primary);">Urbain</span>
        </div>
      </div>
    `,
    "bio-nature": `
      <div class="project-modal-content">
        <img src="https://source.unsplash.com/800x400/?packaging,organic,natural" alt="Bio Nature" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 2rem; filter: brightness(1.1);">
        <h2 style="font-size: 2rem; margin-bottom: 1rem; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Packaging Bio Nature</h2>
        <p style="font-size: 1.125rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 2rem;">
          Design de packaging écologique pour une gamme de produits biologiques. 
          Le défi était de créer un design moderne et attractif tout en respectant 
          les valeurs environnementales de la marque.
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
          <div>
            <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">Client</h4>
            <p style="color: var(--text-secondary);">Bio Nature Co.</p>
          </div>
          <div>
            <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">Produits</h4>
            <p style="color: var(--text-secondary);">15 références</p>
          </div>
          <div>
            <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">Matériaux</h4>
            <p style="color: var(--text-secondary);">Carton recyclé</p>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span style="background: var(--background-glass); border: 1px solid var(--border-color); padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.875rem; color: var(--text-primary);">Packaging</span>
          <span style="background: var(--background-glass); border: 1px solid var(--border-color); padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.875rem; color: var(--text-primary);">Écologique</span>
          <span style="background: var(--background-glass); border: 1px solid var(--border-color); padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.875rem; color: var(--text-primary);">3D Design</span>
        </div>
      </div>
    `,
    "fashion-hub": `
      <div class="project-modal-content">
        <img src="https://source.unsplash.com/800x400/?fashion,website,design" alt="Fashion Hub" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 2rem; filter: brightness(1.1);">
        <h2 style="font-size: 2rem; margin-bottom: 1rem; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Web Design Fashion Hub</h2>
        <p style="font-size: 1.125rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 2rem;">
          Interface moderne et élégante pour une plateforme de mode en ligne. 
          Le design met l'accent sur l'expérience utilisateur avec une navigation 
          intuitive et une présentation visuelle des produits optimisée.
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
          <div>
            <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">Plateforme</h4>
            <p style="color: var(--text-secondary);">E-commerce</p>
          </div>
          <div>
            <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">Pages</h4>
            <p style="color: var(--text-secondary);">25+ écrans</p>
          </div>
          <div>
            <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">Responsive</h4>
            <p style="color: var(--text-secondary);">Mobile-first</p>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span style="background: var(--background-glass); border: 1px solid var(--border-color); padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.875rem; color: var(--text-primary);">Web Design</span>
          <span style="background: var(--background-glass); border: 1px solid var(--border-color); padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.875rem; color: var(--text-primary);">UI/UX</span>
          <span style="background: var(--background-glass); border: 1px solid var(--border-color); padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.875rem; color: var(--text-primary);">E-commerce</span>
        </div>
      </div>
    `,
  }

  return projects[projectId] || "<p>Projet non trouvé</p>"
}

// ===== FORMULAIRE DE CONTACT =====
function initializeContactForm() {
  const form = document.getElementById("contact-form")
  const successMessage = document.getElementById("form-success")

  if (!form) return

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Validation avancée
    if (!validateForm(form)) {
      return
    }

    // Animation de chargement
    form.classList.add("loading")

    // Simuler l'envoi avec promesse
    simulateFormSubmission()
      .then(() => {
        form.classList.remove("loading")
        if (successMessage) {
          successMessage.classList.add("show")
          showNotification("Message envoyé avec succès !", "success")

          // Réinitialiser après 5 secondes
          setTimeout(() => {
            successMessage.classList.remove("show")
            form.reset()
          }, 5000)
        }
      })
      .catch(() => {
        form.classList.remove("loading")
        showNotification("Erreur lors de l'envoi du message", "error")
      })
  })

  function simulateFormSubmission() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simuler un succès dans 90% des cas
        if (Math.random() > 0.1) {
          resolve()
        } else {
          reject()
        }
      }, 2000)
    })
  }

  function validateForm(form) {
    const requiredFields = form.querySelectorAll("[required]")
    let isValid = true

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = "var(--error-color)"
        field.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.1)"
        isValid = false

        // Ajouter un message d'erreur
        showFieldError(field, "Ce champ est requis")
      } else {
        field.style.borderColor = "var(--border-color)"
        field.style.boxShadow = ""
        removeFieldError(field)
      }
    })

    // Validation email avancée
    const emailField = form.querySelector('input[type="email"]')
    if (emailField && emailField.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(emailField.value)) {
        emailField.style.borderColor = "var(--error-color)"
        emailField.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.1)"
        showFieldError(emailField, "Adresse email invalide")
        isValid = false
      }
    }

    if (!isValid) {
      showNotification("Veuillez corriger les erreurs dans le formulaire", "error")
    }

    return isValid
  }

  function showFieldError(field, message) {
    removeFieldError(field)

    const errorDiv = document.createElement("div")
    errorDiv.className = "field-error"
    errorDiv.textContent = message
    errorDiv.style.cssText = `
      color: var(--error-color);
      font-size: 0.875rem;
      margin-top: 0.25rem;
      animation: fadeInUp 0.3s ease;
    `

    field.parentNode.appendChild(errorDiv)
  }

  function removeFieldError(field) {
    const existingError = field.parentNode.querySelector(".field-error")
    if (existingError) {
      existingError.remove()
    }
  }
}

// ===== FAQ =====
function initializeFAQ() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Fermer tous les autres items avec animation
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active")
        }
      })

      // Ouvrir/fermer l'item actuel
      if (!isActive) {
        item.classList.add("active")
      } else {
        item.classList.remove("active")
      }
    })
  })
}

// ===== COMPTEURS ANIMÉS =====
function initializeCounters() {
  const counters = document.querySelectorAll("[data-target]")

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = Number.parseInt(counter.dataset.target)
          animateCounter(counter, target)
          counterObserver.unobserve(counter)
        }
      })
    },
    { threshold: 0.5 },
  )

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })

  function animateCounter(element, target) {
    let current = 0
    const increment = target / 60 // 60 frames pour une animation fluide
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }

      if (element.textContent.includes("%")) {
        element.textContent = Math.floor(current) + "%"
      } else {
        element.textContent = Math.floor(current)
      }
    }, 16) // ~60fps
  }
}

// ===== BARRES DE COMPÉTENCES =====
function initializeSkillBars() {
  const skillBars = document.querySelectorAll(".skill-bar")

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target
          const level = bar.dataset.level

          setTimeout(() => {
            bar.style.width = level + "%"
          }, 500) // Délai pour un effet plus dramatique

          skillObserver.unobserve(bar)
        }
      })
    },
    { threshold: 0.5 },
  )

  skillBars.forEach((bar) => {
    skillObserver.observe(bar)
  })
}

// ===== EFFETS DE MORPHING =====
function initializeMorphingEffects() {
  // Morphing entre les pages avec effet avancé
  const links = document.querySelectorAll('a[href^="pages/"], a[href="index.html"], a[href="../index.html"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const href = this.getAttribute("href")

      // Effet de morphing avancé
      createAdvancedMorphingTransition(() => {
        window.location.href = href
      })
    })
  })

  function createAdvancedMorphingTransition(callback) {
    // Créer l'overlay de transition avec effet liquide
    const overlay = document.createElement("div")
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--gradient-primary);
      z-index: 9999;
      opacity: 0;
      transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      font-weight: 600;
      backdrop-filter: blur(20px);
    `

    // Effet de morphing liquide
    const morphShape = document.createElement("div")
    morphShape.style.cssText = `
      width: 100px;
      height: 100px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      animation: morphing 1s ease-in-out infinite;
      margin-bottom: 2rem;
    `

    // Ajouter l'animation CSS pour le morphing
    const style = document.createElement("style")
    style.textContent = `
      @keyframes morphing {
        0%, 100% { 
          border-radius: 50%; 
          transform: scale(1) rotate(0deg);
        }
        25% { 
          border-radius: 25% 75% 75% 25%; 
          transform: scale(1.2) rotate(90deg);
        }
        50% { 
          border-radius: 75% 25% 25% 75%; 
          transform: scale(0.8) rotate(180deg);
        }
        75% { 
          border-radius: 25% 75% 25% 75%; 
          transform: scale(1.1) rotate(270deg);
        }
      }
    `
    document.head.appendChild(style)

    overlay.innerHTML = `
      <div style="text-align: center;">
        ${morphShape.outerHTML}
        <div>Transition en cours...</div>
      </div>
    `

    document.body.appendChild(overlay)

    // Animation d'entrée
    requestAnimationFrame(() => {
      overlay.style.opacity = "1"
    })

    // Transition après 0.6s
    setTimeout(() => {
      callback()
    }, 600)
  }
}

// ===== EFFETS VISUELS AVANCÉS =====
function initializeAdvancedEffects() {
  // Effet de particules
  initializeParticleEffect()

  // Effet de glow sur les éléments interactifs
  initializeGlowEffects()
}

function initializeParticleEffect() {
  // Créer un canvas pour les particules
  const canvas = document.createElement("canvas")
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    opacity: 0.3;
  `
  document.body.appendChild(canvas)

  const ctx = canvas.getContext("2d")
  let particles = []

  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }
  }

  function initParticles() {
    particles = []
    for (let i = 0; i < 50; i++) {
      particles.push(createParticle())
    }
  }

  function updateParticles() {
    particles.forEach((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
    })
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle) => {
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`
      ctx.fill()
    })
  }

  function animate() {
    updateParticles()
    drawParticles()
    requestAnimationFrame(animate)
  }

  resizeCanvas()
  initParticles()
  animate()

  window.addEventListener("resize", () => {
    resizeCanvas()
    initParticles()
  })
}

function initializeGlowEffects() {
  // Ajouter des effets de glow aux éléments importants
  const glowElements = document.querySelectorAll(".btn-primary, .project-card, .skill-category, .nav-logo")

  glowElements.forEach((element) => {
    element.classList.add("glow-effect")
  })
}

// ===== RESPONSIVE =====
function initializeResponsive() {
  // Gestion des images responsive
  function handleResponsiveImages() {
    const images = document.querySelectorAll('img[src*="unsplash"], img[src*="placeholder"]')

    images.forEach((img) => {
      const src = img.src
      if (window.innerWidth < 768) {
        // Mobile: images plus petites
        if (src.includes("800x600")) {
          img.src = src.replace("800x600", "400x300")
        } else if (src.includes("600x400")) {
          img.src = src.replace("600x400", "400x300")
        }
      }
    })
  }

  // Gestion du scroll horizontal sur mobile
  function handleMobileScroll() {
    const scrollContainer = document.querySelector(".scroll-container")
    if (!scrollContainer) return

    if (window.innerWidth < 1024) {
      // Désactiver le scroll horizontal sur mobile
      scrollContainer.style.display = "block"
      scrollContainer.style.width = "100vw"
      scrollContainer.style.transform = "none"

      const sections = scrollContainer.querySelectorAll(".section")
      sections.forEach((section) => {
        section.style.width = "100vw"
        section.style.height = "auto"
        section.style.minHeight = "100vh"
      })
    }
  }

  // Optimisation des performances sur mobile
  function handleMobilePerformance() {
    if (window.innerWidth < 768) {
      // Réduire les animations sur mobile
      document.documentElement.style.setProperty("--animation-duration", "0.2s")

      // Désactiver les particules sur mobile
      const canvas = document.querySelector("canvas")
      if (canvas) {
        canvas.style.display = "none"
      }
    }
  }

  // Écouter les changements de taille d'écran
  window.addEventListener(
    "resize",
    debounce(() => {
      handleResponsiveImages()
      handleMobileScroll()
      handleMobilePerformance()
    }, 250),
  )

  // Initialiser
  handleResponsiveImages()
  handleMobileScroll()
  handleMobilePerformance()
}

// ===== UTILITAIRES =====
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// ===== GESTION DES ERREURS =====
window.addEventListener("error", (e) => {
  console.error("Erreur JavaScript:", e.error)
  showNotification("Une erreur s'est produite", "error")
})

window.addEventListener("unhandledrejection", (e) => {
  console.error("Promise rejetée:", e.reason)
  showNotification("Erreur de connexion", "error")
})

// ===== PERFORMANCE =====
// Lazy loading des images
function initializeLazyLoading() {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.classList.remove("lazy")
            imageObserver.unobserve(img)
          }
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img)
    })
  }
}

// Préchargement des pages importantes
function preloadPages() {
  const importantPages = ["pages/projets.html", "pages/contact.html"]

  importantPages.forEach((page) => {
    const link = document.createElement("link")
    link.rel = "prefetch"
    link.href = page
    document.head.appendChild(link)
  })
}

// Optimisation des performances
function optimizePerformance() {
  // Précharger les polices
  const fontLink = document.createElement("link")
  fontLink.rel = "preload"
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
  fontLink.as = "style"
  document.head.appendChild(fontLink)

  // Optimiser les images
  document.querySelectorAll("img").forEach((img) => {
    img.loading = "lazy"
    img.decoding = "async"
  })
}

// Initialiser les optimisations
document.addEventListener("DOMContentLoaded", () => {
  initializeLazyLoading()
  preloadPages()
  optimizePerformance()
})



// ===== SERVICE WORKER POUR LA PERFORMANCE =====
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}
