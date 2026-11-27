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
  const trendingCounter = document.getElementById("trendingCounter");
  const actionGrid = document.getElementById("actionGrid");
  const arcadeGrid = document.getElementById("arcadeGrid");
  const puzzleGrid = document.getElementById("puzzleGrid");
  const homeGuidesGrid = document.getElementById("homeGuidesGrid");
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

  // 1. Render Hero Bento Grid using 16:9 widescreen cover.jpg artwork
  function renderHeroBento() {
    if (!heroBentoGrid) return;
    const featuredGames = GamesRegistry.getFeatured();
    if (featuredGames.length < 3) return;

    const primary = featuredGames[0]; // Don't Trust The Floor
    const secondary1 = featuredGames[1]; // Neon Wave Legends
    const secondary2 = featuredGames[2]; // One Button Hell
    const secondary3 = featuredGames[3] || GamesRegistry.getAll()[3]; // Prism Rush

    heroBentoGrid.innerHTML = `
      <a href="play.html?game=${primary.slug}" class="bento-card bento-primary" title="Play ${primary.title}">
        <img src="${primary.paths.cover}" alt="${primary.title} gameplay artwork" loading="eager" referrerpolicy="no-referrer">
        <div class="bento-overlay">
          <div class="card-kicker">
            <span>Featured Hit</span>
            <span aria-hidden="true">·</span>
            <span>${primary.category}</span>
            <span aria-hidden="true">·</span>
            <span class="tabular-nums">★ ${primary.rating}</span>
          </div>
          <h2 class="bento-title">${primary.title}</h2>
          <p class="bento-subtitle">${primary.tagline}</p>
          <span class="bento-play-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Play Now
          </span>
        </div>
      </a>

      <div class="hero-bento-track">
        <a href="play.html?game=${secondary1.slug}" class="bento-card bento-compact" title="Play ${secondary1.title}">
          <img src="${secondary1.paths.cover}" alt="${secondary1.title} artwork" loading="eager" referrerpolicy="no-referrer">
          <div class="bento-overlay">
            <span class="card-kicker">${secondary1.category} · ★ ${secondary1.rating}</span>
            <h3 class="bento-title">${secondary1.title}</h3>
            <p class="bento-subtitle">${secondary1.tagline}</p>
          </div>
        </a>

        <a href="play.html?game=${secondary2.slug}" class="bento-card bento-compact" title="Play ${secondary2.title}">
          <img src="${secondary2.paths.cover}" alt="${secondary2.title} artwork" loading="eager" referrerpolicy="no-referrer">
          <div class="bento-overlay">
            <span class="card-kicker">${secondary2.category} · ★ ${secondary2.rating}</span>
            <h3 class="bento-title">${secondary2.title}</h3>
            <p class="bento-subtitle">${secondary2.tagline}</p>
          </div>
        </a>

        <a href="play.html?game=${secondary3.slug}" class="bento-card bento-compact bento-wide" title="Play ${secondary3.title}">
          <img src="${secondary3.paths.cover}" alt="${secondary3.title} artwork" loading="eager" referrerpolicy="no-referrer">
          <div class="bento-overlay">
            <span class="card-kicker">${secondary3.category} · ★ ${secondary3.rating} · ${secondary3.plays} plays</span>
            <h3 class="bento-title">${secondary3.title}</h3>
            <p class="bento-subtitle">${secondary3.tagline}</p>
          </div>
        </a>
      </div>
    `;
  }

  // 2. 3:4 Portrait Poster Card HTML (Uses native 896x1200 banner.jpg)
  function createPosterCardHTML(game) {
    return `
      <a href="play.html?game=${game.slug}" class="game-poster-card" data-slug="${game.slug}" title="Play ${game.title}">
        <img src="${game.paths.banner}" alt="${game.title} poster" class="poster-art" loading="lazy" referrerpolicy="no-referrer">
        <div class="poster-overlay">
          <span class="poster-title">${game.title}</span>
          <div class="poster-meta tabular-nums">
            <span>${game.category}</span>
            <span aria-hidden="true">·</span>
            <span style="color:#FFD233;">★ ${game.rating}</span>
          </div>
        </div>
      </a>
    `;
  }

  // 3. Wide 16:9 Cover Card HTML (Uses native 1376x768 cover.jpg)
  function createCoverCardHTML(game) {
    return `
      <a href="play.html?game=${game.slug}" class="game-cover-card" data-slug="${game.slug}" title="Play ${game.title}">
        <img src="${game.paths.cover}" alt="${game.title} cover artwork" class="cover-art" loading="lazy" referrerpolicy="no-referrer">
        <div class="cover-overlay">
          <div class="cover-card-header">
            <img src="${game.paths.icon}" alt="${game.title} icon" class="cover-card-icon" loading="lazy" referrerpolicy="no-referrer">
            <span class="cover-card-title">${game.title}</span>
          </div>
          <div class="cover-card-meta">
            <span class="cover-card-category">${game.category} · ${game.plays}</span>
            <span class="cover-card-rating tabular-nums">★ ${game.rating}</span>
          </div>
        </div>
      </a>
    `;
  }

  // 4. Compact Square Icon Card HTML (Uses native 1024x1024 icon.jpg)
  function createIconCardHTML(game) {
    return `
      <a href="play.html?game=${game.slug}" class="game-icon-card" data-slug="${game.slug}" title="Play ${game.title}">
        <img src="${game.paths.icon}" alt="${game.title} icon" loading="lazy" referrerpolicy="no-referrer">
        <span class="icon-card-title">${game.title}</span>
      </a>
    `;
  }

  // 5. Render All Shelves
  function renderShelves() {
    const all = GamesRegistry.getAll();

    // Trending 3:4 Posters Shelf
    const trending = GamesRegistry.getTrending();
    if (trendingGrid) {
      trendingGrid.innerHTML = trending.map(createPosterCardHTML).join("");
    }
    if (trendingCounter) {
      trendingCounter.textContent = `${trending.length} games`;
    }

    // Action Shelf (16:9 covers)
    const actionGames = all.filter(g => g.category === "Action" || g.tags.includes("Action"));
    if (actionGrid) {
      actionGrid.innerHTML = actionGames.slice(0, 8).map(createCoverCardHTML).join("");
    }

    // Arcade & 3D Shelf (1:1 compact icons)
    const arcadeGames = all.filter(g => g.category === "Arcade" || g.category === "Skill" || g.tags.includes("3D"));
    if (arcadeGrid) {
      arcadeGrid.innerHTML = arcadeGames.map(createIconCardHTML).join("");
    }

    // Puzzle & Strategy Shelf (16:9 covers)
    const puzzleGames = all.filter(g => g.category === "Puzzle" || g.category === "Adventure" || g.tags.includes("Puzzle"));
    if (puzzleGrid) {
      puzzleGrid.innerHTML = puzzleGames.map(createCoverCardHTML).join("");
    }

    // Featured Editorial Guides Preview
    if (homeGuidesGrid && window.BLOG_ARTICLES) {
      const priorityIds = [
        "online-games-for-free",
        "free-browser-games-like-minecraft",
        "dont-trust-the-floor-guide"
      ];
      const guides = priorityIds
        .map(id => window.BLOG_ARTICLES.find(a => a.id === id))
        .filter(Boolean);

      homeGuidesGrid.innerHTML = guides.map(article => {
        const url = article.customUrl || `article.html?id=${article.id}`;
        return `
          <article class="blog-card">
            <a href="${url}" title="${article.title}">
              <img src="${article.banner}" alt="${article.title}" class="blog-card-thumb" loading="lazy" referrerpolicy="no-referrer">
            </a>
            <div class="blog-card-content">
              <div class="blog-card-meta">
                <span class="blog-card-cat">${article.category}</span>
                <span aria-hidden="true">·</span>
                <span>${article.readTime || "5 min read"}</span>
              </div>
              <h3 class="blog-card-title">
                <a href="${url}">${article.title}</a>
              </h3>
              <p class="blog-card-excerpt">${article.excerpt}</p>
              <div class="blog-card-actions">
                <a href="${url}" class="blog-read-link">Read Guide &rarr;</a>
                ${article.gameSlug ? `<a href="play.html?game=${article.gameSlug}" class="blog-play-link">Play Game</a>` : ""}
              </div>
            </div>
          </article>
        `;
      }).join("");
    }
  }

  // 6. Render "Continue Playing" Shelf from localStorage
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
    recentCounter.textContent = `${recentGames.length} ${recentGames.length === 1 ? "game" : "games"}`;
    recentGrid.innerHTML = recentGames.map(createIconCardHTML).join("");
  }

  // 7. Filtering & Searching Logic
  function applyFilter(categoryOrType, searchQuery = "") {
    activeCategory = categoryOrType;
    const cleanSearch = (searchQuery || "").trim().toLowerCase();

    document.querySelectorAll("[data-category]").forEach(btn => {
      if (btn.classList.contains("footer-nav-link")) return;
      const btnCat = btn.getAttribute("data-category");
      if (btnCat && btnCat.toLowerCase() === categoryOrType.toLowerCase()) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    if (categoryOrType === "all" && !cleanSearch) {
      defaultHomeContent.classList.remove("hidden");
      filteredSection.classList.add("hidden");
      filterBanner.classList.add("hidden");
      return;
    }

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

    defaultHomeContent.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    filterBanner.classList.remove("hidden");

    let titleText = `${categoryOrType} Games`;
    if (categoryOrType === "favorites") titleText = "Saved Favorites";
    if (categoryOrType === "trending") titleText = "Trending & Hot Games";
    if (cleanSearch) titleText = `Results for "${searchQuery}"`;
    filterTitle.textContent = titleText;
    filterCounter.textContent = `${games.length} ${games.length === 1 ? "game" : "games"}`;

    if (games.length === 0) {
      const emptyHint = categoryOrType === "favorites"
        ? "Tap the Favorite button on any game page to save it here for instant access."
        : 'Try searching for another keyword like "platformer", "3D", "chess", or "puzzle".';
      filteredGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 48px 20px; text-align: center; color: var(--text-secondary);">
          <h3 style="color: #FFFFFF; font-size: 1.2rem; font-family: var(--font-heading); margin-bottom: 8px;">No games found</h3>
          <p style="font-size: 0.92rem; max-width: 440px; margin: 0 auto;">${emptyHint}</p>
          <button onclick="window.resetHomeFilters()" class="filter-pill pill-action" style="margin-top: 18px; min-height: 44px; padding: 10px 20px; display: inline-flex;">View All Games</button>
        </div>
      `;
    } else {
      filteredGrid.innerHTML = games.map(createCoverCardHTML).join("");
    }
  }

  window.resetHomeFilters = () => {
    if (searchInput) searchInput.value = "";
    if (searchClear) searchClear.classList.remove("active");
    applyFilter("all", "");
  };

  if (clearFilterBtn) {
    clearFilterBtn.addEventListener("click", window.resetHomeFilters);
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const val = e.target.value;
      if (searchClear) {
        searchClear.classList.toggle("active", Boolean(val.trim()));
      }
      applyFilter(activeCategory, val);
    });
  }

  if (searchClear) {
    searchClear.addEventListener("click", () => {
      searchInput.value = "";
      searchClear.classList.remove("active");
      applyFilter(activeCategory, "");
    });
  }

  document.addEventListener("click", (e) => {
    const filterBtn = e.target.closest("[data-category]");
    if (filterBtn) {
      const cat = filterBtn.getAttribute("data-category");
      if (cat) {
        e.preventDefault();
        applyFilter(cat, searchInput ? searchInput.value : "");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  });

  window.addEventListener("recent-updated", updateRecentShelf);
  window.addEventListener("favorites-updated", () => {
    if (activeCategory === "favorites") {
      applyFilter("favorites", searchInput ? searchInput.value : "");
    }
  });

  const urlParams = new URLSearchParams(window.location.search);
  const qParam = urlParams.get("q");
  const catParam = urlParams.get("cat");

  renderHeroBento();
  renderShelves();
  updateRecentShelf();

  if (qParam && searchInput) {
    searchInput.value = qParam;
    if (searchClear) searchClear.classList.add("active");
    applyFilter("all", qParam);
  } else if (catParam) {
    applyFilter(catParam, "");
  }
});
