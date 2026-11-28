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

  const dailyChallengeSpotlight = document.getElementById("dailyChallengeSpotlight");
  const statLevelValue = document.getElementById("statLevelValue");
  const statStreakValue = document.getElementById("statStreakValue");
  const statBadgesValue = document.getElementById("statBadgesValue");
  const statDailyValue = document.getElementById("statDailyValue");
  const btnToggleSound = document.getElementById("btnToggleSound");
  const homeSoundLabel = document.getElementById("homeSoundLabel");
  const homeSoundIcon = document.getElementById("homeSoundIcon");
  const popularTagsStrip = document.getElementById("popularTagsStrip");

  const statsModalBackdrop = document.getElementById("statsModalBackdrop");
  const btnOpenStats = document.getElementById("btnOpenStats");
  const btnCloseStats = document.getElementById("btnCloseStats");
  const statsXpBanner = document.getElementById("statsXpBanner");
  const statsModalKpis = document.getElementById("statsModalKpis");
  const statsBadgesHeading = document.getElementById("statsBadgesHeading");
  const statsBadgesGrid = document.getElementById("statsBadgesGrid");
  const statsWeekStrip = document.getElementById("statsWeekStrip");
  const statsGenreList = document.getElementById("statsGenreList");
  const statsRatedList = document.getElementById("statsRatedList");

  const sortControlBar = document.getElementById("sortControlBar");

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
  let activeSort = "featured";

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

  function updateSoundButtonUI() {
    if (!btnToggleSound || !window.AppState) return;
    const enabled = AppState.isSoundEnabled();
    btnToggleSound.classList.toggle("is-muted", !enabled);
    btnToggleSound.setAttribute("aria-pressed", String(enabled));
    if (homeSoundLabel) {
      homeSoundLabel.textContent = enabled ? "SFX On" : "Muted";
    }
    if (homeSoundIcon) {
      homeSoundIcon.innerHTML = enabled
        ? `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>`
        : `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>`;
    }
  }

  function getBadgeIconSvg(iconName) {
    switch (iconName) {
      case "rocket":
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path></svg>`;
      case "flame":
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`;
      case "crown":
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path></svg>`;
      case "star":
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
      case "heart":
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
      case "bolt":
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`;
      case "trophy":
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>`;
      default:
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>`;
    }
  }

  // 2. Render Player Progress Strip & Daily Challenge Spotlight
  function renderEngagementUI() {
    if (!window.AppState) return;
    const stats = AppState.getEngagementStats();
    const daily = AppState.getDailyChallenge();

    if (statLevelValue && stats.levelInfo) {
      statLevelValue.textContent = `Lv. ${stats.levelInfo.level} · ${stats.levelInfo.xp} XP`;
      statLevelValue.classList.toggle("is-complete", stats.levelInfo.level >= 2);
    }

    if (statStreakValue) {
      statStreakValue.textContent = `${stats.currentStreak} ${stats.currentStreak === 1 ? "day" : "days"}`;
      statStreakValue.classList.toggle("is-complete", stats.currentStreak > 0);
    }

    if (statBadgesValue) {
      statBadgesValue.textContent = `${stats.unlockedCount}/${stats.totalAchievements}`;
      statBadgesValue.classList.toggle("is-complete", stats.unlockedCount > 0);
    }

    if (statDailyValue) {
      statDailyValue.textContent = stats.dailyCompleted ? "Completed Today" : "Pending";
      statDailyValue.classList.toggle("is-complete", stats.dailyCompleted);
    }

    updateSoundButtonUI();

    if (dailyChallengeSpotlight && daily && daily.game) {
      const g = daily.game;
      const statusText = daily.completed ? "Completed Today" : "Pending";
      const ctaText = daily.completed ? "Play Challenge Again" : "Accept Challenge";
      const streakLabel = `${stats.currentStreak}d Streak`;

      dailyChallengeSpotlight.innerHTML = `
        <a href="play.html?game=${g.slug}&challenge=daily" class="daily-challenge-media" title="Accept Daily Challenge: ${g.title}">
          <img src="${g.paths.cover}" alt="${g.title} daily challenge preview" loading="eager" referrerpolicy="no-referrer">
        </a>
        <div class="daily-challenge-body">
          <div class="daily-challenge-kicker">
            <strong>Daily Challenge</strong>
            <span aria-hidden="true">·</span>
            <span>${daily.dateKey}</span>
            <span aria-hidden="true">·</span>
            <span class="tabular-nums">${g.category}</span>
            <span aria-hidden="true">·</span>
            <span class="tabular-nums">${streakLabel}</span>
          </div>
          <h2 class="daily-challenge-title">${g.title}</h2>
          <p class="daily-challenge-mission">${daily.mission}</p>
          <div class="daily-challenge-footer">
            <span class="daily-status-text ${daily.completed ? "completed" : ""}">
              ${daily.completed ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>` : ""}
              <span>Status: ${statusText}</span>
            </span>
            <a href="play.html?game=${g.slug}&challenge=daily" class="btn-daily-cta ${daily.completed ? "is-completed" : ""}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              <span>${ctaText}</span>
            </a>
          </div>
        </div>
      `;
    }
  }

  // 3. Render My Stats & Badges Modal / Bottom Sheet Content
  function renderStatsModal() {
    if (!window.AppState || !statsModalKpis || !statsWeekStrip || !statsGenreList || !statsRatedList) return;
    const stats = AppState.getEngagementStats();
    const badges = AppState.getAchievements();
    const last7 = AppState.getLast7Days();
    const playedSet = new Set(stats.playedSlugs);
    const lvl = stats.levelInfo;

    if (statsXpBanner && lvl) {
      statsXpBanner.innerHTML = `
        <div class="stats-xp-top">
          <span class="stats-xp-rank">Level ${lvl.level} · ${lvl.rankTitle}</span>
          <span class="stats-xp-total tabular-nums">${lvl.xp} XP</span>
        </div>
        <div class="stats-xp-track" role="progressbar" aria-valuenow="${lvl.progressPct}" aria-valuemin="0" aria-valuemax="100">
          <div class="stats-xp-fill" style="width:${lvl.progressPct}%"></div>
        </div>
        <span class="stats-xp-sub tabular-nums">${lvl.xpToNext} XP to Level ${lvl.level + 1} · Earned automatically as you play, rate &amp; unlock badges</span>
      `;
    }

    statsModalKpis.innerHTML = `
      <div class="stats-kpi-item">
        <span class="stats-kpi-label">Current Streak</span>
        <span class="stats-kpi-value">${stats.currentStreak} ${stats.currentStreak === 1 ? "day" : "days"}</span>
      </div>
      <div class="stats-kpi-item">
        <span class="stats-kpi-label">Longest Streak</span>
        <span class="stats-kpi-value">${stats.longestStreak} ${stats.longestStreak === 1 ? "day" : "days"}</span>
      </div>
      <div class="stats-kpi-item">
        <span class="stats-kpi-label">Games Explored</span>
        <span class="stats-kpi-value">${stats.exploredCount}/${stats.totalGames}</span>
      </div>
      <div class="stats-kpi-item">
        <span class="stats-kpi-label">Daily Challenges Won</span>
        <span class="stats-kpi-value">${stats.dailyChallengesWon}</span>
      </div>
    `;

    if (statsBadgesHeading) {
      const unlockedNum = badges.filter(b => b.unlocked).length;
      statsBadgesHeading.textContent = `Achievements & Badges (${unlockedNum}/${badges.length})`;
    }
    if (statsBadgesGrid) {
      statsBadgesGrid.innerHTML = badges.map(badge => `
        <div class="badge-card ${badge.unlocked ? "is-unlocked" : ""}">
          <div class="badge-icon-box">${getBadgeIconSvg(badge.icon)}</div>
          <div class="badge-meta">
            <span class="badge-title">${badge.title}</span>
            <span class="badge-desc">${badge.description}</span>
            <span class="badge-status-label tabular-nums">${badge.unlocked ? `Unlocked · +${badge.xp} XP` : `Locked · +${badge.xp} XP`}</span>
          </div>
        </div>
      `).join("");
    }

    statsWeekStrip.innerHTML = last7.map(day => `
      <div class="stats-day-cell ${day.played ? "played" : ""}" aria-label="${day.dayShort} ${day.dayNumber}: ${day.played ? "Played" : "Not played"}">
        <span>${day.dayShort}</span>
        <span class="stats-day-num">${day.dayNumber}</span>
        <span class="stats-day-state">${day.played ? "Played" : (day.isToday ? "Today" : "—")}</span>
      </div>
    `).join("");

    const genres = GamesRegistry.getGenres();
    statsGenreList.innerHTML = genres.map(genre => {
      const gamesInGenre = GamesRegistry.getByCategory(genre.name);
      const playedInGenre = gamesInGenre.filter(g => playedSet.has(g.slug)).length;
      const pct = gamesInGenre.length ? Math.round((playedInGenre / gamesInGenre.length) * 100) : 0;
      return `
        <div class="stats-genre-row">
          <div class="stats-genre-meta">
            <a href="/games/${genre.slug}" style="color:#FFFFFF; font-weight:600;">${genre.name}</a>
            <span>${playedInGenre}/${gamesInGenre.length} played</span>
          </div>
          <div class="stats-genre-track">
            <div class="stats-genre-fill" style="width:${pct}%"></div>
          </div>
        </div>
      `;
    }).join("");

    const ratingEntries = Object.entries(stats.personalRatings || {})
      .map(([slug, score]) => ({ game: GamesRegistry.getBySlug(slug), score: Number(score) }))
      .filter(entry => entry.game && entry.score > 0)
      .sort((a, b) => b.score - a.score);

    if (ratingEntries.length === 0) {
      statsRatedList.innerHTML = `
        <p style="font-size: 0.84rem; color: var(--text-secondary);">
          No personal ratings saved yet. Open any game and rate it 1 to 5 stars to track your favorites here.
        </p>
      `;
    } else {
      statsRatedList.innerHTML = ratingEntries.map(({ game, score }) => `
        <a href="play.html?game=${game.slug}" class="stats-rated-item">
          <span style="font-weight: 600; color: #FFFFFF;">${game.title}</span>
          <span class="stats-rated-score">${"★".repeat(score)}${"☆".repeat(5 - score)} (${score}/5)</span>
        </a>
      `).join("");
    }
  }

  function openStatsModal() {
    if (!statsModalBackdrop) return;
    if (window.ArcadeAudio) ArcadeAudio.playClick();
    renderStatsModal();
    statsModalBackdrop.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    if (btnCloseStats) btnCloseStats.focus();
  }

  function closeStatsModal() {
    if (!statsModalBackdrop) return;
    if (window.ArcadeAudio) ArcadeAudio.playClick();
    statsModalBackdrop.classList.add("hidden");
    document.body.style.overflow = "";
    if (btnOpenStats) btnOpenStats.focus();
  }

  if (btnToggleSound && window.AppState) {
    btnToggleSound.addEventListener("click", () => {
      const enabled = AppState.toggleSound();
      showToast(enabled ? "Arcade sound effects enabled" : "Sound effects muted");
    });
  }
  if (btnOpenStats) {
    btnOpenStats.addEventListener("click", openStatsModal);
  }
  if (btnCloseStats) {
    btnCloseStats.addEventListener("click", closeStatsModal);
  }
  if (statsModalBackdrop) {
    statsModalBackdrop.addEventListener("click", (e) => {
      if (e.target === statsModalBackdrop) closeStatsModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && statsModalBackdrop && !statsModalBackdrop.classList.contains("hidden")) {
      closeStatsModal();
    }
  });

  // 4. Card HTML Factories
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

  function createCoverCardHTML(game) {
    const personalRatings = window.AppState ? AppState.getAllRatings() : {};
    const personal = personalRatings[game.slug];
    const ratingDisplay = personal ? `★ ${personal}/5 (You)` : `★ ${game.rating}`;
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
            <span class="cover-card-rating tabular-nums">${ratingDisplay}</span>
          </div>
        </div>
      </a>
    `;
  }

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

    const trending = GamesRegistry.getTrending();
    if (trendingGrid) {
      trendingGrid.innerHTML = trending.map(createPosterCardHTML).join("");
    }
    if (trendingCounter) {
      trendingCounter.textContent = `${trending.length} games`;
    }

    const actionGames = all.filter(g => g.category === "Action" || g.tags.includes("Action"));
    if (actionGrid) {
      actionGrid.innerHTML = actionGames.slice(0, 8).map(createCoverCardHTML).join("");
    }

    const arcadeGames = all.filter(g => g.category === "Arcade" || g.category === "Skill" || g.tags.includes("3D"));
    if (arcadeGrid) {
      arcadeGrid.innerHTML = arcadeGames.map(createIconCardHTML).join("");
    }

    const puzzleGames = all.filter(g => g.category === "Puzzle" || g.category === "Adventure" || g.tags.includes("Puzzle"));
    if (puzzleGrid) {
      puzzleGrid.innerHTML = puzzleGames.map(createCoverCardHTML).join("");
    }

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

    if (popularTagsStrip && GamesRegistry.getTags) {
      const tags = GamesRegistry.getTags();
      popularTagsStrip.innerHTML = tags.map(tag => {
        const count = GamesRegistry.getByTag(tag.slug).length;
        return `
          <a href="/tags/${tag.slug}" class="tag-hub-link">
            <span>#${tag.name}</span>
            <span class="tag-hub-count tabular-nums">${count}</span>
          </a>
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

  // 7. Filtering, Searching & Sorting Logic
  const SORT_LABELS = {
    featured: "Featured",
    rating: "Top Rated",
    plays: "Most Played",
    alpha: "A–Z"
  };

  function updateSortButtonsUI() {
    if (!sortControlBar) return;
    sortControlBar.querySelectorAll("[data-sort]").forEach(btn => {
      const isMatch = btn.getAttribute("data-sort") === activeSort;
      btn.classList.toggle("active", isMatch);
      btn.setAttribute("aria-pressed", String(isMatch));
    });
  }

  function applyFilter(categoryOrType, searchQuery = "", sortMode = activeSort) {
    activeCategory = categoryOrType;
    activeSort = sortMode || "featured";
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
    updateSortButtonsUI();

    if (categoryOrType === "all" && !cleanSearch && activeSort === "featured") {
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

    const personalRatings = window.AppState ? AppState.getAllRatings() : {};
    games = GamesRegistry.sortGames(games, activeSort, personalRatings);

    defaultHomeContent.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    filterBanner.classList.remove("hidden");

    let titleText = categoryOrType === "all" ? "All Games" : `${categoryOrType} Games`;
    if (categoryOrType === "favorites") titleText = "Saved Favorites";
    if (categoryOrType === "trending") titleText = "Trending & Hot Games";
    if (cleanSearch) titleText = `Results for "${searchQuery}"`;
    if (activeSort !== "featured") {
      titleText = `${titleText} · ${SORT_LABELS[activeSort] || activeSort}`;
    }
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
    applyFilter("all", "", "featured");
  };

  if (clearFilterBtn) {
    clearFilterBtn.addEventListener("click", window.resetHomeFilters);
  }

  if (sortControlBar) {
    sortControlBar.addEventListener("click", (e) => {
      const sortBtn = e.target.closest("[data-sort]");
      if (!sortBtn) return;
      if (window.ArcadeAudio) ArcadeAudio.playClick();
      const mode = sortBtn.getAttribute("data-sort") || "featured";
      applyFilter(activeCategory, searchInput ? searchInput.value : "", mode);
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const val = e.target.value;
      if (searchClear) {
        searchClear.classList.toggle("active", Boolean(val.trim()));
      }
      applyFilter(activeCategory, val, activeSort);
    });
  }

  if (searchClear) {
    searchClear.addEventListener("click", () => {
      if (window.ArcadeAudio) ArcadeAudio.playClick();
      searchInput.value = "";
      searchClear.classList.remove("active");
      applyFilter(activeCategory, "", activeSort);
    });
  }

  document.addEventListener("click", (e) => {
    const filterBtn = e.target.closest("[data-category]");
    if (filterBtn) {
      const cat = filterBtn.getAttribute("data-category");
      if (cat) {
        e.preventDefault();
        if (window.ArcadeAudio) ArcadeAudio.playClick();
        applyFilter(cat, searchInput ? searchInput.value : "", activeSort);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  });

  window.addEventListener("recent-updated", updateRecentShelf);
  window.addEventListener("sound-updated", updateSoundButtonUI);
  window.addEventListener("engagement-updated", () => {
    renderEngagementUI();
    if (statsModalBackdrop && !statsModalBackdrop.classList.contains("hidden")) {
      renderStatsModal();
    }
  });
  window.addEventListener("ratings-updated", () => {
    renderShelves();
    if (activeCategory !== "all" || (searchInput && searchInput.value.trim()) || activeSort !== "featured") {
      applyFilter(activeCategory, searchInput ? searchInput.value : "", activeSort);
    }
  });
  window.addEventListener("favorites-updated", () => {
    if (activeCategory === "favorites") {
      applyFilter("favorites", searchInput ? searchInput.value : "", activeSort);
    }
  });

  const urlParams = new URLSearchParams(window.location.search);
  const qParam = urlParams.get("q");
  const catParam = urlParams.get("cat");
  const sortParam = urlParams.get("sort");

  renderHeroBento();
  renderEngagementUI();
  renderShelves();
  updateRecentShelf();

  if (qParam && searchInput) {
    searchInput.value = qParam;
    if (searchClear) searchClear.classList.add("active");
    applyFilter("all", qParam, sortParam || "featured");
  } else if (catParam) {
    applyFilter(catParam, "", sortParam || "featured");
  } else if (sortParam && SORT_LABELS[sortParam]) {
    applyFilter("all", "", sortParam);
  }
});
