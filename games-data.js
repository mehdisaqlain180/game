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
    dailyMission: "Clear 3 deceptive trial chambers without hitting a fake floor.",
    tags: ["Action", "Platformer", "Rage", "Pixel Art", "Gravity", "Deceptive"],
    description: "Don't Trust The Floor is a deceptive, minimalist pixel-art rage platformer spanning 50 handcrafted trial chambers where every single tile is out to trick you. Designed for players who love precision platformers and clever trap design, each room looks simple at first glance—only to flip the rules the moment you commit to a jump. Floors vanish beneath your boots, solid ledges crumble without warning, hidden spike traps spring from clean corridors, and gravity itself can invert mid-leap to send you scrambling toward the ceiling.\n\nProgression across the 50 levels tests both memory and adaptability. Early rooms teach you to question safe-looking bridges, fake checkpoints, and suspiciously generous coin or gap placements. Later chambers layer multiple hazards together, forcing you to chain tight air-control adjustments, micro-hops, and bait-and-retreat maneuvers before committing to the exit door. Because deaths happen fast and often, pressing R on desktop or tapping the quick-restart control resets the room instantaneously with zero loading delay.\n\nWhether you are speedrunning cleared rooms or surviving a first blind playthrough, patience and observation are your sharpest tools. Watch for subtle visual cues, test suspicious ground by tapping the edge, and commit only once you have baited the trap. With responsive keyboard movement (A/D or Arrow keys and W/Up/Space to jump) alongside crisp on-screen mobile D-pad controls, Don't Trust The Floor plays smoothly on phones, laptops, and Chromebooks with zero downloads or sign-ups required.\n\nBuilt in lightweight HTML5 for instant launch right inside your browser, it is ideal for quick five-minute puzzle challenges or multi-hour rage completion runs. Switch into Theater or Fullscreen view whenever you want sharper sightlines on tight corridors, and track your personal rating, favorites, and daily streak locally across every return session.",
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
    dailyMission: "Thread through 15 neon laser corridors in a single unbroken run.",
    tags: ["Arcade", "Skill", "One Button", "Cyberpunk", "Rhythm", "High Score"],
    description: "Neon Wave Legends is a high-speed, one-button precision arcade runner set inside a glowing cyberpunk cavern packed with razor-sharp geometry and kinetic laser walls. Stripped down to a single responsive input, the game revolves around a razor-thin diagonal flight path: hold Spacebar, Left Click, or your touchscreen to angle upward, and release to dive sharply downward. Mastering that crisp oscillation turns narrow neon tunnels into an adrenaline-fueled rhythm flow state.\n\nEvery second inside the cavern pushes your reflexes further as corridors tighten, angled sawtooth ridges alternate rapidly, and moving laser barriers force tight micro-taps rather than long holds. Because your speed stays relentless, survival depends on reading upcoming obstacle silhouettes two or three beats ahead and keeping your wave centered whenever a corridor opens up. One mistimed hold sends your craft shattering in a flash of neon sparks, while pressing R or tapping again drops you straight back into a fresh attempt.\n\nBuilt for instant high-score chasing on both desktop and mobile browsers, Neon Wave Legends rewards steady cadence over frantic button mashing. Short, controlled taps let you skim flat along tight horizontal ceilings and floors, while smooth long releases carry you cleanly through steep drops. Whether you have two minutes between classes or want to lock in for a long personal-best marathon, Neon Wave Legends delivers pure zero-lag HTML5 arcade precision right in your browser with no downloads needed.\n\nSwitch into Theater or Fullscreen mode whenever you want edge-to-edge visibility across tight laser corridors and faster reaction margins. With zero login barriers, crisp high-contrast neon visuals, and consistent framerate performance across phones, tablets, school Chromebooks, and low-end laptops, every instant retry invites you to push just a few meters farther past your previous high-score record.",
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
    dailyMission: "Complete 4 single-button obstacle chambers using pure jump timing.",
    tags: ["Skill", "Action", "Rage", "Hardcore", "Minimalist", "One Button"],
    description: "One Button Hell is a brutal 50-level precision rage platformer stripped down to a single mechanic: timing your jump. With automatic forward momentum carrying your square runner relentlessly toward the exit, you have zero horizontal braking or backtracking controls. Every spinning sawblade, phantom spike cluster, crumbling bridge, and narrow ledge gap must be conquered using Spacebar, a mouse click, or a single tap anywhere on your screen.\n\nAcross 50 escalating obstacle chambers, the game transforms that solitary input into a surprisingly deep test of rhythm and spatial awareness. Early stages introduce clean single hops and double-ledge timing, while deeper levels demand frame-tight edge jumps, split-second landings between rotating blades, and rapid consecutive taps across collapsing platforms. Because velocity stays fixed, learning each level becomes a rewarding muscle-memory sequence where every failed attempt immediately teaches you the exact visual landmark for your next leap.\n\nInstant retries keep the momentum sharp—hit R or tap right after an impact to launch straight back to the start of the chamber with zero downtime. For tougher sections, try focusing slightly ahead of your runner rather than staring directly at its edges so your thumb or index finger reacts ahead of the hazard. Tuned for near-zero input latency on desktop keyboards, mice, Android phones, and iOS touchscreens, One Button Hell proves you only need one button to create an unforgettable browser skill gauntlet.\n\nIts minimalist single-input design also makes it one of the most accessible hardcore browser games to play one-handed on mobile portrait, landscape touch controls, or rotated fullscreen mode. No installations, accounts, or bulky downloads stand between you and conquering all 50 chambers—just pure timing, crisp geometry, and instant browser replayability whenever you want a quick skill challenge.",
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
    dailyMission: "Survive 60 seconds inside the accelerating hyperspace tunnel.",
    tags: ["Action", "3D", "Arcade", "Tunnel Dodger", "Speed", "Split-Screen"],
    description: "Prism Rush drops you headfirst into an infinite, kaleidoscopic 3D hyperspace tunnel where survival depends on split-second spatial rotation and nerve. Built in smooth WebGL, the corridor twists through shifting neon palettes as procedural kinetic pillars, rotating gates, and sudden floor gaps race toward your viewpoint at accelerating velocity. Instead of steering left and right across a flat plane, you rotate the entire cylindrical track around yourself to align clear lanes before impact.\n\nSolo runners can build massive survival streaks by chaining smooth rotational adjustments with well-timed hypersonic boosts and hops using W, Up Arrow, or Spacebar. As seconds tick upward, obstacle density rises and color transitions intensify, demanding calm peripheral vision rather than panic spinning. On top of the solo endless tunnel mode, Prism Rush includes local 2-player split-screen support on a single desktop keyboard—Player 1 steers with A, D, and W while Player 2 pilots with Left, Right, and Up Arrows in head-to-head survival duels.\n\nMobile and tablet players can swipe smoothly left and right or tilt to rotate the tunnel axis at 60 frames per second directly in the browser. For high-score runs, keep your camera aligned slightly ahead of incoming pillar clusters and use jumps sparingly to clear unavoidable low rings. With zero installs, instant WebGL rendering, and exhilarating tunnel speed, Prism Rush is built for quick reflex bursts and competitive couch sessions alike.\n\nExpanding the stage to Theater or Fullscreen mode deepens the first-person tunnel immersion while keeping touch swipes clean, responsive, and completely unobstructed. Whether you are chasing a sixty-second daily mission streak solo or challenging a friend side by side on one keyboard, bookmark Prism Rush whenever you crave pure 3D arcade speed with zero waiting.",
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
    dailyMission: "Infiltrate a neon stronghold and score 3 silent shadow takedowns.",
    tags: ["Action", "Skill", "Stealth", "Ninja", "Top-Down", "Cyberpunk"],
    description: "Stealth Ninja is a tactical top-down cyber-infiltration game where patience, shadow timing, and crisp dashes replace brute-force combat. Slipping through neon-lit security compounds, you guide a silent cyber-assassin past sweeping searchlight cones, patrolling armed sentries, and timed laser grids. Stepping into a guard's vision cone or tripping a security beam triggers lethal retaliation, rewarding players who study patrol loops carefully before making a single decisive move.\n\nYour toolkit blends close-quarters discipline with lethal mobility. Move fluidly with W, A, S, D on desktop or the virtual thumbstick on mobile, then trigger a lightning-fast Shadow Step Dash with Spacebar or Shift to phase cleanly across laser corridors or close distance before a sentry turns around. Approach unsuspecting guards from behind or the flank for silent Left Click takedowns, or aim ranged shurikens with E or Right Click to neutralize distant threats and open safe routes across crowded security rooms.\n\nSmart infiltrators conserve dashes for high-risk crossings and use walls and pillar shadows to break enemy sightlines between patrols. Whenever an infiltration plan goes sideways, pressing R resets the stage cleanly so you can refine your route in seconds. With responsive mobile touch pads for Dash and Throw alongside crisp mouse-and-keyboard precision, Stealth Ninja delivers tight top-down tactical action straight in your browser without downloads or logins.\n\nEach mission strikes a satisfying balance between methodical stealth planning and high-speed shadow execution, encouraging creative flanking routes as compound layouts grow tighter and guard sweeps overlap. Whether you aim for silent ghost runs without firing a single projectile or rapid shuriken clears across multi-room sectors, you can toggle Fullscreen mode and play seamlessly across desktops, school Chromebooks, and mobile touchscreens anytime.",
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
    dailyMission: "Clear 3 ricochet physics chambers using banked shots or barrels.",
    tags: ["Action", "Puzzle", "Shooter", "Physics", "Ragdoll", "Stickman"],
    description: "Stickman Bullet Warriors combines tactical ricochet puzzle shooting with explosive 2D ragdoll chaos across 25 handcrafted physics chambers. Armed with limited high-caliber rounds in each stage, you cannot simply spray bullets down a hallway—every shot is a geometry puzzle. Using the live trajectory laser guide, you line up bank angles off steel girders, wooden crates, and angled walls to reach fortified enemy stickman squads hiding safely behind cover.\n\nEach level introduces new environmental toys that turn smart aim into spectacular chain reactions. Shoot near red explosive barrels to clear multiple targets in one blast, sever overhead ropes to drop heavy iron anvils onto unsuspecting guards, and ricochet single rounds down tight zig-zag shafts to sweep an entire room with a single bullet. Watching defeated stickmen cartwheel through debris with exaggerated ragdoll physics gives every clever bank shot crisp arcade payoff.\n\nIf you waste ammunition or miss a tricky bounce, pressing R resets the chamber immediately so you can adjust your angle by a single degree and try again. Aim with your mouse cursor and Left Click on PC, or touch, drag the trajectory line, and release cleanly on mobile screens. To score top efficiency in later stages, inspect the whole room before firing your first round—look for chainable barrels and double-bank angles first, saving direct shots for isolated targets.\n\nBecause every chamber plays out at your own thinking pace without unfair timers, Stickman Bullet Warriors is equally great for relaxed logic puzzle sessions and creative trick-shot experimentation. Switch into Fullscreen mode for clearer laser sightlines across multi-wall bounces, and launch immediately in HTML5 across desktop and mobile browsers with zero downloads or sign-ups required.",
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
    dailyMission: "Clear 2 story sectors and collect a secret orb along the upper track.",
    tags: ["Arcade", "Action", "Gravity", "Runner", "Multiplayer", "Sci-Fi"],
    description: "Vector Flip is a high-speed, multi-axis gravity platform runner set across 12 handcrafted sci-fi story sectors, an endless survival track, and local competitive multiplayer for 1 to 4 players. Instead of jumping over hazards in traditional fashion, you invert gravity mid-stride to snap instantaneously between floor and ceiling tracks while weaving past laser gates, rotating saws, and low barriers at relentless forward velocity.\n\nAs you push deeper into the campaign, dynamic camera rotations tilt and reorient entire corridors, challenging your brain to adapt immediately to sideways and upside-down perspectives. Completionists can hunt down 7 hidden secret orbs tucked along daring upper-track routes, while endless mode lets speedrunners chase uninterrupted distance records as obstacle patterns escalate. Up to four friends can also share a single keyboard for chaotic local multiplayer races where one missed flip drops a runner behind.\n\nControls stay crisp and accessible on every device: tap Spacebar, Up Arrow, or Left Click to invert gravity, press Down Arrow or S to slide low beneath barriers, or tap the top and bottom halves of your mobile screen for instant flips and slides. For cleaner sector clears, time your gravity flips slightly early before reaching tall pillars so you settle onto the opposite track before the next slide barrier arrives. Vector Flip launches instantly in HTML5 with zero installs.\n\nWith rapid R-key restarts, glowing vector track contrast, and both solo mastery routes and shared-keyboard party battles, Vector Flip offers lasting replayability across phones, laptops, and Chromebooks. Open Theater or Fullscreen mode whenever you want wider forward visibility while hunting all seven secret orbs or racing friends side by side on one screen.",
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
    dailyMission: "Chain 5 apex grapple releases without touching a laser floor.",
    tags: ["Arcade", "Skill", "Grapple", "Physics", "Stickman", "Platformer"],
    description: "Swingline is a fast-paced 50-level physics platformer centered entirely on pendulum momentum and clean grapple releases. Controlling an agile stickman runner suspended above deadly laser floors and spike pits, you latch onto overhead anchor nodes by holding Spacebar, Left Click, or touching your screen. Once hooked, gravity swings your character downward and forward along a smooth circular arc—releasing at just the right moment launches you flying across wide chasms with conserved speed.\n\nAcross 50 progressive stages, Swingline expands its momentum playground with tighter anchor spacing, moving hazards, narrow laser windows, and bonus stars positioned along high-risk upper arcs. Collecting stars throughout your runs unlocks new stickman suits, giving skilled swingers extra style as they master faster, flatter trajectories. Unlike rigid jump platformers, Swingline rewards fluid flow: hooking early kills awkward vertical bounces, while releasing slightly past the bottom of your pendulum swing maximizes horizontal carry distance.\n\nIf a grapple goes wide or clips a laser barrier, tapping R on desktop or restarting on mobile returns you to the stage launchpad immediately. Beginners should practice short, rhythmic hooks rather than holding onto a single anchor past its apex, which swings you backward and drains forward momentum. Fully playable with one-finger touch controls on smartphones or a single mouse button on PC, Swingline delivers pure HTML5 grapple physics right in your browser.\n\nEvery stage finishes in seconds once you nail the swing rhythm, making it an easy favorite for quick coffee-break skill bursts or full 50-level star-hunting marathons. Switch to landscape Fullscreen mode on mobile for wider lookahead across upcoming anchor nodes, with zero downloads, zero logins, and instant local progress.",
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
    dailyMission: "Sculpt a hillside outpost or bridge using 3 distinct voxel block types.",
    tags: ["Arcade", "3D", "Sandbox", "Voxel", "Building", "Exploration"],
    description: "TerraVox 3D Sandbox is a lightweight, fully procedural WebGL voxel sandbox engine that puts open-ended 3D block mining and creative building directly inside your browser tab. Dropping you into rolling voxel terrain complete with hills, trees, and dynamic ambient lighting, TerraVox lets you explore freely, carve tunnels through stone and dirt, or construct custom towers, bridges, and fortresses block by block with zero downloads or external launchers.\n\nSwitching between Survival-style exploration and Creative building feels effortless. Click the canvas to lock your mouse pointer on desktop, walk with W, A, S, D, double-tap Spacebar to soar upward in flight mode, and swap between 9 distinct voxel block materials using number keys 1 through 9. Left Click breaks blocks cleanly out of the terrain, while Right Click places your selected block onto any adjacent face so you can frame walls, staircases, and floating sky platforms quickly.\n\nTouchscreen players get dedicated dual virtual sticks for smooth movement and camera look alongside responsive mine and build action pads. Whether you are testing geometric voxel pixel art, sketching a hillside outpost for today's challenge, or introducing younger players to creative 3D sandbox building on a Chromebook without installing heavy software, TerraVox 3D Sandbox runs smoothly right inside Chrome, Safari, and Edge.\n\nTry switching into Fullscreen or Theater mode for panoramic building views across valleys, cliff ridges, and custom voxel landmarks. With instant browser startup, smooth procedural terrain generation, crisp directional lighting, and intuitive controls tailored for both mouse-and-keyboard and touchscreens, TerraVox turns any device into a portable zero-install 3D block-building studio.",
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
    dailyMission: "Outsmart 3 decoy doors and uncover the real exit chamber.",
    tags: ["Action", "Platformer", "Puzzle", "Rage", "Brain Teaser", "Troll"],
    description: "The Fake Exit is a 40-level psychological rage puzzle-platformer where the glowing door at the end of the hall is almost never your friend. Combining crisp 2D platforming controls with clever environmental riddles, each chamber invites you to walk toward an inviting exit—only to spring counterfeit doors, hidden drop spikes, invisible ledges, or sudden gravity twists that turn standard platformer instincts against you.\n\nWhat separates The Fake Exit from pure trial-and-error games is how every chamber hides a solvable logical trick. Some stages require triggering switches out of order, hugging walls to uncover secret paths, reading misleading background hints backward, or ignoring an obvious fake exit altogether to find the real portal tucked somewhere unexpected. Across all 40 rooms, puzzles escalate from playful visual gags into multi-step brain teasers that reward keen observation alongside agile jumping.\n\nDesktop players run with A/D or Left/Right Arrows, jump with W, Up Arrow, or Spacebar, and snap straight back into action with R after any trap; mobile players get a crisp touch D-pad and Jump button tailored for quick restarts. Whenever a room seems impossible, pause for five seconds before touching the controls and inspect every corner, ceiling edge, and signpost—the real escape route is always hiding in plain sight.\n\nEach solved trick delivers a genuine 'aha' moment that makes The Fake Exit addictive solo or hilarious to pass back and forth with friends watching you fall for the next clever trap. Because every chamber resets cleanly in a split second, you never lose momentum while experimenting—launch directly in your HTML5 browser with zero downloads, zero ads in the stage, and no sign-ins required.",
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
    dailyMission: "Shift harmonic frequencies to clear 3 liminal corridor illusions.",
    tags: ["Skill", "3D", "Atmospheric", "Liminal", "Psychological", "First-Person"],
    description: "Threshold // Shift is a first-person Three.js psychological liminal runner and architectural illusion obstacle game paired with haunting, generative Web Audio soundscapes. Stepping into stark, surreal corridors that bend normal spatial geometry, you must navigate shifting hallways, read forced-perspective doorways, and outrun an encroaching void while keeping your composure as rooms fold and reassemble around you.\n\nUnlike conventional reflex runners that rely solely on jump timing, Threshold // Shift weaves perception mechanics directly into movement. Using W, A, S, D to move, Shift to sprint, and your mouse or touch look controls to inspect angles, you press E or Left Click to shift harmonic frequencies—instantly altering which phase of architectural barriers solidifies or fades away. Spotting how wall seams, light gradients, and audio tones respond to your frequency state is the key to threading impossible-looking corridors cleanly.\n\nEvery sequence emphasizes atmosphere and focused flow without cluttered HUD overlays. If a shifting wall catches you off guard or the void closes in, pressing R resets the sequence immediately so you can refine your sprint and frequency timing. Best experienced with sound effects enabled or headphones on, Threshold // Shift showcases how sleek 3D WebGL geometry and procedural browser audio can deliver memorable indie tension with zero downloads.\n\nOpen the viewport in Theater or Fullscreen mode on desktop or mobile to let the minimalist liminal architecture fill your screen cleanly without peripheral distractions. Players who enjoy atmospheric walking illusions, surreal perspective puzzles, and fast first-person navigation will find every corridor rewarding to dissect, loading in seconds directly inside any modern browser tab without logins.",
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
    dailyMission: "Bait hidden drop-spikes and finish 3 troll rooms with cool patience.",
    tags: ["Action", "Platformer", "Rage", "Troll", "Retro", "Trial & Error"],
    description: "Trust Issues is a minimalist retro troll platformer engineered to punish autopilot habits and reward sharp paranoia. Every crisp floor tile is a suspect, friendly arrows point straight toward spike pits, and standard platformer muscle memory becomes your biggest liability. Built around sharp trial-and-error chambers, the game delights in subverting expectations with falling ceilings, backward momentum zones, collapsing safe spots, invisible walls, and sudden gravity reversals.\n\nYet beneath the merciless pranks lies fair, deterministic level design. Traps trigger consistently at exact coordinates, meaning once you uncover a room's trick—whether baiting a hidden drop-spike from the ledge edge, tapping backward after crossing a fake trigger, or jumping early over a phantom gap—you can execute it cleanly every single run. Instant R-key or touch restarts eliminate frustrating downtime between attempts, turning impossible-looking rooms into brisk, laugh-out-loud victory moments.\n\nMove precisely using Arrow keys or W, A, S, D, jump with Up Arrow, W, or Spacebar, or switch seamlessly to the responsive mobile touch control pad on phones and tablets. Veteran troll-platformer players recommend inching onto unfamiliar blocks before committing a full sprint, watching ceiling seams closely, and never trusting a shortcut or coin trail that looks too generous. Trust Issues runs cleanly at full speed in any modern HTML5 browser with zero setup.\n\nWhether you enjoy speedrunning memorized chambers, counting how few deaths it takes to clear a gauntlet, or testing how many tricks you can spot blind on your first try, Trust Issues delivers sharp retro platforming personality with instant browser loading and zero login requirements.",
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
    dailyMission: "Stalk a herd across the plains and complete 2 successful hunts.",
    tags: ["Adventure", "3D", "Simulation", "Animal", "Survival", "Open World"],
    description: "Savannah Sovereign is an atmospheric low-poly 3D lion life simulator that lets you roam, hunt, and defend territory across a vibrant African wilderness directly in your browser. Taking control of a young sovereign prowling sunlit plains, watering holes, acacia groves, and rocky outcrops, you experience an open 3D ecosystem complete with dynamic day-night transitions, shifting seasonal weather, and reactive wildlife herds moving naturally across the terrain.\n\nSurvival requires patience and smart stamina management rather than blind chasing. Move and stalk quietly through tall grass using W, A, S, D, hold Shift to launch into a high-speed sprint when closing the gap, rotate your 3D camera with the mouse to track stray prey, and strike with Spacebar or Left Click to pounce at the decisive moment. Successful hunts keep your energy high and help grow your pride's strength while preparing you to fend off rival predators encroaching on your hunting grounds.\n\nMobile and tablet players enjoy full dual-analog virtual touch controls paired with dedicated Sprint and Strike buttons so every pursuit feels natural on touchscreens. For cleaner hunts, approach downwind or from elevated ridges, watch herd movement before burning sprint stamina, and time your final pounce once prey isolates from the pack. Built in lightweight WebGL, Savannah Sovereign loads quickly with zero downloads or accounts.\n\nSwitch into Theater or Fullscreen mode for sweeping golden-hour views across the savanna as rainstorms roll in, sunsets paint the horizon, and herds scatter across the plains. It offers a rare open-world 3D wildlife survival sandbox playable anytime straight in your web browser on desktop, Chromebook, or mobile.",
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
    dailyMission: "Use reality pulses to navigate 3 glitch-physics platform stages.",
    tags: ["Action", "Platformer", "Gravity", "Glitch", "Puzzle", "Pixel Art"],
    description: "Reality Changes is a 2D pixel platformer set inside an unstable simulation where the rules of physics decompose in real time. As you dash and leap across minimalist glitch-art chambers, solid platforms flicker into empty air, gravity fields flip without warning, and even the destination portal warps across temporal anomalies just as you reach out to finish the stage.\n\nTo survive this shifting world, you cannot just react passively—you actively manipulate space with the reality pulse mechanic. Alongside crisp horizontal movement (A/D or Left/Right Arrows) and responsive jumping (W, Up Arrow, or Spacebar), pressing Down Arrow or S triggers a reality pulse that stabilizes or phase-shifts glitching elements across the room. Learning when to pulse mid-air versus waiting safely on solid ground turns seemingly chaotic puzzle rooms into smooth, clever platforming routes.\n\nOn smartphones and tablets, intuitive virtual directional and pulse controls keep every glitch timing window sharp, while desktop speedrunners can tap R for instant chamber resets after any hazard. If a jump looks unreachable or a portal vanishes in front of you, try triggering a reality pulse right before leaping and pay close attention to flickering tile outlines and spatial cues. Reality Changes blends classic retro platforming precision with mind-bending puzzle mechanics in an instant zero-download browser build.\n\nEach chamber rewards calm experimentation, clean jump control, and sharp spatial memory, giving fans of deceptive puzzle platformers a fresh twist on gravity manipulation. Open Theater or Fullscreen mode for sharper visibility on subtle glitch outlines, and enjoy zero-lag HTML5 play inside Chrome, Safari, Edge, or Chromebook browsers without creating an account.",
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
    dailyMission: "Castle early and win a full FIDE match against the Alpha-Beta AI.",
    tags: ["Puzzle", "Strategy", "Chess", "Board", "AI", "FIDE Rules"],
    description: "Obsidian Chess delivers a sleek, distraction-free HTML5 chess board engineered with complete official FIDE rules and a deterministic Alpha-Beta search AI right in your browser. Whether you are sharpening endgame tactics over a morning break or testing opening theory against deeper search levels, the clean obsidian aesthetic keeps your full focus on piece coordination, king safety, and center control with zero ads cluttering the board.\n\nEvery classic chess rule is faithfully enforced, including kingside and queenside castling, en passant pawn captures, underpromotion and queen promotion, fifty-move and check/stalemate detection, and clean legal-move square highlighting. Click any piece to preview valid destinations or drag and drop pieces smoothly across the board, track every play through live move notation history, and use the built-in Undo and Hint controls on the sidebar whenever you want to review an alternate tactical line.\n\nProcedural Web Audio move and capture chimes make every check and exchange tactile on both desktop and mobile touchscreens. Tap a piece on your phone to reveal legal squares and tap the target square to play comfortably with one hand. Beginners can practice developing knights and bishops early and castling within the first ten moves, while seasoned club players can dial up AI depth for sharper tactical resistance—all with zero logins.\n\nThanks to instant local execution inside your browser with no server matchmaking queues, subscription walls, or aggressive timers forcing rushed blunders, Obsidian Chess works equally well for calm tactical study, casual daily games, and focused endgame practice on laptops, Chromebooks, tablets, and smartphones anywhere.",
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
    dailyMission: "Claim the center column and build a double-threat win vs. the AI.",
    tags: ["Puzzle", "Strategy", "Board", "Classic", "2-Player", "Casual"],
    description: "Connect Four brings the timeless vertical strategy duel to your browser with crisp physics-animated disc drops, a smart Alpha-Beta minimax AI opponent, and instant local 2-player pass-and-play mode. Each turn, players drop red or yellow tokens down a 7-column, 6-row grid, racing to align four matching discs horizontally, vertically, or diagonally while reading ahead to block their opponent's developing lines.\n\nWhile the rules take five seconds to learn, beating the AI requires genuine tactical foresight. Rather than dropping discs randomly along the outer edges, strong players fight immediately for the center column—which contributes to far more horizontal and diagonal four-in-a-row combinations—and build simultaneous double-threats (often called 7-traps) where your opponent can only block one winning slot on their turn. Watching odd-even row parity also lets you control critical endgame squares before the board fills up.\n\nPlaying is effortless across every screen: click or tap any column header on PC or mobile to drop a disc smoothly into place, switch anytime between 1P vs. AI and 2P Local Pass & Play modes, and tap New Game on the toolbar for instant rematches. With zero downloads, snappy drop physics, and clean visual clarity, Connect Four is ready for quick solo brain-training or friendly head-to-head rounds anywhere.\n\nSave it to your favorites shelf for instant two-player tabletop duels on a single phone, tablet, or laptop, or challenge yourself to master center-column setups and double-threat combinations across consecutive rematches against the tactical AI—no accounts, downloads, or waiting screens ever get in your way.",
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
    dailyMission: "Win a match in Infinite 3-Piece Mode without getting forked.",
    tags: ["Puzzle", "Casual", "Neon", "Minimax", "Infinite Mode", "Retro"],
    description: "Neon Grid Tic-Tac-Toe reimagines the classic 3x3 strategy duel with glowing cyberpunk visuals, three AI difficulty tiers including an unbeatable Minimax engine, local 2-player battles, and an inventive Infinite 3-Piece Mode that eliminates boring draws forever. Pick any empty neon cell with a single click or screen tap and outmaneuver your opponent across fast, satisfying rounds right inside your browser.\n\nIn Standard 3x3 mode, you can warm up on Easy, test pattern recognition on Medium, or try surviving against Unbeatable Minimax—a mathematically optimal algorithm that forces you to control center and corner forks just to hold a draw. When you want higher-stakes mind games, flip the switch to Infinite 3-Piece Mode: each player is limited to keeping at most three marks on the board at once. Placing your fourth piece automatically fades away your oldest mark, shifting the entire board dynamically and forcing you to track disappearing threats two moves ahead.\n\nBecause every round lasts under a minute and works cleanly with a single tap on phones or mouse clicks on laptops, Neon Grid Tic-Tac-Toe is ideal for instant pass-and-play duels with a friend or sharp solo logic warmups. Focus on grabbing center or opposing corners early in Infinite mode so fading pieces never leave your defense exposed.\n\nZero downloads, instant difficulty and mode switching, and crisp neon glow feedback make it effortless to jump straight into a quick match anytime on desktop, Chromebook, or mobile. Whether you are testing classic fork theory or mastering the rotating three-piece ruleset, every round starts instantaneously with zero logins required.",
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

