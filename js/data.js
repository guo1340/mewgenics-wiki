/* ============================================================
   Mewgenics Wiki — Data
   ------------------------------------------------------------
   All wiki content lives here. To add a cat / item / ability,
   just append a new object to the relevant array. Cross-links
   work via the `id` field — ids must match between objects.

   NOTE: Stats, names, and lore below are PLACEHOLDER content
   structured to match what a real wiki of this game would
   need. Replace with verified data as the game releases.
   ============================================================ */

window.WikiData = {

  /* ---------------------------------------------------------- */
  /*                          CATS                              */
  /* ---------------------------------------------------------- */
  cats: [
    {
      id: 'sir-whiskers',
      name: 'Sir Whiskers',
      emoji: '🐱',
      type: 'fire',
      rarity: 'common',
      sex: 'M',
      hp: 32, speed: 4,
      stats: { attack: 75, defense: 40, magic: 85, speed: 55, luck: 30 },
      traits: ['Pyromancer', 'Hot-Tempered'],
      genes: ['FF', 'Hh', 'Tt'],
      abilities: ['fireball', 'singe'],
      lore: 'A grumpy ginger tom with a knack for setting things on fire — including, occasionally, his own tail.',
      role: 'Magic damage opener; pairs well with Soak setters.'
    },
    {
      id: 'mittens',
      name: 'Mittens',
      emoji: '🐈',
      type: 'water',
      rarity: 'common',
      sex: 'F',
      hp: 28, speed: 5,
      stats: { attack: 35, defense: 50, magic: 70, speed: 70, luck: 45 },
      traits: ['Healer', 'Calm'],
      genes: ['ff', 'WW', 'tt'],
      abilities: ['heal-lick', 'soak'],
      lore: 'Calm and methodical. Mittens always knows which teammate is one hit from death.',
      role: 'Frontline healer; keeps high-HP cats stable through long fights.'
    },
    {
      id: 'box',
      name: 'Box',
      emoji: '🐈‍⬛',
      type: 'earth',
      rarity: 'common',
      sex: 'M',
      hp: 40, speed: 3,
      stats: { attack: 60, defense: 90, magic: 25, speed: 30, luck: 35 },
      traits: ['Tank', 'Stubborn'],
      genes: ['ff', 'EE', 'LL'],
      abilities: ['stone-skin', 'thump'],
      lore: 'Refuses to leave a cardboard box ever, anywhere. Surprisingly hard to kill while inside.',
      role: 'Tank. Hold a chokepoint and outlast bursty enemies.'
    },
    {
      id: 'phantom',
      name: 'Phantom',
      emoji: '🐈‍⬛',
      type: 'dark',
      rarity: 'uncommon',
      sex: 'F',
      hp: 22, speed: 6,
      stats: { attack: 80, defense: 25, magic: 60, speed: 95, luck: 50 },
      traits: ['Stealth', 'Nine-Lives'],
      genes: ['DD', 'mm', 'Ll'],
      abilities: ['shadow-step', 'curse-claw'],
      lore: 'You will not see Phantom coming. You will see a shape leave.',
      role: 'Assassin. Position behind targets; one-shot squishies.'
    },
    {
      id: 'goldie',
      name: 'Goldie',
      emoji: '🐱',
      type: 'fire',
      rarity: 'rare',
      sex: 'F',
      hp: 30, speed: 5,
      stats: { attack: 70, defense: 45, magic: 90, speed: 65, luck: 90 },
      traits: ['Lucky', 'Pyromancer'],
      genes: ['FF', 'LL', 'TT'],
      abilities: ['fireball', 'lucky-strike'],
      lore: 'Born with one gold whisker. The whisker drops loot when she crits.',
      role: 'Loot-focused glass cannon. Crit chains snowball runs.'
    },
    {
      id: 'biscuit',
      name: 'Biscuit',
      emoji: '🐈',
      type: 'light',
      rarity: 'uncommon',
      sex: 'F',
      hp: 26, speed: 5,
      stats: { attack: 30, defense: 55, magic: 80, speed: 70, luck: 60 },
      traits: ['Healer', 'Blessed'],
      genes: ['gg', 'BB', 'tt'],
      abilities: ['heal-lick', 'bless'],
      lore: 'Glows faintly in the dark. Old cats say she\'s touched by the Hearth Spirit.',
      role: 'Support healer with cleanse. Best in cursed biomes.'
    },
    {
      id: 'tornado',
      name: 'Tornado',
      emoji: '🐈',
      type: 'air',
      rarity: 'rare',
      sex: 'M',
      hp: 24, speed: 7,
      stats: { attack: 65, defense: 30, magic: 75, speed: 100, luck: 40 },
      traits: ['Swift', 'Restless'],
      genes: ['Aa', 'SS', 'tt'],
      abilities: ['gust', 'shadow-step'],
      lore: 'Cannot sit still. Has fallen off three different bookshelves in one combat round.',
      role: 'Fast skirmisher. Acts twice before slow enemies move.'
    },
    {
      id: 'mossback',
      name: 'Mossback',
      emoji: '🐈‍⬛',
      type: 'earth',
      rarity: 'uncommon',
      sex: 'M',
      hp: 38, speed: 3,
      stats: { attack: 55, defense: 80, magic: 50, speed: 35, luck: 30 },
      traits: ['Regrowth', 'Patient'],
      genes: ['Ee', 'GG', 'LL'],
      abilities: ['stone-skin', 'root-bind'],
      lore: 'Moss really does grow on him. He doesn\'t mind. He doesn\'t move enough to mind.',
      role: 'Sustain tank. Heals over time while rooted.'
    },
    {
      id: 'sprinkles',
      name: 'Sprinkles',
      emoji: '🐱',
      type: 'water',
      rarity: 'common',
      sex: 'F',
      hp: 25, speed: 5,
      stats: { attack: 45, defense: 40, magic: 65, speed: 75, luck: 55 },
      traits: ['Splash'],
      genes: ['ff', 'Ww', 'tt'],
      abilities: ['soak', 'heal-lick'],
      lore: 'Tracks tiny wet pawprints everywhere. Surprisingly stealthy despite this.',
      role: 'Utility caster. Sets up Soak for fire-type allies.'
    },
    {
      id: 'oracle',
      name: 'Oracle',
      emoji: '🐈',
      type: 'dark',
      rarity: 'epic',
      sex: 'F',
      hp: 28, speed: 4,
      stats: { attack: 50, defense: 40, magic: 95, speed: 60, luck: 75 },
      traits: ['Foresight', 'Cursed-Touch'],
      genes: ['DD', 'MM', 'Ll'],
      abilities: ['curse-claw', 'foresee'],
      lore: 'Stares at things that aren\'t there. Sometimes the things stare back.',
      role: 'Debuff caster. Foresee lets the team retry one missed action per fight.'
    },
    {
      id: 'rustback',
      name: 'Rustback',
      emoji: '🐈‍⬛',
      type: 'fire',
      rarity: 'epic',
      sex: 'M',
      hp: 35, speed: 4,
      stats: { attack: 90, defense: 65, magic: 70, speed: 50, luck: 35 },
      traits: ['Pyromancer', 'Battle-Scarred'],
      genes: ['FF', 'BB', 'Hh'],
      abilities: ['fireball', 'singe', 'thump'],
      lore: 'Old. Mean. Lost an ear to a Tree Husk and the Husk still talks about it.',
      role: 'Bruiser. Hybrid magic + melee threat.'
    },
    {
      id: 'midnight',
      name: 'Midnight Empress',
      emoji: '🐈‍⬛',
      type: 'dark',
      rarity: 'legendary',
      sex: 'F',
      hp: 42, speed: 6,
      stats: { attack: 85, defense: 60, magic: 100, speed: 85, luck: 70 },
      traits: ['Nine-Lives', 'Foresight', 'Cursed-Touch'],
      genes: ['DD', 'MM', 'NN'],
      abilities: ['shadow-step', 'curse-claw', 'foresee', 'death-mark'],
      lore: 'Whispered about in colony lore. No one alive has bred her. Some say she breeds you.',
      role: 'Endgame win-condition. Single cat clears entire encounters.'
    }
  ],

  /* ---------------------------------------------------------- */
  /*                       ABILITIES                            */
  /* ---------------------------------------------------------- */
  abilities: [
    {
      id: 'fireball',
      name: 'Fireball',
      type: 'fire',
      cost: 3, range: 3, damage: 8,
      effects: ['burn'],
      description: 'Hurl a ball of flame at a target tile. Applies Burn for 3 turns.',
      tip: 'Doubles damage against Soaked targets — pair with Mittens or Sprinkles.'
    },
    {
      id: 'singe',
      name: 'Singe',
      type: 'fire',
      cost: 1, range: 1, damage: 4,
      effects: ['burn'],
      description: 'Cheap melee attack. 50% chance to apply Burn.',
      tip: 'Filler ability for 1 AP turns.'
    },
    {
      id: 'heal-lick',
      name: 'Heal Lick',
      type: 'water',
      cost: 2, range: 1, damage: 0,
      effects: ['heal-10'],
      description: 'Restore 10 HP to a friendly cat.',
      tip: 'Cleanses Burn as a side effect.'
    },
    {
      id: 'soak',
      name: 'Soak',
      type: 'water',
      cost: 2, range: 4, damage: 2,
      effects: ['soak'],
      description: 'Drench a target tile. Targets there take +50% fire damage.',
      tip: 'Throw it on a cluster, then Fireball through it.'
    },
    {
      id: 'stone-skin',
      name: 'Stone Skin',
      type: 'earth',
      cost: 2, range: 0, damage: 0,
      effects: ['armor-5'],
      description: '+5 defense for 2 turns. Self-cast.',
      tip: 'Pop before drawing a boss\'s opening attack.'
    },
    {
      id: 'thump',
      name: 'Thump',
      type: 'physical',
      cost: 2, range: 1, damage: 9,
      effects: ['knockback-1'],
      description: 'Heavy melee strike. Pushes target 1 tile.',
      tip: 'Knock enemies into hazard tiles for bonus damage.'
    },
    {
      id: 'shadow-step',
      name: 'Shadow Step',
      type: 'dark',
      cost: 1, range: 4, damage: 0,
      effects: ['stealth-1'],
      description: 'Teleport to any tile within range. Stealthed for 1 turn.',
      tip: 'Best opener in the game. Reposition into flanks for free.'
    },
    {
      id: 'curse-claw',
      name: 'Curse Claw',
      type: 'dark',
      cost: 2, range: 1, damage: 5,
      effects: ['curse'],
      description: 'Melee strike that applies Curse for 3 turns.',
      tip: 'Cursed enemies receive 25% less healing — devastating against bosses.'
    },
    {
      id: 'lucky-strike',
      name: 'Lucky Strike',
      type: 'physical',
      cost: 2, range: 1, damage: 6,
      effects: ['crit-100'],
      description: 'Always crits. Damage scales with the user\'s Luck stat.',
      tip: 'Stack Lucky Bell and Cursed Idol for absurd numbers.'
    },
    {
      id: 'gust',
      name: 'Gust',
      type: 'air',
      cost: 2, range: 3, damage: 5,
      effects: ['knockback-2'],
      description: 'Cone attack. Pushes hit targets 2 tiles back.',
      tip: 'Off cliff edges = instant kill.'
    },
    {
      id: 'bless',
      name: 'Bless',
      type: 'light',
      cost: 2, range: 3, damage: 0,
      effects: ['cleanse', 'heal-5'],
      description: 'Removes one negative status from an ally and heals 5 HP.',
      tip: 'The only reliable Curse remover before Crypts.'
    },
    {
      id: 'root-bind',
      name: 'Root Bind',
      type: 'earth',
      cost: 3, range: 2, damage: 3,
      effects: ['root-2'],
      description: 'Roots the target for 2 turns. They cannot move.',
      tip: 'Lock down ranged enemies to safely close the distance.'
    },
    {
      id: 'foresee',
      name: 'Foresee',
      type: 'dark',
      cost: 4, range: 0, damage: 0,
      effects: ['foresee'],
      description: 'Once per fight, undo a missed attack from any ally.',
      tip: 'Save it for the boss\'s key turn.'
    },
    {
      id: 'death-mark',
      name: 'Death Mark',
      type: 'dark',
      cost: 4, range: 4, damage: 0,
      effects: ['marked'],
      description: 'Mark a target. The next attack on it deals double damage and ignores armor.',
      tip: 'Combo: Mark → Lucky Strike → uncapped damage.'
    },
    {
      id: 'tail-whip',
      name: 'Tail Whip',
      type: 'physical',
      cost: 1, range: 1, damage: 3,
      effects: [],
      description: 'Light melee strike. No effect, but cheap.',
      tip: 'Burn extra AP at the end of a turn so it isn\'t wasted.'
    }
  ],

  /* ---------------------------------------------------------- */
  /*                         ITEMS                              */
  /* ---------------------------------------------------------- */
  items: [
    {
      id: 'spiked-collar',
      name: 'Spiked Collar',
      slot: 'neck', rarity: 'common',
      effects: ['+3 attack'],
      description: 'A practical collar with sharp metal studs. Adds bite to a swipe.',
      drop: 'Backyard, Old Forest'
    },
    {
      id: 'lucky-bell',
      name: 'Lucky Bell',
      slot: 'neck', rarity: 'uncommon',
      effects: ['+10% crit chance', '+5 luck'],
      description: 'A tiny bell that rings just before something good happens.',
      drop: 'Treat chests'
    },
    {
      id: 'tuna-treat',
      name: 'Tuna Treat',
      slot: 'consumable', rarity: 'common',
      effects: ['+15 HP'],
      description: 'A reliable, oily snack. Cats love it. Floors don\'t.',
      drop: 'Common loot'
    },
    {
      id: 'catnip',
      name: 'Catnip',
      slot: 'consumable', rarity: 'uncommon',
      effects: ['+1 AP next turn', 'Random buff'],
      description: 'Effects vary. Always interesting.',
      drop: 'Old Forest, Garden'
    },
    {
      id: 'cursed-idol',
      name: 'Cursed Idol',
      slot: 'held', rarity: 'rare',
      effects: ['+5 magic', '-2 luck'],
      description: 'Cold to the touch. Hums when no one is looking.',
      drop: 'Sunken Crypt'
    },
    {
      id: 'mossy-cloak',
      name: 'Mossy Cloak',
      slot: 'body', rarity: 'uncommon',
      effects: ['+2 defense', 'Heal 1 HP per turn'],
      description: 'Smells like a damp basement. The smell is regrowth.',
      drop: 'Old Forest'
    },
    {
      id: 'silver-whisker',
      name: 'Silver Whisker',
      slot: 'held', rarity: 'epic',
      effects: ['+15% magic damage', '+1 ability range'],
      description: 'Plucked from a cat that no longer exists. Better not to ask.',
      drop: 'Boss reward'
    },
    {
      id: 'ember-charm',
      name: 'Ember Charm',
      slot: 'neck', rarity: 'rare',
      effects: ['+20% fire damage', 'Immune to Burn'],
      description: 'A tiny charm shaped like a flame. Warm even in winter.',
      drop: 'Ember Wastes'
    },
    {
      id: 'tide-charm',
      name: 'Tide Charm',
      slot: 'neck', rarity: 'rare',
      effects: ['+20% water damage', 'Immune to Soak'],
      description: 'Pearly. Pearly to the touch. Pearly to a fault.',
      drop: 'Lake Quests'
    },
    {
      id: 'gravekeeper-mask',
      name: 'Gravekeeper Mask',
      slot: 'head', rarity: 'epic',
      effects: ['+3 magic', 'Inflict Curse on melee hit'],
      description: 'Found buried with someone who wasn\'t buried.',
      drop: 'Sunken Crypt'
    },
    {
      id: 'feather-bow',
      name: 'Feather Bow',
      slot: 'neck', rarity: 'common',
      effects: ['+1 speed', '-1 attack'],
      description: 'Pretty. Mostly cosmetic. The speed bonus isn\'t.',
      drop: 'Common loot'
    },
    {
      id: 'iron-collar',
      name: 'Iron Collar',
      slot: 'neck', rarity: 'uncommon',
      effects: ['+5 defense', '-1 speed'],
      description: 'Heavy. Makes a dull clinking sound when the cat moves.',
      drop: 'Old Forest, Mines'
    },
    {
      id: 'salmon-supreme',
      name: 'Salmon Supreme',
      slot: 'consumable', rarity: 'rare',
      effects: ['Full HP heal', 'Cleanse all'],
      description: 'A whole salmon. Hand-prepared. Disappears in seconds.',
      drop: 'Rare drops, shops'
    },
    {
      id: 'phoenix-feather',
      name: 'Phoenix Feather',
      slot: 'held', rarity: 'legendary',
      effects: ['Revive once at 50% HP'],
      description: 'A feather that has already burned. Once.',
      drop: 'Ember Wastes — boss only'
    },
    {
      id: 'whisker-of-the-empress',
      name: 'Whisker of the Empress',
      slot: 'held', rarity: 'legendary',
      effects: ['+25% all damage', 'Death Mark on first hit'],
      description: 'Plucked under a black moon. Now it watches you.',
      drop: 'Defeat Midnight Empress'
    }
  ],

  /* ---------------------------------------------------------- */
  /*                        ENEMIES                             */
  /* ---------------------------------------------------------- */
  enemies: [
    {
      id: 'rat',
      name: 'Rat',
      type: 'physical',
      hp: 8, speed: 5,
      threat: 'low',
      attacks: ['Bite (3 dmg)'],
      drops: ['Rat Tail', 'Common Treat'],
      tactics: 'Swarms in 3+. Pick them off with cleave attacks. Dangerous in groups due to action economy.',
      locations: ['backyard', 'sunken-crypt']
    },
    {
      id: 'cursed-crow',
      name: 'Cursed Crow',
      type: 'dark',
      hp: 14, speed: 6,
      threat: 'medium',
      attacks: ['Peck (4 dmg, applies Curse)'],
      drops: ['Black Feather', 'Cursed Idol (rare)'],
      tactics: 'Flying — ignores rough terrain. Kill it before it Curses your healer.',
      locations: ['old-forest', 'sunken-crypt']
    },
    {
      id: 'fire-imp',
      name: 'Fire Imp',
      type: 'fire',
      hp: 20, speed: 4,
      threat: 'medium',
      attacks: ['Singe (5 dmg)', 'Self-Detonate at <5 HP (12 AoE dmg)'],
      drops: ['Ember', 'Ember Charm (rare)'],
      tactics: 'Do not bring it below 5 HP next to your team. Soak it first.',
      locations: ['ember-wastes']
    },
    {
      id: 'tree-husk',
      name: 'Tree Husk',
      type: 'earth',
      hp: 45, speed: 2,
      threat: 'high',
      attacks: ['Slam (8 dmg)', 'Root (applies Root)'],
      drops: ['Bark Plate', 'Mossy Cloak (rare)'],
      tactics: 'Slow but tanky. Burn it down literally — fire damage is its weakness.',
      locations: ['old-forest']
    },
    {
      id: 'ghost-cat',
      name: 'Ghost Cat',
      type: 'dark',
      hp: 18, speed: 6,
      threat: 'medium',
      attacks: ['Phase Strike (6 dmg, ignores armor)'],
      drops: ['Spectral Whisker', 'Gravekeeper Mask (rare)'],
      tactics: 'Phases through walls. Light damage breaks its phase shift.',
      locations: ['sunken-crypt']
    },
    {
      id: 'sand-wyrm',
      name: 'Sand Wyrm',
      type: 'earth',
      hp: 60, speed: 4,
      threat: 'high',
      attacks: ['Burrow', 'Eruption (10 AoE dmg)'],
      drops: ['Wyrm Scale', 'Silver Whisker (rare)'],
      tactics: 'Burrows then re-emerges. Track its tile telegraph and move before it surfaces.',
      locations: ['ember-wastes']
    },
    {
      id: 'moss-pup',
      name: 'Moss Pup',
      type: 'earth',
      hp: 12, speed: 4,
      threat: 'low',
      attacks: ['Tackle (3 dmg)'],
      drops: ['Moss Tuft'],
      tactics: 'Mostly harmless solo. Tutorial-tier.',
      locations: ['old-forest', 'backyard']
    },
    {
      id: 'crypt-king',
      name: 'Crypt King',
      type: 'dark',
      hp: 120, speed: 4,
      threat: 'boss',
      attacks: ['Mass Curse', 'Skeleton Summon (x2)', 'Soul Drain (8 dmg, heals self)'],
      drops: ['Whisker of the Empress (rare)', 'Phoenix Feather'],
      tactics: 'The healing is the problem. Apply Curse on him to halve his Soul Drain heal. Kill summons fast or be drowned in actions.',
      locations: ['sunken-crypt']
    }
  ],

  /* ---------------------------------------------------------- */
  /*                       LOCATIONS                            */
  /* ---------------------------------------------------------- */
  locations: [
    {
      id: 'backyard',
      name: 'Backyard',
      tier: 'tutorial',
      enemies: ['rat', 'moss-pup'],
      drops: ['Tuna Treat', 'Spiked Collar', 'Feather Bow'],
      description: 'The starting biome. Soft difficulty curve, intro encounters, low loot ceiling. Use it to learn AP economy and to grow new kittens before risking them deeper.',
      tips: 'Always finish a Backyard run before advancing — the trickle of common gear adds up across generations.'
    },
    {
      id: 'old-forest',
      name: 'Old Forest',
      tier: 'low',
      enemies: ['moss-pup', 'cursed-crow', 'tree-husk'],
      drops: ['Mossy Cloak', 'Iron Collar', 'Catnip'],
      description: 'Earth-typed biome. Damp, narrow corridors. Druid encounters can spawn rare seed items.',
      tips: 'Bring a Fire-affinity cat. Tree Husks delete teams without one.'
    },
    {
      id: 'sunken-crypt',
      name: 'Sunken Crypt',
      tier: 'mid',
      enemies: ['rat', 'cursed-crow', 'ghost-cat', 'crypt-king'],
      drops: ['Cursed Idol', 'Gravekeeper Mask', 'Whisker of the Empress'],
      description: 'Undead and curse-heavy. Bring cleansers (Bless) or you\'ll lose runs to stacked Curse debuffs.',
      tips: 'Boss: Crypt King. Bring sustained DPS, not burst — the boss heals from your damage if uncursed.'
    },
    {
      id: 'ember-wastes',
      name: 'Ember Wastes',
      tier: 'high',
      enemies: ['fire-imp', 'sand-wyrm'],
      drops: ['Ember Charm', 'Phoenix Feather', 'Salmon Supreme'],
      description: 'Endgame biome. High reward, brutal punishment for slow teams. Hazard tiles tick fire damage every turn.',
      tips: 'Speed comp only. Anything below 5 base speed gets killed before its first turn.'
    },
    {
      id: 'garden',
      name: 'Sunlit Garden',
      tier: 'low',
      enemies: ['moss-pup', 'rat'],
      drops: ['Catnip', 'Feather Bow'],
      description: 'A peaceful event biome. No bosses, lighter enemies, slightly inflated treat drops. Good for warming up new generations.',
      tips: 'If a kitten survives the Garden it has a higher chance of inheriting Lucky.'
    }
  ],

  /* ---------------------------------------------------------- */
  /*                     STATUS EFFECTS                         */
  /* ---------------------------------------------------------- */
  statuses: [
    { id: 'burn',     name: 'Burn',     type: 'fire',  duration: 3, source: 'Fire abilities',  effect: '2 damage per turn at end of turn.' },
    { id: 'soak',     name: 'Soak',     type: 'water', duration: 2, source: 'Water abilities', effect: 'Target takes +50% fire damage. Removes Burn on apply.' },
    { id: 'root',     name: 'Root',     type: 'earth', duration: 1, source: 'Earth abilities', effect: 'Target cannot move. Can still attack.' },
    { id: 'curse',    name: 'Curse',    type: 'dark',  duration: 3, source: 'Dark abilities',  effect: 'Healing received -25%. Stacks up to 3x.' },
    { id: 'stealth',  name: 'Stealth',  type: 'dark',  duration: 1, source: 'Shadow Step',     effect: 'Cannot be targeted by single-target attacks.' },
    { id: 'armor-5',  name: 'Stone Armor', type: 'earth', duration: 2, source: 'Stone Skin',  effect: '+5 defense.' },
    { id: 'marked',   name: 'Marked',   type: 'dark',  duration: 1, source: 'Death Mark',      effect: 'Next attack on this target deals double damage and ignores armor.' },
    { id: 'foresee',  name: 'Foresee',  type: 'dark',  duration: 999, source: 'Foresee', effect: 'Once per fight, undo a missed attack.' },
    { id: 'heal-10',  name: 'Healed',   type: 'water', duration: 0, source: 'Heal Lick',       effect: '+10 HP. Cleanses Burn.' },
    { id: 'cleanse',  name: 'Cleanse',  type: 'light', duration: 0, source: 'Bless',           effect: 'Removes one negative status effect.' }
  ],

  /* ---------------------------------------------------------- */
  /*                          GENES                             */
  /* ---------------------------------------------------------- */
  genes: [
    { id: 'F', name: 'Fire affinity (F)',  dominant: 'Fire affinity',  recessive: 'No affinity', effect: '+10% fire damage when FF (homozygous dominant). +5% when Ff.' },
    { id: 'W', name: 'Water affinity (W)', dominant: 'Water affinity', recessive: 'No affinity', effect: '+10% water damage when WW.' },
    { id: 'E', name: 'Earth affinity (E)', dominant: 'Earth affinity', recessive: 'No affinity', effect: '+5 HP when EE.' },
    { id: 'D', name: 'Dark affinity (D)',  dominant: 'Dark affinity',  recessive: 'No affinity', effect: 'Unlocks Curse abilities when DD. Reduced healing received.' },
    { id: 'L', name: 'Long-haired (L)',    dominant: 'Long-haired',    recessive: 'Short-haired', effect: '+1 defense when LL. Cosmetic when Ll.' },
    { id: 'T', name: 'Tabby pattern (T)',  dominant: 'Tabby',          recessive: 'Solid coat',   effect: 'Cosmetic. Used as breeding flag for some questlines.' },
    { id: 'M', name: 'Mutant (M)',         dominant: 'Mutant',         recessive: 'Normal',       effect: 'Random extra trait when MM. Effects vary wildly.' },
    { id: 'B', name: 'Battle-Scarred (B)', dominant: 'Battle-Scarred', recessive: 'Pristine',     effect: '+1 attack per scar when BB. Stacks with combat history.' },
    { id: 'S', name: 'Swift (S)',          dominant: 'Swift',          recessive: 'Steady',       effect: '+1 speed when SS.' },
    { id: 'N', name: 'Nine-Lives (N)',     dominant: 'Nine-Lives',     recessive: 'Normal',       effect: 'Survive a lethal blow once per fight when NN. Extremely rare.' }
  ],

  /* ---------------------------------------------------------- */
  /*                     STRATEGY GUIDES                        */
  /* ---------------------------------------------------------- */
  strategies: [
    {
      id: 'burn-stack',
      title: 'The Burn Stack',
      author: 'community',
      tags: ['fire', 'damage', 'beginner-friendly'],
      summary: 'Lean fire team that snowballs through low-mid biomes.',
      body: 'Lead with a Fire cat. Pair with a Water cat that can apply Soak before each Fireball. Equip Ember Charm + Spiked Collar. Open every fight with Soak → Fireball through the cluster. Targets stay Burned for 3 turns; you only need to throw 1-2 Fireballs to delete most encounters in Backyard / Old Forest.'
    },
    {
      id: 'shadow-flank',
      title: 'Shadow Flank',
      author: 'community',
      tags: ['dark', 'speed', 'high-skill'],
      summary: 'High-mobility assassination comp built around Shadow Step.',
      body: 'Two Dark or Air cats with Shadow Step. Open by teleporting both behind enemy ranged units. Take them out in one round before they can act. Best with Phantom + Tornado. Falls apart if you can\'t one-shot the back line — bring Lucky Bell to stabilize crit damage.'
    },
    {
      id: 'rooted-tank',
      title: 'The Wall',
      author: 'community',
      tags: ['earth', 'sustain', 'beginner-friendly'],
      summary: 'Slow but unkillable tank comp for grinding loot.',
      body: 'Box (or Mossback) up front, healer behind. Stone Skin every fight, Root Bind ranged enemies, win through attrition. Mossy Cloak passive heal stacks with healer, making it virtually impossible to lose to non-boss content. Slow, but very forgiving for new players.'
    },
    {
      id: 'mark-and-execute',
      title: 'Mark & Execute',
      author: 'community',
      tags: ['dark', 'burst', 'endgame'],
      summary: 'One-shot any boss in the game.',
      body: 'Requires Midnight Empress (or Oracle) + a high-Luck cat with Lucky Strike. Cast Death Mark, follow up with Lucky Strike. Damage doubles, ignores armor, scales with Luck. With Whisker of the Empress equipped, the math goes off a cliff. Crypt King falls in 2 turns.'
    }
  ],

  /* ---------------------------------------------------------- */
  /*                       PATCH NOTES                          */
  /* ---------------------------------------------------------- */
  patches: [
    {
      version: '0.7.1',
      date: '2026-04-22',
      changes: [
        'Added new biome: Sunlit Garden (low-tier event biome).',
        'Rebalanced Fireball: damage 10 → 8, but burn duration 2 → 3 turns.',
        'Phoenix Feather no longer revives at 100% HP. Now 50%.',
        'Fixed bug: kittens could inherit zero-stat genes when both parents had MM.',
        'Crypt King mass-curse now respects ally cleanse cooldowns.'
      ]
    },
    {
      version: '0.7.0',
      date: '2026-03-15',
      changes: [
        'Major: Genetics overhaul. Recessive expression rates increased.',
        'New cat: Midnight Empress (legendary, post-Crypt unlock).',
        'New ability: Death Mark.',
        'Old Forest: increased Mossy Cloak drop rate.',
        'Reduced Catnip random-buff variance (was too swingy).'
      ]
    },
    {
      version: '0.6.4',
      date: '2026-02-08',
      changes: [
        'Added Salmon Supreme (rare consumable).',
        'Soak no longer overwrites Burn — both can stack now.',
        'Tree Husk Slam telegraph 1 turn earlier.',
        'Various typo fixes in cat lore.'
      ]
    }
  ],

  /* ---------------------------------------------------------- */
  /*                        STATIC PAGES                        */
  /* ---------------------------------------------------------- */
  pages: {
    'getting-started': {
      title: 'Getting Started',
      body: `
        <p>Mewgenics blends turn-based tactical combat with a cat-breeding sim. You'll spend runs gathering treats, fighting on grid-based maps, and bringing surviving cats home to breed the next generation.</p>
        <h3>The basic loop</h3>
        <ol>
          <li>Pick a starting cat from your colony.</li>
          <li>Take it on a quest — a series of grid-based encounters.</li>
          <li>Loot treats and equipment along the way.</li>
          <li>Bring it home. Breed it. Repeat with a stronger litter.</li>
        </ol>
        <div class="callout">Death is permanent for individual cats — but their genes live on through their offspring. Plan the bloodline, not the cat.</div>
        <h3>First-run tips</h3>
        <ul>
          <li>Don't bring your only fertile cat into a high-tier biome.</li>
          <li>Always finish the Backyard before risking the Old Forest.</li>
          <li>Save catnip for boss fights — the random buff can swing the encounter.</li>
        </ul>
      `
    },
    'genetics': {
      title: 'Genetics',
      body: `
        <p>Cats inherit gene pairs from their parents. Capital letters are dominant, lowercase recessive. Stack the right pair and you get rare expressions — sometimes desirable, sometimes catastrophic.</p>
        <p>Each kitten rolls one allele from each parent for every gene slot, with a small chance of mutation. See <a href="#/breeding">Breeding</a> for full mechanics.</p>
        <h3>Reading a genotype</h3>
        <p>A cat with genes <code>FF Ll Tt</code> is homozygous dominant for Fire affinity, heterozygous for Long-hair, and heterozygous for Tabby. Homozygous dominant always expresses the strongest version of the trait.</p>
        <div class="callout tip">Recessive expressions only show when both alleles are lowercase. Want a rare trait? Inbreed carefully — at the cost of mutation risk.</div>
      `
    },
    'breeding': {
      title: 'Breeding',
      body: `
        <p>Pair two cats at the breeding bed to produce a litter. Each kitten rolls one allele from each parent for every gene slot, with a small chance of mutation.</p>
        <h3>Requirements</h3>
        <ol>
          <li>Both cats must be adults (not kittens).</li>
          <li>Different sexes (M + F).</li>
          <li>Both must be alive at home base — cats lost on quests can't be paired.</li>
        </ol>
        <h3>Inheritance</h3>
        <ul>
          <li>Each gene slot: 50% chance to inherit from each parent.</li>
          <li>Mutation chance: ~3% per slot. Mutations can introduce new alleles.</li>
          <li>Litter size: 1–4 kittens, weighted by parent stats and items.</li>
        </ul>
        <div class="callout warn">Inbreeding (siblings, parent-child) increases mutation rate but also increases the chance of negative traits surfacing.</div>
      `
    },
    'combat': {
      title: 'Combat',
      body: `
        <p>Combat is turn-based on a square grid. Each cat has Action Points (AP) per turn, spent on movement or abilities. Positioning, status effects, and elemental matchups decide most fights.</p>
        <h3>Turn order</h3>
        <p>Order is decided by <strong>Speed</strong>. Ties broken by initiative roll. Status effects tick at the end of each cat's turn.</p>
        <h3>Damage type matchups</h3>
        <table class="data">
          <thead><tr><th>Type</th><th>Strong vs.</th><th>Weak vs.</th><th>Status applied</th></tr></thead>
          <tbody>
            <tr><td><span class="tag fire">Fire</span></td><td>Earth</td><td>Water</td><td>Burn</td></tr>
            <tr><td><span class="tag water">Water</span></td><td>Fire</td><td>Earth</td><td>Soak</td></tr>
            <tr><td><span class="tag earth">Earth</span></td><td>Water</td><td>Fire</td><td>Root</td></tr>
            <tr><td><span class="tag dark">Dark</span></td><td>Light</td><td>Light</td><td>Curse</td></tr>
            <tr><td><span class="tag light">Light</span></td><td>Dark</td><td>Dark</td><td>Cleanse</td></tr>
            <tr><td><span class="tag air">Air</span></td><td>—</td><td>—</td><td>Knockback</td></tr>
          </tbody>
        </table>
        <h3>AP costs</h3>
        <ul>
          <li>Move: 1 AP per tile (varies with terrain).</li>
          <li>Abilities: see ability cost on <a href="#/abilities">Abilities</a>.</li>
          <li>Default AP per turn: 4 (modified by speed and items).</li>
        </ul>
      `
    }
  }
};
