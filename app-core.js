/**
 * Gravity Games - Core Application Logic
 * gravitygamez.fun
 * Zero-Auth localStorage State, XP Levels, Achievements, Daily Challenge, Streak & Web Audio SFX
 */

const STORAGE_KEYS = {
  FAVORITES: "gravity_favorites_v1",
  RECENTLY_PLAYED: "gravity_recent_v1",
  THEATER_MODE: "gravity_theater_pref_v1",
  ENGAGEMENT: "gravity_engagement_v1"
};

const LEVEL_RANKS = [
  { level: 1, minXp: 0, title: "Rookie" },
  { level: 2, minXp: 100, title: "Challenger" },
  { level: 3, minXp: 250, title: "Arcade Ace" },
  { level: 4, minXp: 450, title: "Combo Runner" },
  { level: 5, minXp: 700, title: "Reflex Master" },
  { level: 6, minXp: 1000, title: "Gravity Pro" },
  { level: 7, minXp: 1350, title: "Grand Tactician" },
  { level: 8, minXp: 1750, title: "Cyber Legend" },
  { level: 9, minXp: 2200, title: "Apex Champion" },
  { level: 10, minXp: 2700, title: "Gravity Sovereign" }
];

const RAGE_SLUGS = ["dont-trust-the-floor", "one-button-hell", "the-fake-exit", "trust-issues", "reality-changes"];
const BOARD_SLUGS = ["obsidian-chess", "connect-four", "neon-grid-tic-tac-toe"];

const ACHIEVEMENTS_CATALOG = [
  {
    id: "first-launch",
    title: "First Launch",
    description: "Play your first instant browser game.",
    xp: 25,
    icon: "rocket",
    check: (ctx) => ctx.exploredCount >= 1
  },
  {
    id: "arcade-hopper",
    title: "Arcade Hopper",
    description: "Explore 5 different games in the catalog.",
    xp: 40,
    icon: "compass",
    check: (ctx) => ctx.exploredCount >= 5
  },
  {
    id: "catalog-master",
    title: "Catalog Master",
    description: "Launch all 17 games on Gravity Games.",
    xp: 100,
    icon: "crown",
    check: (ctx) => ctx.exploredCount >= ctx.totalGames
  },
  {
    id: "genre-explorer",
    title: "Genre Explorer",
    description: "Play at least one game across all 5 genres.",
    xp: 50,
    icon: "layers",
    check: (ctx) => ctx.genresPlayedCount >= 5
  },
  {
    id: "daily-challenger",
    title: "Daily Challenger",
    description: "Complete your first Daily Challenge spotlight.",
    xp: 40,
    icon: "bolt",
    check: (ctx) => ctx.dailyChallengesWon >= 1
  },
  {
    id: "streak-3",
    title: "3-Day Streak",
    description: "Play games on 3 consecutive days.",
    xp: 50,
    icon: "flame",
    check: (ctx) => ctx.longestStreak >= 3
  },
  {
    id: "streak-7",
    title: "Week Warrior",
    description: "Maintain a 7-day play streak.",
    xp: 90,
    icon: "flame",
    check: (ctx) => ctx.longestStreak >= 7
  },
  {
    id: "sharp-critic",
    title: "Sharp Critic",
    description: "Rate 5 games with personal star scores.",
    xp: 35,
    icon: "star",
    check: (ctx) => ctx.ratingsCount >= 5
  },
  {
    id: "curator",
    title: "Curator",
    description: "Save 5 games to your Favorites shelf.",
    xp: 35,
    icon: "heart",
    check: (ctx) => ctx.favoritesCount >= 5
  },
  {
    id: "rage-survivor",
    title: "Rage Survivor",
    description: "Take on 3 hardcore rage or troll platformers.",
    xp: 45,
    icon: "shield",
    check: (ctx) => ctx.ragePlayedCount >= 3
  },
  {
    id: "grand-tactician",
    title: "Grand Tactician",
    description: "Play Chess, Connect Four, and Neon Tic-Tac-Toe.",
    xp: 45,
    icon: "trophy",
    check: (ctx) => ctx.boardPlayedCount >= 3
  },
  {
    id: "level-5-legend",
    title: "Level 5 Legend",
    description: "Reach Level 5 by earning XP from play and badges.",
    xp: 50,
    icon: "award",
    check: (ctx) => ctx.level >= 5
  }
];

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

