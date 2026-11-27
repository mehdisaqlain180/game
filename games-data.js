/**
 * Gravity Games - Central Game Registry
 * gravitygamez.fun
 * Pure Vanilla JavaScript ES6+ Data Store
 */

const GAMES_DATA = [
  {
    slug: "dont-trust-the-floor",
    folder: "Don't-Trust-The-Floor",
    title: "Don't Trust The Floor",
    tagline: "A deceptive 50-level 2D pixel platformer where floors betray you.",
    category: "Action",
    badge: "Trending",
    featured: true,
    trending: true,
    rating: 4.9,
    plays: "142K",
    tags: ["Action", "Platformer", "Rage", "Pixel Art", "Gravity", "Deceptive"],
    description: "Don't Trust The Floor is a deceptive, minimalist pixel-art rage platformer spanning 50 handcrafted trial levels. Every step is a test of intuition and lightning-fast reflexes: floors vanish under your feet, collapse without warning, flip your gravity upside down, and mock your trust. Memorize hazards, outsmart devious traps, and push your platforming skills to the limit.",
    controls: {
      movement: "A / D or Left / Right Arrows to Run",
      jump: "W, Up Arrow, or Spacebar to Jump",
      restart: "R to Quick-Restart",
      mobile: "On-screen touch d-pad and jump button"
    },
    paths: {
      game: "Don't-Trust-The-Floor/index.html",
      icon: "Don't-Trust-The-Floor/icon.jpg",
      banner: "Don't-Trust-The-Floor/banner.jpg",
      cover: "Don't-Trust-The-Floor/cover.jpg"
    }
  },
  {
    slug: "neon-wave-legends",
    folder: "Neon-Wave-Legends",
    title: "Neon Wave Legends",
    tagline: "Fast-paced one-button precision wave arcade in a glowing cyber-cavern.",
    category: "Arcade",
    badge: "HOT",
    featured: true,
    trending: true,
    rating: 4.8,
    plays: "98K",
    tags: ["Arcade", "Skill", "One Button", "Cyberpunk", "Rhythm", "High Score"],
    description: "Navigate an ultra-luminescent cyber-cavern at breakneck speeds. Neon Wave Legends challenges your cadence and micro-timing as you hold to ascend and release to swoop downward through razor-sharp geometry, kinetic laser walls, and dynamic sonic obstacles.",
    controls: {
      movement: "Hold Space, Left Click, or Touch to Ascend; Release to Dive",
      restart: "R to Quick-Restart",
      mobile: "Tap and hold anywhere on screen"
    },
    paths: {
      game: "Neon-Wave-Legends/index.html",
      icon: "Neon-Wave-Legends/icon.jpg",
      banner: "Neon-Wave-Legends/banner.jpg",
      cover: "Neon-Wave-Legends/cover.jpg"
    }
  },
  {
    slug: "one-button-hell",
    folder: "One-Button-Hell",
    title: "One Button Hell",
    tagline: "A brutal 50-level rage platformer controlled with a single button.",
    category: "Skill",
    badge: "Hardcore",
    featured: true,
    trending: true,
    rating: 4.9,
    plays: "215K",
    tags: ["Skill", "Action", "Rage", "Hardcore", "Minimalist", "One Button"],
    description: "Stripped down to purest mechanical mastery: jump with a single input to conquer 50 sadistic obstacle chambers. With zero run controls, your velocity is fixed and your only tool is jumping at microscopic precision frames over spinning saws, phantom spikes, and collapsible platforms.",
    controls: {
      movement: "Automatic forward momentum",
      jump: "Spacebar, Left Click, or Screen Tap to Jump",
      restart: "R to Restart Level",
      mobile: "Single tap anywhere on screen"
    },
    paths: {
      game: "One-Button-Hell/index.html",
      icon: "One-Button-Hell/icon.jpg",
      banner: "One-Button-Hell/banner.jpg",
      cover: "One-Button-Hell/cover.jpg"
    }
  },
  {
    slug: "prism-rush",
    folder: "Prism-Rush",
    title: "Prism Rush",
    tagline: "High-speed first-person kaleidoscopic 3D endless reflex dodger.",
    category: "Action",
    badge: "3D",
    featured: true,
    trending: true,
    rating: 4.7,
    plays: "116K",
    tags: ["Action", "3D", "Arcade", "Tunnel Dodger", "Speed", "Split-Screen"],
    description: "Hurl through an infinite color-shifting prismatic hyperspace tunnel. Dodge procedural kinetic pillars, rotate your tunnel axis, trigger hypersonic boosts, and survive the ever-accelerating tempo. Includes local 2-player split-screen support for head-to-head racing.",
    controls: {
      movement: "A / D or Left / Right Arrows to Rotate Tunnel Axis",
      boost: "W, Up Arrow, or Space to Boost / Jump",
      twoPlayer: "P1: A/D/W | P2: Left/Right/Up Arrows",
      mobile: "Tilt device or swipe left/right"
    },
    paths: {
      game: "Prism-Rush/index.html",
      icon: "Prism-Rush/icon.jpg",
      banner: "Prism-Rush/banner.jpg",
      cover: "Prism-Rush/cover.jpg"
    }
  },
  {
    slug: "stealth-ninja",
    folder: "Stealth-Ninja",
    title: "Stealth Ninja",
    tagline: "Tactical top-down cyber-infiltration with shurikens and shadow dashes.",
    category: "Action",
    badge: "Tactical",
    featured: false,
    trending: true,
    rating: 4.8,
    plays: "87K",
    tags: ["Action", "Skill", "Stealth", "Ninja", "Top-Down", "Cyberpunk"],
    description: "Infiltrate high-security neon strongholds as a silent assassin. Dodge surveillance searchlights, eliminate patrolling guards from the shadows, throw lethal shurikens at range, and execute lightning-fast shadow dashes to bypass automated laser barriers.",
    controls: {
      movement: "W, A, S, D to Move",
      dash: "Spacebar or Shift for Shadow Step Dash",
      attack: "Left Click to Takedown / E or Right Click to Throw Shuriken",
      restart: "R to Quick-Restart",
      mobile: "Virtual joystick with on-screen Dash and Throw buttons"
    },
    paths: {
      game: "Stealth-Ninja/index.html",
      icon: "Stealth-Ninja/icon.jpg",
      banner: "Stealth-Ninja/banner.jpg",
      cover: "Stealth-Ninja/cover.jpg"
    }
  },
  {
    slug: "stickman-bullet-warriors",
    folder: "stickman-bullet-warriors",
    title: "Stickman Bullet Warriors",
    tagline: "High-juice 2D ricochet physics shooter with ragdoll chaos.",
    category: "Action",
    badge: "Popular",
    featured: false,
    trending: true,
    rating: 4.8,
    plays: "178K",
    tags: ["Action", "Puzzle", "Shooter", "Physics", "Ragdoll", "Stickman"],
    description: "Calculate bullet trajectories across 25 handcrafted physics chambers. Bank high-caliber rounds off iron girders, shatter explosive barrels, trigger falling anvils, and watch enemy stickman squads tumble with satisfying ragdoll physics.",
    controls: {
      aim: "Mouse cursor to Aim Trajectory",
      shoot: "Left Click to Fire Ricochet Bullet",
      restart: "R to Reset Chamber",
      mobile: "Touch, drag trajectory guide, and release to shoot"
    },
    paths: {
      game: "stickman-bullet-warriors/index.html",
      icon: "stickman-bullet-warriors/icon.jpg",
      banner: "stickman-bullet-warriors/banner.jpg",
      cover: "stickman-bullet-warriors/cover.jpg"
    }
  },
  {
    slug: "vector-flip",
    folder: "vector-flip",
    title: "Vector Flip",
    tagline: "High-speed multi-axis gravity platform runner across 12 sectors.",
    category: "Arcade",
    badge: "Speedrun",
    featured: false,
    trending: false,
    rating: 4.7,
    plays: "65K",
    tags: ["Arcade", "Action", "Gravity", "Runner", "Multiplayer", "Sci-Fi"],
    description: "Gravity is merely a suggestion. Flip between ceiling and floor at supersonic speeds across 12 handcrafted story sectors. Features multi-axis dynamic camera rotation, hidden secret orbs, an endless survival track, and local 1-4 player competitive mayhem.",
    controls: {
      flip: "Spacebar, Up Arrow, or Left Click to Invert Gravity",
      slide: "Down Arrow or S to Slide Under Barriers",
      restart: "R to Quick-Restart",
      mobile: "Tap top half of screen to flip, bottom half to slide"
    },
    paths: {
      game: "vector-flip/index.html",
      icon: "vector-flip/icon.jpg",
      banner: "vector-flip/banner.jpg",
      cover: "vector-flip/cover.jpg"
    }
  },
  {
    slug: "swingline",
    folder: "swingline",
    title: "Swingline",
    tagline: "Fast-paced 50-level pendulum swinging platformer with grapple physics.",
    category: "Arcade",
    badge: "Physics",
    featured: false,
    trending: true,
    rating: 4.8,
    plays: "92K",
    tags: ["Arcade", "Skill", "Grapple", "Physics", "Stickman", "Platformer"],
    description: "Harness momentum and hook physics across 50 treacherous stages. Grapple onto ceiling anchor points, build pendulum momentum, release at the apex to soar over laser fields, and collect stars to unlock unique stickman suits.",
    controls: {
      grapple: "Hold Space, Left Click, or Screen Touch to Hook Anchor Point",
      release: "Release key/click to fly forward with conserved momentum",
      restart: "R to Restart Level",
      mobile: "Touch and hold to grapple, release to launch"
    },
    paths: {
      game: "swingline/index.html",
      icon: "swingline/icon.jpg",
      banner: "swingline/banner.jpg",
      cover: "swingline/cover.jpg"
    }
  },
  {
    slug: "terravox-3d-sandbox",
    folder: "terravox-3d-sandbox",
    title: "TerraVox 3D Sandbox",
    tagline: "WebGL 3D voxel sandbox with procedural terrain and creative building.",
    category: "Arcade",
    badge: "WebGL 3D",
    featured: false,
    trending: false,
    rating: 4.6,
    plays: "74K",
    tags: ["Arcade", "3D", "Sandbox", "Voxel", "Building", "Exploration"],
    description: "A lightweight, fully procedural 3D voxel sandbox engine running smoothly in pure WebGL. Mine distinct block types, sculpt hills, construct fortresses, toggle flight and creative modes, and experience dynamic ambient lighting.",
    controls: {
      movement: "W, A, S, D to Walk | Spacebar to Jump (Double-tap to Fly)",
      look: "Mouse to Look Around (Click canvas to lock pointer)",
      mine: "Left Click to Break Block",
      build: "Right Click to Place Selected Block",
      hotbar: "Keys 1-9 to Select Block Type",
      mobile: "Virtual sticks for look and walk with build/mine action pads"
    },
    paths: {
      game: "terravox-3d-sandbox/index.html",
      icon: "terravox-3d-sandbox/icon.jpg",
      banner: "terravox-3d-sandbox/banner.jpg",
      cover: "terravox-3d-sandbox/cover.jpg"
    }
  },
  {
    slug: "the-fake-exit",
    folder: "the-fake-exit",
    title: "The Fake Exit",
    tagline: "A 40-level rage puzzle-platformer where exits lie and gravity cheats.",
    category: "Action",
    badge: "Puzzle",
    featured: false,
    trending: true,
    rating: 4.9,
    plays: "155K",
    tags: ["Action", "Platformer", "Puzzle", "Rage", "Brain Teaser", "Troll"],
    description: "The obvious door is almost always a death trap. Journey through 40 perplexing puzzle chambers where you must identify counterfeit exit doors, solve environmental riddles, navigate invisible platforms, and survive relentless psychological trolling.",
    controls: {
      movement: "A / D or Left / Right Arrows to Move",
      jump: "W, Up Arrow, or Spacebar to Jump",
      restart: "R to Quick-Restart",
      mobile: "Touch D-Pad and Jump button"
    },
    paths: {
      game: "the-fake-exit/index.html",
      icon: "the-fake-exit/icon.jpg",
      banner: "the-fake-exit/banner.jpg",
      cover: "the-fake-exit/cover.jpg"
    }
  },
  {
    slug: "threshold-shift",
    folder: "threshold-shift",
    title: "Threshold // Shift",
    tagline: "First-person psychological liminal runner and illusion obstacle game.",
    category: "Skill",
    badge: "Atmospheric",
    featured: false,
    trending: false,
    rating: 4.8,
    plays: "52K",
    tags: ["Skill", "3D", "Atmospheric", "Liminal", "Psychological", "First-Person"],
    description: "Built with Three.js and generative Web Audio, Threshold // Shift immerses you in endless liminal corridors where architectural reality folds upon itself. Read perspective illusions, match shifting harmonic frequencies, and outrun an encroaching void.",
    controls: {
      movement: "W, A, S, D to Move | Shift to Sprint",
      look: "Mouse cursor to Navigate Perspective",
      interact: "E or Left Click to Shift Frequency",
      restart: "R to Reset Sequence",
      mobile: "On-screen touch look and walk controls"
    },
    paths: {
      game: "threshold-shift/index.html",
      icon: "threshold-shift/icon.jpg",
      banner: "threshold-shift/banner.jpg",
      cover: "threshold-shift/cover.jpg"
    }
  },
  {
    slug: "trust-issues",
    folder: "trust-issues",
    title: "Trust Issues",
    tagline: "A minimalist troll platformer where nothing is quite what it seems.",
    category: "Action",
    badge: "Trap",
    featured: false,
    trending: true,
    rating: 4.9,
    plays: "189K",
    tags: ["Action", "Platformer", "Rage", "Troll", "Retro", "Trial & Error"],
    description: "Every floor tile is a suspect and every friendly signpost is misleading. Trust Issues is an unforgiving precision trial that subverts standard gaming tropes. Anticipate hidden drop-spikes, backward momentum fields, and sudden gravity inversions.",
    controls: {
      movement: "Arrow Keys or W, A, S, D to Navigate",
      jump: "Up Arrow, W, or Spacebar to Jump",
      restart: "R to Quick-Restart",
      mobile: "Responsive touch control pad"
    },
    paths: {
      game: "trust-issues/index.html",
      icon: "trust-issues/icon.jpg",
      banner: "trust-issues/banner.jpg",
      cover: "trust-issues/cover.jpg"
    }
  },
  {
    slug: "savannah-sovereign",
    folder: "Savannah-Sovereign",
    title: "Savannah Sovereign",
    tagline: "Low-poly 3D lion life simulator with dynamic hunting and pride growth.",
    category: "Adventure",
    badge: "Simulation",
    featured: false,
    trending: true,
    rating: 4.7,
    plays: "112K",
    tags: ["Adventure", "3D", "Simulation", "Animal", "Survival", "Open World"],
    description: "Rule the African wilderness in this stylized low-poly 3D life simulator. Hunt grazing herds across an open savanna, defend territory against rival predators, survive dynamic day/night cycles and seasonal weather, and lead your pride to dominance.",
    controls: {
      movement: "W, A, S, D to Run and Stalk",
      sprint: "Hold Shift to Sprint",
      pounce: "Spacebar or Left Click to Pounce / Attack",
      camera: "Mouse to Rotate 3D Camera",
      mobile: "Dual analog touch controls with sprint and strike buttons"
    },
    paths: {
      game: "Savannah-Sovereign/index.html",
      icon: "Savannah-Sovereign/icon.jpg",
      banner: "Savannah-Sovereign/banner.jpg",
      cover: "Savannah-Sovereign/cover.jpg"
    }
  },
  {
    slug: "reality-changes",
    folder: "Reality-Changes",
    title: "Reality Changes",
    tagline: "A 2D pixel platformer in an unstable world where gravity flips constantly.",
    category: "Action",
    badge: "Glitch",
    featured: false,
    trending: false,
    rating: 4.7,
    plays: "61K",
    tags: ["Action", "Platformer", "Gravity", "Glitch", "Puzzle", "Pixel Art"],
    description: "An unstable reality simulator where the laws of physics decompose in real time. Platforms glitch into thin air, gravity fields invert without warning, and the destination portal relocates across temporal anomalies as you sprint to the finish.",
    controls: {
      movement: "A / D or Left / Right Arrows to Move",
      jump: "W, Up Arrow, or Spacebar to Jump",
      flip: "Down Arrow or S to trigger reality pulse",
      restart: "R to Restart Level",
      mobile: "On-screen virtual directional buttons"
    },
    paths: {
      game: "Reality-Changes/index.html",
      icon: "Reality-Changes/icon.jpg",
      banner: "Reality-Changes/banner.jpg",
      cover: "Reality-Changes/cover.jpg"
    }
  },
  {
    slug: "obsidian-chess",
    folder: "Obsidian-Chess",
    title: "Obsidian Chess",
    tagline: "Full FIDE rules HTML5 chess with alpha-beta AI and procedural audio.",
    category: "Puzzle",
    badge: "Strategy",
    featured: false,
    trending: false,
    rating: 4.9,
    plays: "135K",
    tags: ["Puzzle", "Strategy", "Chess", "Board", "AI", "FIDE Rules"],
    description: "An elegant, distraction-free digital chess experience engineered for grandmasters and novices alike. Features complete FIDE rules including en passant, castling, pawn promotion, an Alpha-Beta search AI with adjustable depth, move notation history, and procedural sound effects.",
    controls: {
      interact: "Click piece to view legal squares, then click target square",
      drag: "Drag and drop pieces directly onto board",
      undo: "Undo and Hint buttons available on sidebar HUD",
      mobile: "Tap piece to highlight moves, tap destination to play"
    },
    paths: {
      game: "Obsidian-Chess/index.html",
      icon: "Obsidian-Chess/icon.jpg",
      banner: "Obsidian-Chess/banner.jpg",
      cover: "Obsidian-Chess/cover.jpg"
    }
  },
  {
    slug: "connect-four",
    folder: "Connect-Four",
    title: "Connect Four",
    tagline: "Physics-animated 4-in-a-row with Alpha-Beta AI and 2-player mode.",
    category: "Puzzle",
    badge: "Classic",
    featured: false,
    trending: false,
    rating: 4.8,
    plays: "103K",
    tags: ["Puzzle", "Strategy", "Board", "Classic", "2-Player", "Casual"],
    description: "Drop colorful discs into a vertical grid and connect four of your color horizontally, vertically, or diagonally. Test your tactical foresight against a formidable Alpha-Beta minimax AI or play head-to-head with a friend in local multiplayer.",
    controls: {
      drop: "Click or tap any column header to drop a disc",
      mode: "Toggle between 1P (vs AI) and 2P (Local Pass & Play)",
      restart: "New Game button on toolbar",
      mobile: "Tap column directly on screen"
    },
    paths: {
      game: "Connect-Four/index.html",
      icon: "Connect-Four/icon.jpg",
      banner: "Connect-Four/banner.jpg",
      cover: "Connect-Four/cover.jpg"
    }
  },
  {
    slug: "neon-grid-tic-tac-toe",
    folder: "Neon-Grid-Tic-Tac-Toe",
    title: "Neon Grid Tic-Tac-Toe",
    tagline: "Cyberpunk neon Tic-Tac-Toe with unbeatable Minimax AI & Infinite Mode.",
    category: "Puzzle",
    badge: "Arcade",
    featured: false,
    trending: false,
    rating: 4.6,
    plays: "82K",
    tags: ["Puzzle", "Casual", "Neon", "Minimax", "Infinite Mode", "Retro"],
    description: "A neon-infused revival of the timeless grid duel. Challenge an mathematically unbeatable Minimax AI, challenge a friend, or engage in the chaotic 'Infinite 3-Piece' mode where your oldest mark disappears when placing your fourth piece.",
    controls: {
      place: "Click or tap any empty neon cell",
      difficulty: "Switch between Easy, Medium, and Unbeatable Minimax",
      mode: "Toggle Standard 3x3 or Infinite 3-Piece mode",
      mobile: "Tap cell directly"
    },
    paths: {
      game: "Neon-Grid-Tic-Tac-Toe/index.html",
      icon: "Neon-Grid-Tic-Tac-Toe/icon.jpg",
      banner: "Neon-Grid-Tic-Tac-Toe/banner.jpg",
      cover: "Neon-Grid-Tic-Tac-Toe/cover.jpg"
    }
  }
];

