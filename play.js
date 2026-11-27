/**
 * Gravity Games - Dedicated Game Stage Logic
 * gravitygamez.fun
 * Pure Vanilla JavaScript ES6+
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize AdSense slots for player page
  if (window.AdManager) {
    AdManager.init();
    AdManager.renderSlot("adPlayerLeftSkyscraper", "playerLeftSkyscraper", "vertical");
    AdManager.renderSlot("adPlayerRightRectangle", "playerRightRectangle", "rectangle");
    AdManager.renderSlot("adPlayerBottomBanner", "playerBottomBanner", "horizontal");
  }

  // Restore Theater Mode preference from localStorage
  if (AppState.getTheaterMode()) {
    document.body.classList.add("theater-mode");
    const theaterLabel = document.getElementById("theaterLabel");
    if (theaterLabel) theaterLabel.textContent = "Standard";
  }

  // Parse URL query parameter: ?game=<slug>
  const urlParams = new URLSearchParams(window.location.search);
  let gameSlug = urlParams.get("game");
  let currentGame = GamesRegistry.getBySlug(gameSlug);

  // Fallback to primary game if slug is missing or not found
  if (!currentGame) {
    currentGame = GamesRegistry.getAll()[0]; // "dont-trust-the-floor"
    gameSlug = currentGame.slug;
  }

  // Record this play in localStorage for "Continue Playing" shelf
  AppState.recordPlay(currentGame.slug);

  // Update Page Title and Meta Tags
  document.title = `${currentGame.title} — Play Free Online on Gravity Games`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", currentGame.description);

  // DOM Elements
  const gameStageContainer = document.getElementById("gameStageContainer");
  const gameIframe = document.getElementById("gameIframe");
  const gameSplashOverlay = document.getElementById("gameSplashOverlay");
  const splashGameTitle = document.getElementById("splashGameTitle");
  const splashProgressBar = document.getElementById("splashProgressBar");
  
  const gameThumbIcon = document.getElementById("gameThumbIcon");
  const gameDisplayTitle = document.getElementById("gameDisplayTitle");
  const gameDisplayTagline = document.getElementById("gameDisplayTagline");
  const gameDescriptionText = document.getElementById("gameDescriptionText");
  const gameControlsGrid = document.getElementById("gameControlsGrid");
  const gameTagsContainer = document.getElementById("gameTagsContainer");

  const btnFullscreen = document.getElementById("btnFullscreen");
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
  const searchInput = document.getElementById("searchInput");

  // Populate Game Metadata UI
  splashGameTitle.textContent = `Loading ${currentGame.title}...`;
  gameDisplayTitle.textContent = currentGame.title;
  gameDisplayTagline.textContent = currentGame.tagline;
  gameThumbIcon.src = currentGame.paths.icon;
  gameThumbIcon.alt = currentGame.title;
  gameDescriptionText.textContent = currentGame.description;

  // Render Controls Grid
  const controls = currentGame.controls;
  let controlsHtml = "";
  for (const [key, value] of Object.entries(controls)) {
    const formattedKey = key.replace(/([A-Z])/g, ' $1').toUpperCase();
    controlsHtml += `
      <div class="control-item-badge">
        <span class="control-key-label">${formattedKey}</span>
        <span class="control-key-desc">${value}</span>
      </div>
    `;
  }
  gameControlsGrid.innerHTML = controlsHtml;

  // Render Meta Tags Pills
  gameTagsContainer.innerHTML = [
    `<span class="meta-pill" style="color:var(--accent-action);font-weight:700;">★ ${currentGame.rating} Rating</span>`,
    `<span class="meta-pill">Category: ${currentGame.category}</span>`,
    `<span class="meta-pill">${currentGame.plays} Plays</span>`,
    ...currentGame.tags.map(t => `<a href="index.html?q=${encodeURIComponent(t)}" class="meta-pill">#${t}</a>`)
  ].join("");

  // Update Favorite Button State
  function updateFavoriteButtonState() {
    const isFav = AppState.isFavorite(currentGame.slug);
    if (isFav) {
      btnFavorite.classList.add("active-favorite");
      favLabel.textContent = "Saved";
      favIconSvg.setAttribute("fill", "#FF4757");
      favIconSvg.setAttribute("stroke", "#FF4757");
    } else {
      btnFavorite.classList.remove("active-favorite");
      favLabel.textContent = "Favorite";
      favIconSvg.setAttribute("fill", "none");
      favIconSvg.setAttribute("stroke", "currentColor");
    }
  }
  updateFavoriteButtonState();

  // Favorite button click
  btnFavorite.addEventListener("click", () => {
    const added = AppState.toggleFavorite(currentGame.slug);
    updateFavoriteButtonState();
    if (added) {
      showToast(`Added "${currentGame.title}" to Favorites!`, "heart");
    } else {
      showToast(`Removed "${currentGame.title}" from Favorites.`);
    }
  });

  // Share button click
  btnShare.addEventListener("click", () => {
    const shareUrl = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast("Link copied to clipboard!", "copy");
      }).catch(() => {
        fallbackCopy(shareUrl);
      });
    } else {
      fallbackCopy(shareUrl);
    }
  });

  function fallbackCopy(text) {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand("copy");
      showToast("Link copied to clipboard!", "copy");
    } catch (e) {
      showToast("Share URL: " + text);
    }
    document.body.removeChild(tempInput);
  }

  // Fullscreen Button
  btnFullscreen.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      if (gameStageContainer.requestFullscreen) {
        gameStageContainer.requestFullscreen();
      } else if (gameStageContainer.webkitRequestFullscreen) {
        gameStageContainer.webkitRequestFullscreen();
      } else if (gameStageContainer.msRequestFullscreen) {
        gameStageContainer.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  });

  // Theater Mode Toggle
  btnTheater.addEventListener("click", () => {
    const currentMode = AppState.getTheaterMode();
    const newMode = !currentMode;
    AppState.setTheaterMode(newMode);
    theaterLabel.textContent = newMode ? "Standard" : "Theater";
    showToast(newMode ? "Theater Mode activated" : "Standard Mode restored");
  });

  // Mandatory 2-Second Pre-Game Loading Splash Sequence
  let splashTimer = null;
  function triggerPreGameSplash() {
    clearTimeout(splashTimer);
    
    // Reset overlay visibility & progress bar
    gameSplashOverlay.classList.remove("fade-out");
    splashProgressBar.style.transition = "none";
    splashProgressBar.style.width = "0%";
    
    // Force layout reflow
    void splashProgressBar.offsetWidth;

    // Start 2.0s progress animation
    splashProgressBar.style.transition = "width 2.0s linear";
    splashProgressBar.style.width = "100%";

    // Set game iframe source
    gameIframe.src = currentGame.paths.game;

    // Smoothly fade out at exactly 2000ms
    splashTimer = setTimeout(() => {
      gameSplashOverlay.classList.add("fade-out");
    }, 2000);
  }

  // Trigger splash initially
  triggerPreGameSplash();

  // Restart Button
  btnRestart.addEventListener("click", () => {
    triggerPreGameSplash();
    showToast(`Restarting ${currentGame.title}...`);
  });

  // Populate Sidebars and Related Games
  function renderSidebars() {
    const all = GamesRegistry.getAll().filter(g => g.slug !== currentGame.slug);
    const leftGames = all.slice(0, 6);
    const rightGames = all.slice(6, 12);

    function createSidebarItem(g) {
      return `
        <a href="play.html?game=${g.slug}" class="sidebar-game-item" title="${g.title}">
          <img src="${g.paths.icon}" alt="${g.title}" class="sidebar-game-thumb" loading="lazy">
          <div class="sidebar-game-info">
            <span class="sidebar-game-name">${g.title}</span>
            <span class="sidebar-game-cat">${g.category} • ★ ${g.rating}</span>
          </div>
        </a>
      `;
    }

    if (playerLeftList) playerLeftList.innerHTML = leftGames.map(createSidebarItem).join("");
    if (playerRightList) playerRightList.innerHTML = rightGames.map(createSidebarItem).join("");

    // Related Games Shelf below stage
    const related = GamesRegistry.getRelated(currentGame.slug, 6);
    if (playerRelatedGrid) {
      playerRelatedGrid.innerHTML = related.map(g => `
        <a href="play.html?game=${g.slug}" class="game-cover-card" title="${g.title}">
          <span class="cover-card-badge">${g.badge || g.category}</span>
          <img src="${g.paths.banner}" alt="${g.title}" class="cover-art" loading="lazy">
          <div class="cover-overlay">
            <div class="cover-card-header">
              <img src="${g.paths.icon}" alt="${g.title} Icon" class="cover-card-icon" loading="lazy">
              <span class="cover-card-title">${g.title}</span>
            </div>
            <div class="cover-card-meta">
              <span class="cover-card-category">${g.category}</span>
              <span class="cover-card-rating">★ ${g.rating}</span>
            </div>
          </div>
        </a>
      `).join("");
    }
  }
  renderSidebars();

  // Search redirection to homepage
  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && searchInput.value.trim()) {
        window.location.href = `index.html?q=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
  }
});