function getLevelInfo(rawXp = 0) {
  const xp = Math.max(0, Math.round(Number(rawXp) || 0));
  let current = LEVEL_RANKS[0];
  let next = LEVEL_RANKS[1];

  for (let i = 0; i < LEVEL_RANKS.length; i++) {
    if (xp >= LEVEL_RANKS[i].minXp) {
      current = LEVEL_RANKS[i];
      next = LEVEL_RANKS[i + 1] || null;
    }
  }

  if (!next) {
    const extraLevels = Math.floor((xp - current.minXp) / 500);
    const level = current.level + extraLevels;
    const currentFloor = current.minXp + extraLevels * 500;
    const nextTarget = currentFloor + 500;
    const span = nextTarget - currentFloor;
    const progressPct = Math.min(100, Math.max(0, Math.round(((xp - currentFloor) / span) * 100)));
    return {
      level,
      rankTitle: current.title,
      xp,
      currentLevelFloor: currentFloor,
      nextLevelTarget: nextTarget,
      xpIntoLevel: xp - currentFloor,
      xpToNext: Math.max(0, nextTarget - xp),
      progressPct
    };
  }

  const span = Math.max(1, next.minXp - current.minXp);
  const progressPct = Math.min(100, Math.max(0, Math.round(((xp - current.minXp) / span) * 100)));
  return {
    level: current.level,
    rankTitle: current.title,
    xp,
    currentLevelFloor: current.minXp,
    nextLevelTarget: next.minXp,
    xpIntoLevel: xp - current.minXp,
    xpToNext: Math.max(0, next.minXp - xp),
    progressPct
  };
}

function defaultEngagementState() {
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastPlayDate: null,
    historyDates: [],
    playedSlugs: [],
    dailyCompletedDates: [],
    personalRatings: {},
    xp: 0,
    totalLaunches: 0,
    unlockedAchievements: {},
    ratedRewardedSlugs: [],
    favRewardedSlugs: [],
    soundEnabled: true
  };
}

/**
 * Lightweight Web Audio Synthesizer for UI Micro-Feedback & Achievements
 */
const ArcadeAudio = {
  _ctx: null,

  _getCtx() {
    if (!AppState.isSoundEnabled()) return null;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    try {
      if (!this._ctx) {
        this._ctx = new AudioCtx();
      }
      if (this._ctx.state === "suspended") {
        this._ctx.resume().catch(() => {});
      }
      return this._ctx;
    } catch {
      return null;
    }
  },

  _tone(freq, startOffset, duration, type = "sine", peakGain = 0.045, endFreq = null) {
    const ctx = this._getCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime + startOffset;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      if (endFreq) {
        osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);
      }
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(peakGain, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration + 0.02);
    } catch {
      // Audio playback blocked or unavailable
    }
  },

  playClick() {
    this._tone(540, 0, 0.055, "triangle", 0.032, 680);
  },

  playFavorite(added = true) {
    if (added) {
      this._tone(523.25, 0, 0.08, "sine", 0.04);
      this._tone(659.25, 0.055, 0.11, "sine", 0.045);
    } else {
      this._tone(440, 0, 0.07, "sine", 0.03);
      this._tone(329.63, 0.05, 0.09, "sine", 0.025);
    }
  },

  playRating(stars = 3) {
    const base = 440 * Math.pow(1.09, Math.max(1, Math.min(5, stars)));
    this._tone(base, 0, 0.09, "triangle", 0.04, base * 1.12);
    this._tone(base * 1.5, 0.045, 0.11, "sine", 0.03);
  },

  playDailyWin() {
    this._tone(392.0, 0, 0.09, "triangle", 0.045);
    this._tone(493.88, 0.07, 0.09, "triangle", 0.045);
    this._tone(587.33, 0.14, 0.11, "triangle", 0.05);
    this._tone(783.99, 0.21, 0.2, "sine", 0.055);
  },

  playBadgeUnlock() {
    this._tone(523.25, 0, 0.085, "triangle", 0.045);
    this._tone(659.25, 0.07, 0.085, "triangle", 0.045);
    this._tone(783.99, 0.14, 0.1, "triangle", 0.05);
    this._tone(1046.5, 0.22, 0.22, "sine", 0.055);
  }
};

