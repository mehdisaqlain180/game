/**
 * Gravity Games - Core Application Logic
 * gravitygamez.fun
 * Zero-Auth localStorage State, Event Handling & UI Utilities
 */

const STORAGE_KEYS = {
  FAVORITES: "gravity_favorites_v1",
  RECENTLY_PLAYED: "gravity_recent_v1",
  THEATER_MODE: "gravity_theater_pref_v1"
};

const AppState = {
  // Favorites Management
  getFavorites() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  isFavorite(slug) {
    const list = this.getFavorites();
    return list.includes(slug);
  },

  toggleFavorite(slug) {
    const list = this.getFavorites();
    const index = list.indexOf(slug);
    let isAdded = false;

    if (index > -1) {
      list.splice(index, 1);
      isAdded = false;
    } else {
      list.unshift(slug);
      isAdded = true;
    }

    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(list));
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }

    window.dispatchEvent(new CustomEvent("favorites-updated", { detail: { slug, isAdded, list } }));
    return isAdded;
  },

  // Recently Played Management
  getRecentlyPlayed() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECENTLY_PLAYED);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  recordPlay(slug) {
    if (!slug) return;
    const list = this.getRecentlyPlayed().filter(s => s !== slug);
    list.unshift(slug);
    // keep top 12
    const trimmed = list.slice(0, 12);
    try {
      localStorage.setItem(STORAGE_KEYS.RECENTLY_PLAYED, JSON.stringify(trimmed));
    } catch (e) {
      console.warn("Storage error", e);
    }
    window.dispatchEvent(new CustomEvent("recent-updated", { detail: { slug, list: trimmed } }));
  },

  // Theater Mode Preference
  getTheaterMode() {
    return localStorage.getItem(STORAGE_KEYS.THEATER_MODE) === "true";
  },

  setTheaterMode(enabled) {
    localStorage.setItem(STORAGE_KEYS.THEATER_MODE, enabled ? "true" : "false");
    if (enabled) {
      document.body.classList.add("theater-mode");
    } else {
      document.body.classList.remove("theater-mode");
    }
  }
};

/**
 * Toast Notification System
 */
function showToast(message, type = "info") {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";

  let iconSvg = "";
  if (type === "success" || type === "heart") {
    iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="${type === 'heart' ? '#FF4757' : '#B8FF36'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
  } else if (type === "copy") {
    iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7357FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
  } else {
    iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7357FF" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  toast.innerHTML = `${iconSvg}<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-out");
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 200);
  }, 2600);
}

/**
 * Random Game Launcher
 */
function launchRandomGame(excludeSlug = null) {
  if (!window.GamesRegistry) return;
  const all = window.GamesRegistry.getAll();
  const pool = excludeSlug ? all.filter(g => g.slug !== excludeSlug) : all;
  if (!pool.length) return;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  window.location.href = `play.html?game=${encodeURIComponent(pick.slug)}`;
}

/**
 * Global Header & Keyboard Interactions
 */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".js-random-game").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const params = new URLSearchParams(window.location.search);
      launchRandomGame(params.get("game"));
    });
  });

  // Press "/" to focus search bar
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "/" &&
        document.activeElement !== searchInput &&
        !/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || "")
      ) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }
});

/**
 * Service Worker Registration for PWA & Asset Rewrites
 */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(err => {
      console.log("Service Worker registration skipped:", err);
    });
  });
}

// Global Export
if (typeof window !== "undefined") {
  window.AppState = AppState;
  window.showToast = showToast;
  window.launchRandomGame = launchRandomGame;
}
