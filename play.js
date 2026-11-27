/**
 * Gravity Games - Dedicated Game Stage Logic
 * gravitygamez.fun
 * Pure Vanilla JavaScript ES6+
 */

document.addEventListener("DOMContentLoaded", () => {
  if (window.AdManager) {
    AdManager.init();
    AdManager.renderSlot("adPlayerLeftSkyscraper", "playerLeftSkyscraper", "vertical");
    AdManager.renderSlot("adPlayerRightRectangle", "playerRightRectangle", "rectangle");
    AdManager.renderSlot("adPlayerBottomBanner", "playerBottomBanner", "horizontal");
  }

  if (AppState.getTheaterMode()) {
    document.body.classList.add("theater-mode");
    const theaterLabel = document.getElementById("theaterLabel");
    if (theaterLabel) theaterLabel.textContent = "Standard";
  }

  const urlParams = new URLSearchParams(window.location.search);
  let gameSlug = urlParams.get("game");
  let currentGame = GamesRegistry.getBySlug(gameSlug);

  if (!currentGame) {
    currentGame = GamesRegistry.getAll()[0];
    gameSlug = currentGame.slug;
  }

  AppState.recordPlay(currentGame.slug);

  // Dynamic SEO Metadata, OpenGraph, Canonical & Schema.org VideoGame JSON-LD
  const origin = window.location.origin;
  const canonicalUrl = `${origin}/play?game=${encodeURIComponent(currentGame.slug)}`;
  const coverAbsUrl = `${origin}/${currentGame.paths.cover}`;
  const pageTitle = `${currentGame.title} — Play Free Online | Gravity Games`;

  document.title = pageTitle;
  const setMeta = (selector, attr, val) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, val);
  };
  setMeta('meta[name="description"]', "content", currentGame.description);
  setMeta('link[rel="canonical"]', "href", canonicalUrl);
  setMeta('meta[property="og:title"]', "content", pageTitle);
  setMeta('meta[property="og:description"]', "content", currentGame.tagline);
  setMeta('meta[property="og:url"]', "content", canonicalUrl);
  setMeta('meta[property="og:image"]', "content", coverAbsUrl);
  setMeta('meta[name="twitter:title"]', "content", pageTitle);
  setMeta('meta[name="twitter:description"]', "content", currentGame.tagline);
  setMeta('meta[name="twitter:image"]', "content", coverAbsUrl);

  const existingSchema = document.getElementById("dynamicGameSchema");
  if (!existingSchema) {
    const schemaScript = document.createElement("script");
    schemaScript.id = "dynamicGameSchema";
    schemaScript.type = "application/ld+json";
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "VideoGame",
          "name": currentGame.title,
          "description": currentGame.description,
          "genre": currentGame.category,
          "image": coverAbsUrl,
          "url": canonicalUrl,
          "applicationCategory": "Game",
          "operatingSystem": "Web Browser, iOS, Android, Windows, macOS",
          "playMode": "SinglePlayer",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": String(currentGame.rating),
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": "1250"
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Gravity Games", "item": `${origin}/` },
            { "@type": "ListItem", "position": 2, "name": currentGame.category, "item": `${origin}/?cat=${encodeURIComponent(currentGame.category)}` },
            { "@type": "ListItem", "position": 3, "name": currentGame.title, "item": canonicalUrl }
          ]
        }
      ]
    });
    document.head.appendChild(schemaScript);
  }

  // DOM Elements
  const gameStageContainer = document.getElementById("gameStageContainer");
  const gameIframe = document.getElementById("gameIframe");
  const gameSplashOverlay = document.getElementById("gameSplashOverlay");
  const splashGameTitle = document.getElementById("splashGameTitle");
  const splashProgressBar = document.getElementById("splashProgressBar");
  const btnSkipSplash = document.getElementById("btnSkipSplash");

  const gameThumbIcon = document.getElementById("gameThumbIcon");
  const gameDisplayTitle = document.getElementById("gameDisplayTitle");
  const gameDisplayTagline = document.getElementById("gameDisplayTagline");
  const gameDescriptionText = document.getElementById("gameDescriptionText");
  const gameControlsGrid = document.getElementById("gameControlsGrid");
  const gameMetaLine = document.getElementById("gameMetaLine");
  const gameGuideLink = document.getElementById("gameGuideLink");
  const gameTagsContainer = document.getElementById("gameTagsContainer");

  const btnFullscreen = document.getElementById("btnFullscreen");
  const btnExitFullscreen = document.getElementById("btnExitFullscreen");
  const fullscreenLabel = document.getElementById("fullscreenLabel");
  const btnTheater = document.getElementById("btnTheater");
  const theaterLabel = document.getElementById("theaterLabel");
  const btnRestart = document.getElementById("btnRestart");
  const btnFavorite = document.getElementById("btnFavorite");
  const favIconSvg = document.getElementById("favIconSvg");
  const favLabel = document.getElementById("favLabel");
  const btnShare = document.getElementById("btnShare");

  const playerLeftList = document.getElementById("playerLeftList");
  const playerRightList = document.getElementById("playerRightList");
  const playerRelatedGrid = document.getElementById("playerRelatedGrid");
  const mobileQuickRail = document.getElementById("mobileQuickRail");
  const searchInput = document.getElementById("searchInput");

  // Populate Game Metadata UI
  splashGameTitle.textContent = `Loading ${currentGame.title}...`;
  gameSplashOverlay.style.backgroundImage = `url("${currentGame.paths.cover}")`;
  gameDisplayTitle.textContent = currentGame.title;
  gameDisplayTagline.textContent = currentGame.tagline;
  gameThumbIcon.src = currentGame.paths.icon;
  gameThumbIcon.alt = `${currentGame.title} icon`;
  gameDescriptionText.textContent = currentGame.description;

  if (gameMetaLine) {
    gameMetaLine.innerHTML = `
      <strong>★ ${currentGame.rating}</strong>
      <span aria-hidden="true">·</span>
      <span>${currentGame.category}</span>
      <span aria-hidden="true">·</span>
      <span class="tabular-nums">${currentGame.plays} plays</span>
    `;
  }

  if (gameGuideLink && window.BLOG_ARTICLES) {
    const matchedGuide = window.BLOG_ARTICLES.find(a => a.gameSlug === currentGame.slug && !a.customUrl)
      || window.BLOG_ARTICLES.find(a => a.gameSlug === currentGame.slug);
    if (matchedGuide) {
      gameGuideLink.href = matchedGuide.customUrl || `article.html?id=${matchedGuide.id}`;
      gameGuideLink.classList.remove("hidden");
    } else {
      gameGuideLink.classList.add("hidden");
    }
  }

  // Render Controls Grid (prioritize mobile touch controls first on touch/mobile screens)
  const controls = currentGame.controls;
  const isMobileViewport = window.innerWidth <= 768 || (window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
  const controlEntries = Object.entries(controls).sort(([a], [b]) => {
    if (!isMobileViewport) return 0;
    if (a === "mobile") return -1;
    if (b === "mobile") return 1;
    return 0;
  });
  let controlsHtml = "";
  for (const [key, value] of controlEntries) {
    const formattedKey = key === "mobile" ? "MOBILE TOUCH" : key.replace(/([A-Z])/g, " $1").toUpperCase();
    controlsHtml += `
      <div class="control-item-badge">
        <span class="control-key-label">${formattedKey}</span>
        <span class="control-key-desc">${value}</span>
      </div>
    `;
  }
  gameControlsGrid.innerHTML = controlsHtml;

  // Render Clean Unboxed Tags Line
  if (gameTagsContainer) {
    gameTagsContainer.innerHTML = currentGame.tags
      .map(t => `<a href="index.html?q=${encodeURIComponent(t)}">#${t}</a>`)
      .join('<span aria-hidden="true">·</span>');
  }

  // Update Favorite Button State
  function updateFavoriteButtonState() {
    const isFav = AppState.isFavorite(currentGame.slug);
    if (isFav) {
      btnFavorite.classList.add("active-favorite");
      favLabel.textContent = "Saved";
      favIconSvg.setAttribute("fill", "#FF6B78");
      favIconSvg.setAttribute("stroke", "#FF6B78");
    } else {
      btnFavorite.classList.remove("active-favorite");
      favLabel.textContent = "Favorite";
      favIconSvg.setAttribute("fill", "none");
      favIconSvg.setAttribute("stroke", "currentColor");
    }
  }
  updateFavoriteButtonState();

  btnFavorite.addEventListener("click", () => {
    const added = AppState.toggleFavorite(currentGame.slug);
    updateFavoriteButtonState();
    showToast(
      added ? `Saved "${currentGame.title}" to Favorites` : `Removed "${currentGame.title}" from Favorites`,
      added ? "heart" : "info"
    );
  });

  btnShare.addEventListener("click", async () => {
    const shareData = {
      title: currentGame.title,
      text: currentGame.tagline,
      url: window.location.href
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showToast("Link copied to clipboard", "copy");
      }).catch(() => fallbackCopy(window.location.href));
    } else {
      fallbackCopy(window.location.href);
    }
  });

  function fallbackCopy(text) {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand("copy");
      showToast("Link copied to clipboard", "copy");
    } catch {
      showToast("Copy link from address bar");
    }
    document.body.removeChild(tempInput);
  }

  function setImmersiveFullscreen(enabled) {
    document.body.classList.toggle("immersive-fullscreen", enabled);
    if (fullscreenLabel) {
      fullscreenLabel.textContent = enabled ? "Exit Fullscreen" : "Play Fullscreen";
    }
  }

  async function enterFullscreen() {
    const isSmallOrTouch = window.innerWidth <= 900 || /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isSmallOrTouch) {
      setImmersiveFullscreen(true);
    }

    const reqFs = gameStageContainer.requestFullscreen
      || gameStageContainer.webkitRequestFullscreen
      || gameStageContainer.msRequestFullscreen;

    if (reqFs && !/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      try {
        const result = reqFs.call(gameStageContainer);
        if (result && typeof result.catch === "function") {
          await result;
        }
      } catch {
        setImmersiveFullscreen(true);
      }
    } else if (!isSmallOrTouch) {
      setImmersiveFullscreen(true);
    }
  }

  async function exitAllFullscreen() {
    setImmersiveFullscreen(false);
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if (fsEl) {
      const exitFs = document.exitFullscreen || document.webkitExitFullscreen;
      if (exitFs) {
        try {
          await exitFs.call(document);
        } catch {
          // Ignore
        }
      }
    }
  }

  btnFullscreen.addEventListener("click", () => {
    const isActive = document.body.classList.contains("immersive-fullscreen") || Boolean(document.fullscreenElement || document.webkitFullscreenElement);
    if (isActive) {
      exitAllFullscreen();
    } else {
      enterFullscreen();
    }
  });

  if (btnExitFullscreen) {
    btnExitFullscreen.addEventListener("click", exitAllFullscreen);
  }

  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && !document.body.classList.contains("immersive-fullscreen")) {
      if (fullscreenLabel) fullscreenLabel.textContent = "Play Fullscreen";
    } else if (document.fullscreenElement && fullscreenLabel) {
      fullscreenLabel.textContent = "Exit Fullscreen";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("immersive-fullscreen")) {
      exitAllFullscreen();
    }
  });

  btnTheater.addEventListener("click", () => {
    const newMode = !AppState.getTheaterMode();
    AppState.setTheaterMode(newMode);
    theaterLabel.textContent = newMode ? "Standard" : "Theater";
    showToast(newMode ? "Theater mode enabled" : "Standard mode restored");
  });

  // Fast Responsive Pre-Game Loading Splash
  let splashTimer = null;
  let minSettlePassed = false;
  let iframeLoaded = false;

  function dismissSplash() {
    clearTimeout(splashTimer);
    gameSplashOverlay.classList.add("fade-out");
  }

  function triggerPreGameSplash() {
    clearTimeout(splashTimer);
    minSettlePassed = false;
    iframeLoaded = false;

    gameSplashOverlay.classList.remove("fade-out");
    splashProgressBar.style.transition = "none";
    splashProgressBar.style.width = "0%";
    void splashProgressBar.offsetWidth;

    splashProgressBar.style.transition = "width 1.2s linear";
    splashProgressBar.style.width = "100%";

    gameIframe.src = currentGame.paths.game;

    setTimeout(() => {
      minSettlePassed = true;
      if (iframeLoaded) dismissSplash();
    }, 450);

    splashTimer = setTimeout(dismissSplash, 1400);
  }

  gameIframe.addEventListener("load", () => {
    iframeLoaded = true;
    if (minSettlePassed) dismissSplash();
  });

  if (btnSkipSplash) {
    btnSkipSplash.addEventListener("click", dismissSplash);
  }

  triggerPreGameSplash();

  btnRestart.addEventListener("click", () => {
    triggerPreGameSplash();
    showToast(`Restarting ${currentGame.title}...`);
  });

  // Populate Sidebars, Mobile Quick Switch Rail, and Related 16:9 Games
  function renderSidebars() {
    const all = GamesRegistry.getAll().filter(g => g.slug !== currentGame.slug);
    const leftGames = all.slice(0, 6);
    const rightGames = all.slice(6, 12);

    function createSidebarItem(g) {
      return `
        <a href="play.html?game=${g.slug}" class="sidebar-game-item" title="Play ${g.title}">
          <img src="${g.paths.icon}" alt="${g.title}" class="sidebar-game-thumb" loading="lazy" referrerpolicy="no-referrer">
          <div class="sidebar-game-info">
            <span class="sidebar-game-name">${g.title}</span>
            <span class="sidebar-game-cat">${g.category} · ★ ${g.rating}</span>
          </div>
        </a>
      `;
    }

    if (playerLeftList) playerLeftList.innerHTML = leftGames.map(createSidebarItem).join("");
    if (playerRightList) playerRightList.innerHTML = rightGames.map(createSidebarItem).join("");

    const related = GamesRegistry.getRelated(currentGame.slug, 6);

    if (mobileQuickRail) {
      mobileQuickRail.innerHTML = related.map(g => `
        <a href="play.html?game=${g.slug}" class="mobile-quick-item" title="Play ${g.title}">
          <img src="${g.paths.icon}" alt="${g.title}" loading="lazy" referrerpolicy="no-referrer">
          <span>${g.title}</span>
        </a>
      `).join("");
    }

    if (playerRelatedGrid) {
      playerRelatedGrid.innerHTML = related.map(g => `
        <a href="play.html?game=${g.slug}" class="game-cover-card" title="Play ${g.title}">
          <img src="${g.paths.cover}" alt="${g.title} cover artwork" class="cover-art" loading="lazy" referrerpolicy="no-referrer">
          <div class="cover-overlay">
            <div class="cover-card-header">
              <img src="${g.paths.icon}" alt="${g.title} icon" class="cover-card-icon" loading="lazy" referrerpolicy="no-referrer">
              <span class="cover-card-title">${g.title}</span>
            </div>
            <div class="cover-card-meta">
              <span class="cover-card-category">${g.category} · ${g.plays}</span>
              <span class="cover-card-rating tabular-nums">★ ${g.rating}</span>
            </div>
          </div>
        </a>
      `).join("");
    }
  }
  renderSidebars();

  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && searchInput.value.trim()) {
        window.location.href = `index.html?q=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
  }
});