const GENRE_METADATA = [
  {
    slug: "action",
    name: "Action",
    headline: "Free Browser Action & Rage Platformer Games",
    seoTitle: "Free Action Browser Games — Instant Play | Gravity Games",
    metaDescription: "Play 7 free HTML5 action and rage platformer games online with instant touch controls, physics shooters, and zero downloads on Gravity Games.",
    intro: "Test your reflexes across deceptive rage platformers, stealth infiltration missions, 3D reflex tunnels, and ricochet physics shooters built for zero-lag play.",
    ogImage: "Don't-Trust-The-Floor/cover.jpg",
    faqs: [
      {
        q: "Can I play these action browser games on mobile phones?",
        a: "Yes. Every action game on Gravity Games includes responsive touch controls or on-screen directional pads alongside fullscreen mode."
      },
      {
        q: "Do I need an account or download to save progress?",
        a: "No sign-up or download is needed. Your favorites, play streak, and personal ratings stay saved directly in your browser."
      },
      {
        q: "Which action games support quick-restart for speedruns?",
        a: "Rage platformers like Don't Trust The Floor, The Fake Exit, Trust Issues, and Reality Changes support instant single-key or single-tap restarts."
      }
    ]
  },
  {
    slug: "arcade",
    name: "Arcade",
    headline: "Free Browser Arcade, Physics & 3D Sandbox Games",
    seoTitle: "Free Arcade Browser Games — 3D & Physics | Gravity Games",
    metaDescription: "Play fast HTML5 arcade games, WebGL 3D voxel worlds, gravity runners, and grapple physics challenges directly in your browser with no downloads.",
    intro: "Chase high scores through neon wave caverns, multi-axis gravity runners, pendulum grapple stages, and procedural 3D voxel sandboxes.",
    ogImage: "Neon-Wave-Legends/cover.jpg",
    faqs: [
      {
        q: "Are the 3D arcade games playable without plugins?",
        a: "Yes. TerraVox 3D Sandbox and all WebGL arcade titles run natively inside modern desktop and mobile browsers using HTML5 and WebGL."
      },
      {
        q: "Which arcade games are best for quick 2-minute sessions?",
        a: "Neon Wave Legends and Swingline load in under two seconds and drop you straight into fast one-button or tap-and-release runs."
      },
      {
        q: "Can I play arcade titles in fullscreen on iOS and Android?",
        a: "Yes. Tap Play Fullscreen on any game stage to expand the viewport edge-to-edge with a quick Exit control."
      }
    ]
  },
  {
    slug: "puzzle",
    name: "Puzzle",
    headline: "Free Browser Puzzle, Chess & Strategy Board Games",
    seoTitle: "Free Puzzle & Chess Browser Games | Gravity Games",
    metaDescription: "Play free HTML5 puzzle and strategy games including full FIDE chess, Connect Four with Alpha-Beta AI, and Infinite Tic-Tac-Toe right in your browser.",
    intro: "Sharpen your tactical foresight against tuned Alpha-Beta chess and Connect Four engines or challenge a friend in local pass-and-play modes.",
    ogImage: "Obsidian-Chess/cover.jpg",
    faqs: [
      {
        q: "Does Obsidian Chess follow official FIDE rules?",
        a: "Yes. Obsidian Chess supports castling, en passant, pawn promotion, legal-move highlighting, move notation history, and an Alpha-Beta AI opponent."
      },
      {
        q: "Can two people play Connect Four or Tic-Tac-Toe on one device?",
        a: "Yes. Both Connect Four and Neon Grid Tic-Tac-Toe include local 2-player pass-and-play modes in addition to AI difficulty levels."
      },
      {
        q: "What makes Infinite 3-Piece Mode different in Tic-Tac-Toe?",
        a: "Each player can only keep three marks on the board at once, so placing a fourth mark removes your oldest piece and eliminates stale draws."
      }
    ]
  },
  {
    slug: "skill",
    name: "Skill",
    headline: "Free Browser Skill & One-Button Precision Games",
    seoTitle: "Free Skill & Precision Browser Games | Gravity Games",
    metaDescription: "Master frame-perfect one-button platformers and psychological 3D illusion runners online for free with instant browser controls on mobile and PC.",
    intro: "Built for pure timing and spatial awareness, these precision skill challenges strip away clutter so every jump, frequency shift, and reaction counts.",
    ogImage: "One-Button-Hell/cover.jpg",
    faqs: [
      {
        q: "How do one-button skill games work on touchscreens?",
        a: "In One Button Hell, forward movement is automatic so tapping anywhere on the screen executes your jump with minimal input latency."
      },
      {
        q: "What is Threshold // Shift?",
        a: "Threshold // Shift is a Three.js first-person liminal obstacle runner combining perspective illusions, harmonic frequency shifts, and procedural audio."
      },
      {
        q: "How are games ranked when sorting by Top Rated?",
        a: "Top Rated prioritizes games with the highest community scores and incorporates any personal 1-to-5 star ratings you save locally."
      }
    ]
  },
  {
    slug: "adventure",
    name: "Adventure",
    headline: "Free Browser Adventure & 3D Simulation Games",
    seoTitle: "Free Adventure & 3D Browser Games | Gravity Games",
    metaDescription: "Explore stylized 3D wilderness survival and open-world browser adventures with dynamic weather, hunting, and zero downloads on Gravity Games.",
    intro: "Step into open 3D environments featuring dynamic day-night cycles, territory defense, and reactive wildlife simulation directly in your browser.",
    ogImage: "Savannah-Sovereign/cover.jpg",
    faqs: [
      {
        q: "What can you do in Savannah Sovereign?",
        a: "You stalk grazing herds across an open low-poly savanna, manage stamina during hunts, defend territory, and grow your pride across dynamic weather cycles."
      },
      {
        q: "Does Savannah Sovereign work on touch devices?",
        a: "Yes. Dual analog touch controls with sprint and pounce action pads appear automatically on touchscreens."
      },
      {
        q: "Are there more 3D exploration games on Gravity Games?",
        a: "Yes. You can also explore voxel terrain in TerraVox 3D Sandbox or first-person liminal architecture in Threshold // Shift."
      }
    ]
  }
];

