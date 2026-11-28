/**
 * Gravity Games - SSR Genre & Tag Hub Progressive Enhancement
 * gravitygamez.fun
 */

document.addEventListener("DOMContentLoaded", () => {
  function setupCollectionGrid({ gridId, dataAttr, sortAttr, fetchGames }) {
    const grid = document.getElementById(gridId);
    const sortButtons = document.querySelectorAll(`[${sortAttr}]`);
    const slug = grid ? grid.getAttribute(dataAttr) : "";
    if (!grid || !slug || !window.GamesRegistry) return;

    const baseGames = fetchGames(slug);

    function renderSorted(sortMode) {
      const ratings = window.AppState ? AppState.getAllRatings() : {};
      const sorted = GamesRegistry.sortGames(baseGames, sortMode, ratings);
      grid.innerHTML = sorted.map((game) => {
        const userRating = ratings[game.slug];
        const ratingText = userRating ? `★ ${userRating}/5 (You)` : `★ ${game.rating}`;
        return `
          <a href="/play.html?game=${game.slug}" class="game-cover-card" data-slug="${game.slug}" title="Play ${game.title}">
            <img src="/${game.paths.cover}" alt="${game.title} cover artwork" class="cover-art" loading="lazy" referrerpolicy="no-referrer">
            <div class="cover-overlay">
              <div class="cover-card-header">
                <img src="/${game.paths.icon}" alt="${game.title} icon" class="cover-card-icon" loading="lazy" referrerpolicy="no-referrer">
                <span class="cover-card-title">${game.title}</span>
              </div>
              <div class="cover-card-meta">
                <span class="cover-card-category">${game.category} · ${game.plays}</span>
                <span class="cover-card-rating tabular-nums">${ratingText}</span>
              </div>
            </div>
          </a>
        `;
      }).join("");
    }

    sortButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (window.ArcadeAudio) ArcadeAudio.playClick();
        const mode = btn.getAttribute(sortAttr) || "featured";
        sortButtons.forEach((b) => {
          const isActive = b === btn;
          b.classList.toggle("active", isActive);
          b.setAttribute("aria-pressed", String(isActive));
        });
        renderSorted(mode);
      });
    });

    if (window.AppState && Object.keys(AppState.getAllRatings()).length > 0) {
      renderSorted("featured");
    }
  }

  setupCollectionGrid({
    gridId: "genreGamesGrid",
    dataAttr: "data-genre",
    sortAttr: "data-genre-sort",
    fetchGames: (slug) => GamesRegistry.getByCategory(slug)
  });

  setupCollectionGrid({
    gridId: "tagGamesGrid",
    dataAttr: "data-tag",
    sortAttr: "data-tag-sort",
    fetchGames: (slug) => (GamesRegistry.getByTag ? GamesRegistry.getByTag(slug) : [])
  });

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && searchInput.value.trim()) {
        window.location.href = `/index.html?q=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
  }
});