const AppState = {
  // Favorites Management
  getFavorites() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  isFavorite(slug) {
    return this.getFavorites().includes(slug);
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

    const state = this._loadEngagement();
    let newlyUnlocked = [];
    if (isAdded && slug && !state.favRewardedSlugs.includes(slug)) {
      state.favRewardedSlugs.push(slug);
      state.xp += 10;
    }
    newlyUnlocked = this._evaluateAchievementsOnState(state, list.length);
    this._saveEngagement(state);

    ArcadeAudio.playFavorite(isAdded);
    this._notifyUnlocks(newlyUnlocked);

    window.dispatchEvent(new CustomEvent("favorites-updated", { detail: { slug, isAdded, list } }));
    return isAdded;
  },

  // Recently Played Management
  getRecentlyPlayed() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECENTLY_PLAYED);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  // Sound Preferences
  isSoundEnabled() {
    return this._loadEngagement().soundEnabled !== false;
  },

  setSoundEnabled(enabled) {
    const state = this._loadEngagement();
    state.soundEnabled = Boolean(enabled);
    this._saveEngagement(state);
    window.dispatchEvent(new CustomEvent("sound-updated", { detail: { enabled: state.soundEnabled } }));
    if (state.soundEnabled) {
      ArcadeAudio.playClick();
    }
    return state.soundEnabled;
  },

  toggleSound() {
    return this.setSoundEnabled(!this.isSoundEnabled());
  },

  // Zero-Login Engagement, XP & Achievement Engine
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
          base.xp = Number(parsed.xp) || 0;
          base.totalLaunches = Number(parsed.totalLaunches) || 0;
          base.unlockedAchievements = parsed.unlockedAchievements && typeof parsed.unlockedAchievements === "object"
            ? parsed.unlockedAchievements
            : {};
          base.ratedRewardedSlugs = Array.isArray(parsed.ratedRewardedSlugs) ? parsed.ratedRewardedSlugs : [];
          base.favRewardedSlugs = Array.isArray(parsed.favRewardedSlugs) ? parsed.favRewardedSlugs : [];
          base.soundEnabled = parsed.soundEnabled !== false;
        }
      }
    } catch {
      // Clean fallback
    }

    // Backfill explored games & baseline XP for returning players upgrading from v1
    const recent = this.getRecentlyPlayed();
    if (recent.length && base.playedSlugs.length === 0) {
      base.playedSlugs = [...new Set(recent)];
    }
    if (base.xp === 0 && (base.playedSlugs.length > 0 || base.dailyCompletedDates.length > 0)) {
      base.xp = (base.playedSlugs.length * 25) + (base.dailyCompletedDates.length * 60);
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

  _buildAchievementContext(state, favoritesCountOverride = null) {
    const games = window.GamesRegistry ? window.GamesRegistry.getAll() : [];
    const totalGames = games.length || 17;
    const playedSet = new Set(state.playedSlugs || []);
    const genresPlayed = new Set(
      games.filter(g => playedSet.has(g.slug)).map(g => g.category.toLowerCase())
    );
    const ragePlayedCount = RAGE_SLUGS.filter(slug => playedSet.has(slug)).length;
    const boardPlayedCount = BOARD_SLUGS.filter(slug => playedSet.has(slug)).length;
    const favoritesCount = favoritesCountOverride !== null ? favoritesCountOverride : this.getFavorites().length;
    const ratingsCount = Object.keys(state.personalRatings || {}).length;
    const levelInfo = getLevelInfo(state.xp);

    return {
      exploredCount: state.playedSlugs.length,
      totalGames,
      genresPlayedCount: genresPlayed.size,
      dailyChallengesWon: state.dailyCompletedDates.length,
      longestStreak: Math.max(state.longestStreak || 0, state.currentStreak || 0),
      ratingsCount,
      favoritesCount,
      ragePlayedCount,
      boardPlayedCount,
      level: levelInfo.level
    };
  },

  _evaluateAchievementsOnState(state, favoritesCountOverride = null) {
    const newlyUnlocked = [];
    const today = getTodayDateKey();
    let unlockedAny = true;
    let safetyPasses = 0;

    // Loop up to 3 passes so earning badge XP can cascade into Level 5 Legend cleanly
    while (unlockedAny && safetyPasses < 3) {
      unlockedAny = false;
      safetyPasses++;
      const ctx = this._buildAchievementContext(state, favoritesCountOverride);
      for (const badge of ACHIEVEMENTS_CATALOG) {
        if (!state.unlockedAchievements[badge.id] && badge.check(ctx)) {
          state.unlockedAchievements[badge.id] = today;
          state.xp += badge.xp;
          newlyUnlocked.push(badge);
          unlockedAny = true;
        }
      }
    }
    return newlyUnlocked;
  },

  _notifyUnlocks(newlyUnlocked) {
    if (!newlyUnlocked || !newlyUnlocked.length) return;
    ArcadeAudio.playBadgeUnlock();
    newlyUnlocked.slice(0, 2).forEach((badge, idx) => {
      setTimeout(() => {
        showToast(`Badge Unlocked: ${badge.title} (+${badge.xp} XP)`, "badge");
      }, idx * 450);
    });
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

  getAchievements() {
    const state = this._loadEngagement();
    const newlyUnlocked = this._evaluateAchievementsOnState(state);
    if (newlyUnlocked.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEYS.ENGAGEMENT, JSON.stringify(state));
      } catch {
        // Ignore quota errors
      }
    }
    return ACHIEVEMENTS_CATALOG.map(badge => ({
      ...badge,
      unlocked: Boolean(state.unlockedAchievements[badge.id]),
      unlockedAt: state.unlockedAchievements[badge.id] || null
    }));
  },

  getEngagementStats() {
    const state = this._loadEngagement();
    const today = getTodayDateKey();
    const yesterday = getOffsetDateKey(-1);
    const totalGames = window.GamesRegistry ? window.GamesRegistry.getAll().length : 17;

    let activeStreak = state.currentStreak;
    if (state.lastPlayDate && state.lastPlayDate !== today && state.lastPlayDate !== yesterday) {
      activeStreak = 0;
    }

    const dailyCompleted = state.dailyCompletedDates.includes(today);
    const levelInfo = getLevelInfo(state.xp);
    const unlockedCount = ACHIEVEMENTS_CATALOG.filter(b => Boolean(state.unlockedAchievements[b.id])).length;

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
      personalRatings: state.personalRatings,
      xp: state.xp,
      totalLaunches: state.totalLaunches,
      levelInfo,
      unlockedCount,
      totalAchievements: ACHIEVEMENTS_CATALOG.length,
      soundEnabled: state.soundEnabled !== false
    };
  },

  recordPlay(slug) {
    if (!slug) {
      return {
        newlyCompletedDaily: false,
        streakUpdated: false,
        newlyUnlocked: [],
        leveledUp: false,
        xpEarned: 0,
        stats: this.getEngagementStats()
      };
    }

    const list = this.getRecentlyPlayed().filter(s => s !== slug);
    list.unshift(slug);
    const trimmed = list.slice(0, 12);
    try {
      localStorage.setItem(STORAGE_KEYS.RECENTLY_PLAYED, JSON.stringify(trimmed));
    } catch (e) {
      console.warn("Storage error", e);
    }
    window.dispatchEvent(new CustomEvent("recent-updated", { detail: { slug, list: trimmed } }));

    const state = this._loadEngagement();
    const prevLevel = getLevelInfo(state.xp).level;
    const prevXp = state.xp;

    const today = getTodayDateKey();
    const yesterday = getOffsetDateKey(-1);
    let streakUpdated = false;
    let newlyCompletedDaily = false;

    state.totalLaunches = (state.totalLaunches || 0) + 1;

    if (!state.playedSlugs.includes(slug)) {
      state.playedSlugs.push(slug);
      state.xp += 30;
    } else {
      state.xp += 10;
    }

    if (state.lastPlayDate !== today) {
      if (state.lastPlayDate === yesterday) {
        state.currentStreak = (state.currentStreak || 0) + 1;
      } else {
        state.currentStreak = 1;
      }
      state.lastPlayDate = today;
      state.xp += 25;
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
      state.xp += 60;
      newlyCompletedDaily = true;
    }

    const newlyUnlocked = this._evaluateAchievementsOnState(state);
    const nextLevelInfo = getLevelInfo(state.xp);
    const leveledUp = nextLevelInfo.level > prevLevel;

    this._saveEngagement(state);
    return {
      newlyCompletedDaily,
      streakUpdated,
      newlyUnlocked,
      leveledUp,
      xpEarned: state.xp - prevXp,
      levelInfo: nextLevelInfo,
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
    if (!state.ratedRewardedSlugs.includes(slug)) {
      state.ratedRewardedSlugs.push(slug);
      state.xp += 15;
    }
    const newlyUnlocked = this._evaluateAchievementsOnState(state);
    this._saveEngagement(state);

    ArcadeAudio.playRating(numeric);
    this._notifyUnlocks(newlyUnlocked);

    window.dispatchEvent(new CustomEvent("ratings-updated", { detail: { slug, rating: numeric } }));
    return numeric;
  },

  clearRating(slug) {
    if (!slug) return;
    const state = this._loadEngagement();
    if (slug in state.personalRatings) {
      delete state.personalRatings[slug];
      this._saveEngagement(state);
      ArcadeAudio.playClick();
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
  if (type === "badge") {
    iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFD233" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>`;
  } else if (type === "success" || type === "heart") {
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
  }, 3000);
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
  ArcadeAudio.playClick();
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

if (typeof window !== "undefined") {
  window.ACHIEVEMENTS_CATALOG = ACHIEVEMENTS_CATALOG;
  window.ArcadeAudio = ArcadeAudio;
  window.AppState = AppState;
  window.showToast = showToast;
  window.launchRandomGame = launchRandomGame;
}