const TAG_METADATA = [
  {
    slug: "platformer",
    name: "Platformer",
    matchTags: ["Platformer"],
    headline: "Free Browser Platformer Games — Play Instantly",
    seoTitle: "Free Browser Platformer Games | Gravity Games",
    metaDescription: "Play 5 free HTML5 platformer games online including collapsing floors, grapple swings, fake exits, and glitch worlds with zero downloads.",
    intro: "Leap across deceptive traps, pendulum grapple arenas, and multi-axis pixel chambers built for crisp keyboard and touchscreen timing.",
    ogImage: "Don't-Trust-The-Floor/cover.jpg",
    faqs: [
      {
        q: "Are Gravity Games platformers playable on smartphones?",
        a: "Yes. Every browser platformer includes responsive on-screen touch controls or single-tap mechanics alongside fullscreen mode."
      },
      {
        q: "Which platformer is best for beginners?",
        a: "Swingline eases you in with smooth grapple momentum, while Don't Trust The Floor and The Fake Exit escalate into trickier precision rooms."
      }
    ]
  },
  {
    slug: "rage",
    name: "Rage",
    matchTags: ["Rage", "Hardcore"],
    headline: "Hardcore Browser Rage Games — Zero-Lag Trials",
    seoTitle: "Best Free Browser Rage Games | Gravity Games",
    metaDescription: "Test your nerves with 4 brutal HTML5 rage platformers featuring collapsing tiles, single-button gauntlets, and instant R-key restarts.",
    intro: "Deterministic trap rooms, zero-mercy obstacles, and instant restarts designed for speedrunners and patient perfectionists.",
    ogImage: "One-Button-Hell/cover.jpg",
    faqs: [
      {
        q: "Which rage game has the simplest controls?",
        a: "One Button Hell uses a single jump input—press Space, click, or tap anywhere on screen to survive all 50 levels."
      },
      {
        q: "How fast can I retry after a trap?",
        a: "Press R on desktop or tap the quick-restart control on touchscreens to reset any chamber instantaneously."
      }
    ]
  },
  {
    slug: "3d",
    name: "3D & WebGL",
    matchTags: ["3D", "WebGL", "First-Person"],
    headline: "Free 3D & WebGL Browser Games — No Download",
    seoTitle: "Free 3D & WebGL Browser Games | Gravity Games",
    metaDescription: "Play 4 native 3D WebGL browser games free online: hyperspace tunnel dodging, voxel crafting, lion survival, and liminal illusions.",
    intro: "Experience real-time Three.js and WebGL worlds running smoothly in Chrome, Safari, and Edge with zero installation.",
    ogImage: "Prism-Rush/cover.jpg",
    faqs: [
      {
        q: "Do 3D browser games work on phones without an app?",
        a: "Yes. WebGL games like Prism Rush, TerraVox 3D Sandbox, and Savannah Sovereign render natively in modern mobile browsers."
      },
      {
        q: "Can two people play Prism Rush 3D on one PC?",
        a: "Yes. Prism Rush includes a built-in 2-player local split-screen mode on desktop keyboards."
      }
    ]
  },
  {
    slug: "physics",
    name: "Physics",
    matchTags: ["Physics", "Grapple", "Ragdoll"],
    headline: "Free HTML5 Physics & Momentum Browser Games",
    seoTitle: "Free Physics Browser Games — Play Online | Gravity Games",
    metaDescription: "Master ricochet ballistics, pendulum grapple momentum, and ragdoll chaos in free HTML5 physics browser games on desktop and phone.",
    intro: "Aim bank shots around steel beams and conserve pendulum launch arcs across handcrafted physics stages.",
    ogImage: "stickman-bullet-warriors/cover.jpg",
    faqs: [
      {
        q: "Which physics game focuses on shooting puzzles?",
        a: "Stickman Bullet Warriors challenges you to clear 25 ragdoll stages using ricochet bank shots and explosive barrels."
      },
      {
        q: "How do pendulum physics work in Swingline?",
        a: "Hold to grapple an overhead anchor and release just after the bottom swing arc to launch forward at peak speed."
      }
    ]
  },
  {
    slug: "multiplayer",
    name: "Multiplayer",
    matchTags: ["Multiplayer", "2-Player", "Split-Screen"],
    headline: "Best Local 2-Player & Split-Screen Browser Games",
    seoTitle: "Free 2-Player Local Browser Games | Gravity Games",
    metaDescription: "Play free 2-player local multiplayer and pass-and-play browser games on one device: split-screen 3D racing, gravity runs, and Connect Four.",
    intro: "Share a single keyboard or pass one phone back and forth for instant local duels with zero matchmaking waits.",
    ogImage: "Connect-Four/cover.jpg",
    faqs: [
      {
        q: "Which games support 2 players on one phone?",
        a: "Connect Four and Neon Grid Tic-Tac-Toe feature dedicated local pass-and-play modes tailored for touchscreens."
      },
      {
        q: "Which games offer simultaneous split-screen on PC?",
        a: "Prism Rush supports 2-player split-screen, and Vector Flip supports up to 4 players sharing one keyboard."
      }
    ]
  },
  {
    slug: "one-button",
    name: "One Button",
    matchTags: ["One Button"],
    headline: "Top One-Button Browser Games for Phone & PC",
    seoTitle: "Free One-Button Browser Games | Gravity Games",
    metaDescription: "Play crisp one-button browser games built for single-tap mobile ergonomics and razor-sharp rhythm timing on Gravity Games.",
    intro: "Maximum precision from a single input—ideal for one-handed mobile sessions or pure focus on laptops.",
    ogImage: "Neon-Wave-Legends/cover.jpg",
    faqs: [
      {
        q: "How does Neon Wave Legends differ from One Button Hell?",
        a: "Neon Wave Legends uses hold-to-climb and release-to-dive wave flight, while One Button Hell uses discrete timed jumps across 50 chambers."
      }
    ]
  },
  {
    slug: "strategy",
    name: "Strategy & Board",
    matchTags: ["Strategy", "Chess", "Board", "Minimax"],
    headline: "Free Browser Chess & Strategy Board Games",
    seoTitle: "Free Chess & Strategy Browser Games | Gravity Games",
    metaDescription: "Play full FIDE Obsidian Chess, Alpha-Beta Connect Four, and unbeatable Minimax Tic-Tac-Toe free in your browser on mobile or desktop.",
    intro: "Train tactical calculation against deterministic Alpha-Beta and Minimax engines with zero paywalls or sign-ins.",
    ogImage: "Obsidian-Chess/cover.jpg",
    faqs: [
      {
        q: "Do I need an account to play Obsidian Chess?",
        a: "No. Launch Obsidian Chess directly for full FIDE rules, move history, and built-in hints with zero login required."
      }
    ]
  },
  {
    slug: "troll",
    name: "Troll & Deceptive",
    matchTags: ["Troll", "Deceptive"],
    headline: "Deceptive Troll Platformer Browser Games",
    seoTitle: "Free Troll Platformer Browser Games | Gravity Games",
    metaDescription: "Outsmart lying doors, misleading signposts, and vanishing floors across our trickiest HTML5 troll platformers on Gravity Games.",
    intro: "Expect traps behind helpful arrows, counterfeit exit doors, and vanishing floor tiles that test observation over autopilot.",
    ogImage: "the-fake-exit/cover.jpg",
    faqs: [
      {
        q: "Which troll game has the most levels?",
        a: "Don't Trust The Floor spans 50 chambers and The Fake Exit offers 40 deceptive riddle rooms."
      }
    ]
  },
  {
    slug: "gravity",
    name: "Gravity & Runner",
    matchTags: ["Gravity", "Runner", "Tunnel Dodger"],
    headline: "Gravity-Flip & High-Speed Runner Browser Games",
    seoTitle: "Gravity & Runner Browser Games | Gravity Games",
    metaDescription: "Invert gravity mid-flight, dodge twisting corridors, and outrun glitch anomalies in fast HTML5 runner games on Gravity Games.",
    intro: "Quick-reflex runners and unstable gravity worlds where flipping ceilings and floors keeps every second electric.",
    ogImage: "vector-flip/cover.jpg",
    faqs: [
      {
        q: "Which gravity game supports endless high-score runs?",
        a: "Vector Flip includes 12 story sectors, an endless survival track with 7 secret orbs, and 1–4 player local modes."
      }
    ]
  },
  {
    slug: "casual",
    name: "Casual & Creative",
    matchTags: ["Casual", "Classic", "Sandbox", "Voxel", "Stealth"],
    headline: "Casual, Sandbox & Stealth Browser Games",
    seoTitle: "Free Casual & Sandbox Browser Games | Gravity Games",
    metaDescription: "Relax or plan your next move with TerraVox 3D Voxel Sandbox, Stealth Ninja infiltration, Connect Four, and Infinite Tic-Tac-Toe.",
    intro: "Unwind with voxel world building, quick tactical matches, or methodical top-down stealth runs at your own pace.",
    ogImage: "terravox-3d-sandbox/cover.jpg",
    faqs: [
      {
        q: "Are there creative building games with no downloads?",
        a: "Yes. TerraVox 3D Sandbox runs native WebGL voxel mining and aerial building directly inside your browser tab."
      }
    ]
  }
];

