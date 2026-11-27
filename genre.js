/**
 * Gravity Games - SSR Genre Landing Page Progressive Enhancement
 * gravitygamez.fun
 */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("genreGamesGrid");
  const sortButtons = document.querySelectorAll("[data-genre-sort]");
  const searchInput = document.getElementById("searchInput");
  const genreSlug = grid ? grid.getAttribute("data-genre") : "";

  if (grid && genreSlug && window.GamesRegistry) {
    const baseGames = GamesRegistry.getByCategory(genreSlug);

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
        const mode = btn.getAttribute("data-genre-sort") || "featured";
        sortButtons.forEach((b) => {
          const isActive = b === btn;
          b.classList.toggle("active", isActive);
          b.setAttribute("aria-pressed", String(isActive));
        });
        renderSorted(mode);
      });
    });

    // Hydrate with local personal ratings if user has rated any genre titles
    if (window.AppState && Object.keys(AppState.getAllRatings()).length > 0) {
      renderSorted("featured");
    }
  }

  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && searchInput.value.trim()) {
        window.location.href = `/index.html?q=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
  }
});
