/**
 * Gravity Games - Homepage Interactive Logic
 * gravitygamez.fun
 * Pure Vanilla JavaScript ES6+
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize AdSense slots
  if (window.AdManager) {
    AdManager.init();
    AdManager.renderSlot("adHomeTopLeaderboard", "homeTopLeaderboard", "horizontal");
    AdManager.renderSlot("adHomeInFeed", "homeInFeedBanner", "horizontal");
  }

  // DOM Elements
  const heroBentoGrid = document.getElementById("heroBentoGrid");
  const trendingGrid = document.getElementById("trendingGrid");
  const actionGrid = document.getElementById("actionGrid");
  const arcadeGrid = document.getElementById("arcadeGrid");
  const puzzleGrid = document.getElementById("puzzleGrid");
  const recentShelf = document.getElementById("recentShelf");
  const recentGrid = document.getElementById("recentGrid");
  const recentCounter = document.getElementById("recentCounter");
  
  const defaultHomeContent = document.getElementById("defaultHomeContent");
  const filteredSection = document.getElementById("filteredSection");
  const filteredGrid = document.getElementById("filteredGrid");
  const filterBanner = document.getElementById("filterBanner");
  const filterTitle = document.getElementById("filterTitle");
  const filterCounter = document.getElementById("filterCounter");
  const clearFilterBtn = document.getElementById("clearFilterBtn");

  const searchInput = document.getElementById("searchInput");
  const searchClear = document.getElementById("searchClear");

  let activeCategory = "all";

  // 1. Render Hero Bento Grid
  function renderHeroBento() {
    if (!heroBentoGrid) return;
    const featuredGames = GamesRegistry.getFeatured();
    if (featuredGames.length < 3) return;

    const primary = featuredGames[0]; // Don't Trust The Floor
    const secondary1 = featuredGames[1]; // Neon Wave Legends
    const secondary2 = featuredGames[2]; // One Button Hell
    const secondary3 = featuredGames[3] || GamesRegistry.getAll()[3]; // Prism Rush

    heroBentoGrid.innerHTML = `
      <!-- Primary Feature Banner -->
      <a href="play.html?game=${primary.slug}" class="bento-card bento-primary" title="Play ${primary.title}">
        <img src="${primary.paths.banner}" alt="${primary.title}" loading="eager">
        <div class="bento-overlay">
          <div class="bento-badge-group">
            <span class="tag-badge badge-hot">FEATURED HIT</span>
            <span class="tag-badge badge-category">${primary.category}</span>
          </div>
          <h2 class="bento-title">${primary.title}</h2>
          <p class="bento-subtitle">${primary.tagline}</p>
          <div class="bento-play-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            PLAY NOW
          </div>
        </div>
      </a>

      <!-- Secondary Tile 1 -->
      <a href="play.html?game=${secondary1.slug}" class="bento-card bento-compact" title="Play ${secondary1.title}">
        <img src="${secondary1.paths.banner}" alt="${secondary1.title}" loading="eager">
        <div class="bento-overlay">
          <span class="tag-badge badge-hot" style="align-self: flex-start;">${secondary1.badge}</span>
          <h3 class="bento-title">${secondary1.title}</h3>
          <p class="bento-subtitle">${secondary1.tagline}</p>
        </div>
      </a>

      <!-- Secondary Tile 2 -->
      <a href="play.html?game=${secondary2.slug}" class="bento-card bento-compact" title="Play ${secondary2.title}">
        <img src="${secondary2.paths.banner}" alt="${secondary2.title}" loading="eager">
        <div class="bento-overlay">
          <span class="tag-badge badge-featured" style="align-self: flex-start;">${secondary2.badge}</span>
          <h3 class="bento-title">${secondary2.title}</h3>
          <p class="bento-subtitle">${secondary2.tagline}</p>
        </div>
      </a>

      <!-- Secondary Tile 3 (Spans bottom two columns on desktop) -->
      <a href="play.html?game=${secondary3.slug}" class="bento-card bento-compact bento-wide" title="Play ${secondary3.title}">
        <img src="${secondary3.paths.banner}" alt="${secondary3.title}" loading="eager">
        <div class="bento-overlay">
          <span class="tag-badge badge-hot" style="align-self: flex-start;">${secondary3.badge}</span>
          <h3 class="bento-title">${secondary3.title}</h3>
          <p class="bento-subtitle">${secondary3.tagline}</p>
        </div>
      </a>
    `;
  }

  // 2. Helper to build Wide 16:9 Banner Card HTML
  function createCoverCardHTML(game) {
    return `
      <a href="play.html?game=${game.slug}" class="game-cover-card" data-slug="${game.slug}" title="${game.title}">
        <span class="cover-card-badge">${game.badge || game.category}</span>
        <img src="${game.paths.banner}" alt="${game.title}" class="cover-art" loading="lazy">
        <div class="cover-overlay">
          <div class="cover-card-header">
            <img src="${game.paths.icon}" alt="${game.title} Icon" class="cover-card-icon" loading="lazy">
            <span class="cover-card-title">${game.title}</span>
          </div>
          <div class="cover-card-meta">
            <span class="cover-card-category">${game.category}</span>
            <span class="cover-card-rating">★ ${game.rating}</span>
          </div>
        </div>
      </a>
    `;
  }

  // 3. Helper to build Compact Square Icon Card HTML
  function createIconCardHTML(game) {
    return `
      <a href="play.html?game=${game.slug}" class="game-icon-card" data-slug="${game.slug}" title="${game.title}">
        <img src="${game.paths.icon}" alt="${game.title}" loading="lazy">
        <span class="icon-card-title">${game.title}</span>
      </a>
    `;
  }

  // 4. Render All Shelves
  function renderShelves() {
    const all = GamesRegistry.getAll();

    // Trending Shelf
    const trending = GamesRegistry.getTrending();
    if (trendingGrid) {
      trendingGrid.innerHTML = trending.map(createCoverCardHTML).join("");
    }

    // Action Shelf
    const actionGames = all.filter(g => g.category === "Action" || g.tags.includes("Action"));
    if (actionGrid) {
      actionGrid.innerHTML = actionGames.slice(0, 8).map(createCoverCardHTML).join("");
    }

    // Arcade & 3D Shelf (Compact Icons)
    const arcadeGames = all.filter(g => g.category === "Arcade" || g.category === "Skill" || g.tags.includes("3D"));
    if (arcadeGrid) {
      arcadeGrid.innerHTML = arcadeGames.map(createIconCardHTML).join("");
    }

    // Puzzle & Strategy Shelf
    const puzzleGames = all.filter(g => g.category === "Puzzle" || g.category === "Adventure" || g.tags.includes("Puzzle"));
    if (puzzleGrid) {
      puzzleGrid.innerHTML = puzzleGames.map(createCoverCardHTML).join("");
    }
  }

  // 5. Render "Continue Playing" Shelf from localStorage
  function updateRecentShelf() {
    if (!recentShelf || !recentGrid) return;
    const recentSlugs = AppState.getRecentlyPlayed();
    if (recentSlugs.length === 0) {
      recentShelf.classList.add("hidden");
      return;
    }

    const recentGames = recentSlugs
      .map(slug => GamesRegistry.getBySlug(slug))
      .filter(Boolean);

    if (recentGames.length === 0) {
      recentShelf.classList.add("hidden");
      return;
    }

    recentShelf.classList.remove("hidden");
    recentCounter.textContent = `${recentGames.length} ${recentGames.length === 1 ? 'game' : 'games'}`;
    recentGrid.innerHTML = recentGames.map(createIconCardHTML).join("");
  }

  // 6. Filtering & Searching Logic
  function applyFilter(categoryOrType, searchQuery = "") {
    activeCategory = categoryOrType;
    const cleanSearch = (searchQuery || "").trim().toLowerCase();

    // Update active state on pills and sidebar buttons
    document.querySelectorAll(".filter-pill[data-category], .sidebar-btn[data-category]").forEach(btn => {
      const btnCat = btn.getAttribute("data-category");
      if (btnCat.toLowerCase() === categoryOrType.toLowerCase()) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // If default view with no search query
    if (categoryOrType === "all" && !cleanSearch) {
      defaultHomeContent.classList.remove("hidden");
      filteredSection.classList.add("hidden");
      filterBanner.classList.add("hidden");
      return;
    }

    // Otherwise compute filtered games
    let games = GamesRegistry.getAll();

    if (categoryOrType === "trending") {
      games = GamesRegistry.getTrending();
    } else if (categoryOrType === "favorites") {
      const favSlugs = AppState.getFavorites();
      games = games.filter(g => favSlugs.includes(g.slug));
    } else if (categoryOrType !== "all") {
      games = games.filter(g => g.category.toLowerCase() === categoryOrType.toLowerCase());
    }

    if (cleanSearch) {
      games = games.filter(g => 
        g.title.toLowerCase().includes(cleanSearch) ||
        g.category.toLowerCase().includes(cleanSearch) ||
        g.tagline.toLowerCase().includes(cleanSearch) ||
        g.tags.some(t => t.toLowerCase().includes(cleanSearch))
      );
    }

    // Show filtered view
    defaultHomeContent.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    filterBanner.classList.remove("hidden");

    let titleText = `Category: ${categoryOrType.toUpperCase()}`;
    if (categoryOrType === "favorites") titleText = "Your Bookmarked Favorites";
    if (categoryOrType === "trending") titleText = "Trending & Hot Games";
    if (cleanSearch) titleText = `Search: "${searchQuery}"`;
    filterTitle.textContent = titleText;
    filterCounter.textContent = `${games.length} ${games.length === 1 ? 'Game' : 'Games'}`;

    if (games.length === 0) {
      filteredGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 48px 20px; text-align: center; color: var(--text-secondary);">
          <svg style="margin: 0 auto 16px; display: block; color: var(--accent-primary);" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h3 style="color: #FFFFFF; font-size: 1.25rem; font-family: var(--font-heading); margin-bottom: 8px;">No games match your criteria</h3>
          <p style="font-size: 0.9rem;">Try searching for another keyword like "platformer", "rage", "3D", or "chess".</p>
          <button onclick="window.resetHomeFilters()" class="filter-pill" style="margin-top: 16px; display: inline-flex;">View All Games</button>
        </div>
      `;
    } else {
      filteredGrid.innerHTML = games.map(createCoverCardHTML).join("");
    }

    // Scroll slightly up to results
    filteredSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Window global reset
  window.resetHomeFilters = () => {
    searchInput.value = "";
    searchClear.classList.remove("active");
    applyFilter("all", "");
  };

  if (clearFilterBtn) {
    clearFilterBtn.addEventListener("click", window.resetHomeFilters);
  }

  // Search input listeners
  searchInput.addEventListener("input", (e) => {
    const val = e.target.value;
    if (val.trim()) {
      searchClear.classList.add("active");
    } else {
      searchClear.classList.remove("active");
    }
    applyFilter(activeCategory, val);
  });

  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    searchClear.classList.remove("active");
    applyFilter(activeCategory, "");
  });

  // Filter Buttons & Sidebar Buttons Click Listeners
  document.addEventListener("click", (e) => {
    const filterBtn = e.target.closest("[data-category]");
    if (filterBtn) {
      const cat = filterBtn.getAttribute("data-category");
      if (cat) {
        e.preventDefault();
        applyFilter(cat, searchInput.value);
      }
    }
  });

  // Listen for storage events (e.g. if game favorited in another tab or played)
  window.addEventListener("recent-updated", updateRecentShelf);
  window.addEventListener("favorites-updated", () => {
    if (activeCategory === "favorites") {
      applyFilter("favorites", searchInput.value);
    }
  });

  // Check URL query parameters (e.g. ?q=platformer or ?cat=action)
  const urlParams = new URLSearchParams(window.location.search);
  const qParam = urlParams.get("q");
  const catParam = urlParams.get("cat");

  // Initial Renders
  renderHeroBento();
  renderShelves();
  updateRecentShelf();

  if (qParam) {
    searchInput.value = qParam;
    searchClear.classList.add("active");
    applyFilter("all", qParam);
  } else if (catParam) {
    applyFilter(catParam, "");
  }
});