function parsePlaysCount(playsStr) {
  if (typeof playsStr === "number") return playsStr;
  const raw = String(playsStr || "").trim().toUpperCase();
  if (!raw) return 0;
  const num = parseFloat(raw.replace(/[^0-9.]/g, "")) || 0;
  if (raw.endsWith("M")) return Math.round(num * 1000000);
  if (raw.endsWith("K")) return Math.round(num * 1000);
  return Math.round(num);
}

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
  getGenres() {
    return GENRE_METADATA;
  },
  getGenre(slug) {
    if (!slug) return null;
    const clean = String(slug).toLowerCase().trim();
    return GENRE_METADATA.find(g => g.slug === clean) || null;
  },
  getTags() {
    return TAG_METADATA;
  },
  getTag(slug) {
    if (!slug) return null;
    const clean = String(slug).toLowerCase().trim();
    return TAG_METADATA.find(t => t.slug === clean) || null;
  },
  getTagByLabel(label) {
    if (!label) return null;
    const lower = String(label).toLowerCase().trim();
    return TAG_METADATA.find(t =>
      t.slug === lower ||
      t.name.toLowerCase() === lower ||
      (t.matchTags || []).some(mt => mt.toLowerCase() === lower)
    ) || null;
  },
  getByTag(tagSlug) {
    const tagMeta = this.getTag(tagSlug);
    if (!tagMeta) return [];
    const matchSet = new Set((tagMeta.matchTags || []).map(t => t.toLowerCase()));
    return GAMES_DATA.filter(g => (g.tags || []).some(t => matchSet.has(String(t).toLowerCase())));
  },
  getFeatured() {
    return GAMES_DATA.filter(g => g.featured);
  },
  getTrending() {
    return GAMES_DATA.filter(g => g.trending);
  },
  parsePlays(playsStr) {
    return parsePlaysCount(playsStr);
  },
  sortGames(list, sortMode = "featured", personalRatings = {}) {
    const copy = Array.isArray(list) ? [...list] : [];
    const indexOrder = new Map(GAMES_DATA.map((g, i) => [g.slug, i]));
    if (sortMode === "rating") {
      return copy.sort((a, b) => {
        const aScore = personalRatings && personalRatings[a.slug] ? Number(personalRatings[a.slug]) : a.rating;
        const bScore = personalRatings && personalRatings[b.slug] ? Number(personalRatings[b.slug]) : b.rating;
        if (bScore !== aScore) return bScore - aScore;
        return parsePlaysCount(b.plays) - parsePlaysCount(a.plays);
      });
    }
    if (sortMode === "plays") {
      return copy.sort((a, b) => parsePlaysCount(b.plays) - parsePlaysCount(a.plays));
    }
    if (sortMode === "alpha") {
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    }
    return copy.sort((a, b) => (indexOrder.get(a.slug) ?? 999) - (indexOrder.get(b.slug) ?? 999));
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
  window.GENRE_METADATA = GENRE_METADATA;
  window.TAG_METADATA = TAG_METADATA;
  window.GamesRegistry = GamesRegistry;
}