// Helper methods for registry access
const GamesRegistry = {
  getAll() {
    return GAMES_DATA;
  },
  getBySlug(slug) {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase().trim();
    return GAMES_DATA.find(g => g.slug.toLowerCase() === cleanSlug) || null;
  },
  getByCategory(category) {
    if (!category || category === "all") return GAMES_DATA;
    return GAMES_DATA.filter(g => g.category.toLowerCase() === category.toLowerCase());
  },
  getFeatured() {
    return GAMES_DATA.filter(g => g.featured);
  },
  getTrending() {
    return GAMES_DATA.filter(g => g.trending);
  },
  search(query) {
    if (!query) return GAMES_DATA;
    const q = query.toLowerCase().trim();
    return GAMES_DATA.filter(g => 
      g.title.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q) ||
      g.tagline.toLowerCase().includes(q) ||
      g.tags.some(t => t.toLowerCase().includes(q))
    );
  },
  getRelated(slug, limit = 6) {
    const current = this.getBySlug(slug);
    if (!current) return GAMES_DATA.slice(0, limit);
    return GAMES_DATA
      .filter(g => g.slug !== current.slug)
      .sort((a, b) => {
        const aMatches = a.tags.filter(t => current.tags.includes(t)).length + (a.category === current.category ? 2 : 0);
        const bMatches = b.tags.filter(t => current.tags.includes(t)).length + (b.category === current.category ? 2 : 0);
        return bMatches - aMatches;
      })
      .slice(0, limit);
  }
};

// Export to window for global browser usage
if (typeof window !== "undefined") {
  window.GAMES_DATA = GAMES_DATA;
  window.GamesRegistry = GamesRegistry;
}
