/**
 * Gravity Games - Core Application Logic
 * gravitygamez.fun
 * Zero-Auth localStorage State, Daily Challenge, Streak & Ratings Engine
 */

const STORAGE_KEYS = {
  FAVORITES: "gravity_favorites_v1",
  RECENTLY_PLAYED: "gravity_recent_v1",
  THEATER_MODE: "gravity_theater_pref_v1",
  ENGAGEMENT: "gravity_engagement_v1"
};

function formatDateKeyLocal(dateObj) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTodayDateKey() {
  return formatDateKeyLocal(new Date());
}

function getOffsetDateKey(daysOffset) {
  const now = new Date();
  const shifted = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysOffset, 12, 0, 0);
  return formatDateKeyLocal(shifted);
}

function hashDateKey(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function defaultEngagementState() {
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastPlayDate: null,
    historyDates: [],
    playedSlugs: [],
    dailyCompletedDates: [],
    personalRatings: {}
  };
}

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

  // Zero-Login Engagement & Streak Engine
  _loadEngagement() {
    const base = defaultEngagementState();
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ENGAGEMENT);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          base.currentStreak = Number(parsed.currentStreak) || 0;
          base.longestStreak = Number(parsed.longestStreak) || 0;
          base.lastPlayDate = typeof parsed.lastPlayDate === "string" ? parsed.lastPlayDate : null;
          base.historyDates = Array.isArray(parsed.historyDates) ? parsed.historyDates : [];
          base.playedSlugs = Array.isArray(parsed.playedSlugs) ? parsed.playedSlugs : [];
          base.dailyCompletedDates = Array.isArray(parsed.dailyCompletedDates) ? parsed.dailyCompletedDates : [];
          base.personalRatings = parsed.personalRatings && typeof parsed.personalRatings === "object"
            ? parsed.personalRatings
            : {};
        }
      }
    } catch (e) {
      // Fall back to clean base state
    }

    // Backfill explored games from legacy recently played list
    const recent = this.getRecentlyPlayed();
    if (recent.length && base.playedSlugs.length === 0) {
      base.playedSlugs = [...new Set(recent)];
    }
    return base;
  },

  _saveEngagement(state) {
    try {
      localStorage.setItem(STORAGE_KEYS.ENGAGEMENT, JSON.stringify(state));
    } catch (e) {
      console.warn("Storage error saving engagement", e);
    }
    window.dispatchEvent(new CustomEvent("engagement-updated", { detail: this.getEngagementStats() }));
  },

  getTodayDateKey() {
    return getTodayDateKey();
  },

  getDailyChallenge(dateKey = getTodayDateKey()) {
    const games = window.GamesRegistry ? window.GamesRegistry.getAll() : [];
    if (!games.length) return null;
    const idx = hashDateKey(`gravity-daily-${dateKey}`) % games.length;
    const game = games[idx];
    const engagement = this._loadEngagement();
    const completed = engagement.dailyCompletedDates.includes(dateKey);
    return {
      dateKey,
      game,
      mission: game.dailyMission || `Launch ${game.title} and complete a full run today.`,
      completed
    };
  },

  getLast7Days() {
    const engagement = this._loadEngagement();
    const playedSet = new Set(engagement.historyDates);
    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const result = [];
    for (let offset = -6; offset <= 0; offset++) {
      const now = new Date();
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset, 12, 0, 0);
      const key = formatDateKeyLocal(d);
      result.push({
        dateKey: key,
        dayShort: dayLabels[d.getDay()],
        dayNumber: d.getDate(),
        played: playedSet.has(key),
        isToday: offset === 0
      });
    }
    return result;
  },

  getEngagementStats() {
    const state = this._loadEngagement();
    const today = getTodayDateKey();
    const yesterday = getOffsetDateKey(-1);
    const totalGames = window.GamesRegistry ? window.GamesRegistry.getAll().length : 17;

    // Effective streak decays to 0 if player missed yesterday and hasn't played today
    let activeStreak = state.currentStreak;
    if (state.lastPlayDate && state.lastPlayDate !== today && state.lastPlayDate !== yesterday) {
      activeStreak = 0;
    }

    const dailyCompleted = state.dailyCompletedDates.includes(today);
    return {
      currentStreak: activeStreak,
      longestStreak: Math.max(state.longestStreak, activeStreak),
      lastPlayDate: state.lastPlayDate,
      historyDates: state.historyDates,
      playedSlugs: state.playedSlugs,
      exploredCount: state.playedSlugs.length,
      totalGames,
      dailyCompleted,
      dailyChallengesWon: state.dailyCompletedDates.length,
      personalRatings: state.personalRatings
    };
  },

  recordPlay(slug) {
    if (!slug) return { newlyCompletedDaily: false, streakUpdated: false, stats: this.getEngagementStats() };
    const list = this.getRecentlyPlayed().filter(s => s !== slug);
    list.unshift(slug);
    const trimmed = list.slice(0, 12);
    try {
      localStorage.setItem(STORAGE_KEYS.RECENTLY_PLAYED, JSON.stringify(trimmed));
    } catch (e) {
      console.warn("Storage error", e);
    }
    window.dispatchEvent(new CustomEvent("recent-updated", { detail: { slug, list: trimmed } }));

    // Update streak, explored count & daily challenge state
    const state = this._loadEngagement();
    const today = getTodayDateKey();
    const yesterday = getOffsetDateKey(-1);
    let streakUpdated = false;
    let newlyCompletedDaily = false;

    if (!state.playedSlugs.includes(slug)) {
      state.playedSlugs.push(slug);
    }

    if (state.lastPlayDate !== today) {
      if (state.lastPlayDate === yesterday) {
        state.currentStreak = (state.currentStreak || 0) + 1;
      } else {
        state.currentStreak = 1;
      }
      state.lastPlayDate = today;
      streakUpdated = true;
    }

    if (!state.historyDates.includes(today)) {
      state.historyDates.push(today);
      if (state.historyDates.length > 60) {
        state.historyDates = state.historyDates.slice(-60);
      }
    }

    if (state.currentStreak > state.longestStreak) {
      state.longestStreak = state.currentStreak;
    }

    const daily = this.getDailyChallenge(today);
    if (daily && daily.game && daily.game.slug === slug && !state.dailyCompletedDates.includes(today)) {
      state.dailyCompletedDates.push(today);
      if (state.dailyCompletedDates.length > 90) {
        state.dailyCompletedDates = state.dailyCompletedDates.slice(-90);
      }
      newlyCompletedDaily = true;
    }

    this._saveEngagement(state);
    return {
      newlyCompletedDaily,
      streakUpdated,
      stats: this.getEngagementStats()
    };
  },

  // Personal 1-5 Star Ratings
  getRating(slug) {
    if (!slug) return 0;
    const state = this._loadEngagement();
    return Number(state.personalRatings[slug]) || 0;
  },

  getAllRatings() {
    return this._loadEngagement().personalRatings || {};
  },

  setRating(slug, stars) {
    if (!slug) return 0;
    const numeric = Math.max(1, Math.min(5, Math.round(Number(stars) || 0)));
    const state = this._loadEngagement();
    state.personalRatings[slug] = numeric;
    this._saveEngagement(state);
    window.dispatchEvent(new CustomEvent("ratings-updated", { detail: { slug, rating: numeric } }));
    return numeric;
  },

  clearRating(slug) {
    if (!slug) return;
    const state = this._loadEngagement();
    if (slug in state.personalRatings) {
      delete state.personalRatings[slug];
      this._saveEngagement(state);
      window.dispatchEvent(new CustomEvent("ratings-updated", { detail: { slug, rating: 0 } }));
    }
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
    iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="${type === 'heart' ? '#FF4757' : '#B8FF36'}" stroke="currentColor" stroke-width="2"><path d="${type === 'heart' ? 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' : 'M20 6L9 17l-5-5'}"></path></svg>`;
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
  }, 2800);
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
  window.location.href = `/play.html?game=${encodeURIComponent(pick.slug)}`;
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
    navigator.serviceWorker.register("/sw.js").catch(err => {
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
