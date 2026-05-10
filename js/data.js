/* ============================================================
   Mewgenics Wiki — Data
   ------------------------------------------------------------
   All wiki content lives here. To add a cat / item / ability,
   just append a new object to the relevant array. Cross-links
   work via the `id` field — ids must match between objects.

   Research-first wiki content. Entries marked as strategic notes
   summarize public gameplay information and community guide patterns;
   exact values should be updated as patches and datamining improve.
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
  /*                         CLASSES                            */
  /* ---------------------------------------------------------- */
  classes: [
    { id: 'fighter', name: 'Fighter', role: 'Frontline damage', difficulty: 'Beginner', coreStats: ['Strength', 'Health'], summary: 'Reliable melee class for early runs. Fighters want survivability, knockback tools, and simple high-value attacks.', tips: ['Use Fighters to learn positioning and enemy targeting.', 'Pair with Tank or Druid support when pushing unfamiliar routes.', 'Prioritize mutations that add damage without crippling health.'] },
    { id: 'tank', name: 'Tank', role: 'Frontline control', difficulty: 'Beginner', coreStats: ['Health', 'Defense'], summary: 'Slow, durable class that protects fragile cats and forces enemies into bad positions.', tips: ['Body-block chokepoints and use shove/taunt effects to control lanes.', 'High HP matters because injuries can create long-term bloodline problems.', 'Tank bloodlines benefit from defensive mutations and low-risk disorders.'] },
    { id: 'hunter', name: 'Hunter', role: 'Ranged physical damage', difficulty: 'Intermediate', coreStats: ['Dexterity', 'Speed'], summary: 'Ranged class that rewards line-of-sight planning, high ground, and safe target priority.', tips: ['Remove ranged enemies first before they stack status effects.', 'Long-tail and range-oriented traits are valuable.', 'Hunters are good carriers for utility passives because they can stay safe.'] },
    { id: 'mage', name: 'Mage', role: 'Elemental burst and utility', difficulty: 'Intermediate', coreStats: ['Intelligence', 'Mana'], summary: 'Spell-focused class with huge upside when paired with inherited skills, mana support, and status combos.', tips: ['Wet into lightning/ice-style interactions and fire into clustered enemies are common tactical patterns.', 'Protect Mages from early injuries; they often snowball later.', 'Forbidden or reroll-style spell mutations can define a bloodline.'] },
    { id: 'thief', name: 'Thief', role: 'Mobility and loot pressure', difficulty: 'Advanced', coreStats: ['Speed', 'Luck'], summary: 'Fast utility class that benefits from first-turn tempo, crits, and item economy.', tips: ['Speed lets Thieves finish fragile threats before they act.', 'Do not overinvest in damage at the cost of survival.', 'Great candidate for first-turn or extra-action mutations.'] },
    { id: 'druid', name: 'Druid', role: 'Summons, buffs, and sustain', difficulty: 'Advanced', coreStats: ['Intelligence', 'Health'], summary: 'Support class that can stabilize dangerous fights through summons, healing-style effects, and long-form value.', tips: ['Strong in longer maps where attrition matters.', 'Self-buffs plus risky link-style mutations can backfire if copied onto enemies.', 'Keep one Druid line as a utility breeder if you find rare support passives.'] }
  ],

  /* ---------------------------------------------------------- */
  /*                        MUTATIONS                           */
  /* ---------------------------------------------------------- */
  mutations: [
    { id: 'extra-paw', name: 'Extra Paw', part: 'Arm', polarity: 'positive', effect: 'Can add action economy or utility depending on roll.', notes: 'Extra-action effects are among the strongest mutation outcomes for tempo builds.' },
    { id: 'ram-horns', name: 'Ram Horns', part: 'Head', polarity: 'mixed', effect: '+physical pressure; may trade away a defensive stat.', notes: 'Best on Fighters/Tanks that already want to collide with enemies.' },
    { id: 'deer-horns', name: 'Deer Horns', part: 'Head', polarity: 'mixed', effect: 'Usually stat-positive with a visible head mutation.', notes: 'Useful breeding target if the penalty does not hit the cat’s class stat.' },
    { id: 'rat-tail', name: 'Rat Tail', part: 'Tail', polarity: 'mixed', effect: 'Tail mutation with stat tradeoff and possible utility interactions.', notes: 'Tail slot matters because some tail effects compete with range/carry/knockback style builds.' },
    { id: 'turtle-tail', name: 'Turtle Tail / Turtle Part', part: 'Tail', polarity: 'defensive', effect: 'Leans defensive; may reduce speed or mobility.', notes: 'Good on slow tanks, bad on fragile speed classes.' },
    { id: 'thorns', name: 'Thorns', part: 'Body', polarity: 'positive', effect: 'Punishes melee attackers or adds retaliation-style value.', notes: 'Very strong on cats designed to be hit.' },
    { id: 'exposed-brain', name: 'Exposed Brain', part: 'Head', polarity: 'high-value', effect: 'Community reports describe intelligence scaling after fights.', notes: 'Premium Mage/Druid breeding target if you can manage the downside.' },
    { id: 'mouth-reroll', name: 'Mouth Skill Reroll', part: 'Mouth', polarity: 'utility', effect: 'Can reroll or manipulate skill outcomes depending on exact mutation.', notes: 'Valuable for bloodline curation because skill inheritance is a major power source.' },
    { id: 'cursed-item-tail', name: 'Cursed Item Removal Tail', part: 'Tail', polarity: 'utility', effect: 'Can help deal with cursed item problems.', notes: 'Not raw damage, but can save runs and protect rare equipment lines.' },
    { id: 'one-eye', name: 'Cyclops / One Eye', part: 'Eye', polarity: 'mixed', effect: 'Single-eye mutation with stat and defect interactions.', notes: 'Patch 1.1 changed how one-eye/one-ear/one-eyebrow heads interact with missing-part defects.' }
  ],

  /* ---------------------------------------------------------- */
  /*                         BIOMES                             */
  /* ---------------------------------------------------------- */
  biomes: [
    { id: 'alley', name: 'Alley', tier: 'early', hazards: ['basic terrain', 'low enemy density'], plan: 'Best place to stabilize new cats and learn movement/targeting. Prioritize safe kills over greed.' },
    { id: 'sewer', name: 'Sewer', tier: 'early-mid', hazards: ['water tiles', 'status chains'], plan: 'Expect wet/poison-style interactions. Bring cleanse or ranged damage so you do not fight inside hazards.' },
    { id: 'graveyard', name: 'Graveyard', tier: 'mid', hazards: ['curse pressure', 'undead enemies'], plan: 'Bring sustain, cleanse, and burst for priority casters. Avoid long fights if your healer gets cursed.' },
    { id: 'caves', name: 'Caves', tier: 'mid', hazards: ['chokepoints', 'line-of-sight blockers'], plan: 'Tanks and knockback effects shine. Ranged cats need careful positioning.' },
    { id: 'junkyard', name: 'Junkyard', tier: 'mid-late', hazards: ['metal clutter', 'environmental objects'], plan: 'Use objects and knockback to create damage. Do not let fragile cats get boxed in.' },
    { id: 'desert', name: 'Desert', tier: 'late', hazards: ['open lanes', 'high punishment for slow cats'], plan: 'Speed and range matter. Enter with a developed bloodline rather than fresh kittens.' },
    { id: 'crypts', name: 'Crypts', tier: 'late', hazards: ['heavy curses', 'durable enemies'], plan: 'Cleanse and anti-boss damage are mandatory. Preserve rare cats by retreating from doomed fights.' }
  ],

  /* ---------------------------------------------------------- */
  /*                       PATCH NOTES                          */
  /* ---------------------------------------------------------- */
  patches: [
    {
      version: 'Beta Update 1.1',
      date: '2026-04-29',
      changes: [
        'Breeding update: the Mutation home stat no longer rerolls existing mutations or birth defects.',
        'Mutation stat behavior changed: simple +2/-1 mutations roll first; higher Mutation increases the chance for effect-based mutations.',
        'One-eye, one-ear, and one-eyebrow heads no longer incorrectly count as missing-part birth defects for the matching slot.',
        'Voice inheritance chance reduced from 98% to 75%.',
        'Class and breeding balance changes should be reviewed before following older meta guides.'
      ]
    },
    {
      version: 'Launch / Early Access baseline',
      date: '2026-02-10',
      changes: [
        'Mewgenics released on Steam for Windows as a tactical roguelike life-sim about breeding and adventuring with cats.',
        'Core loop: send cats into tactical grid battles, bring survivors home, pass down skills/mutations/quirks, and build stronger bloodlines.',
        'Official feature count advertises 1000+ abilities, 900+ items, many mutations, and extensive environmental interactions.'
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
        <p>Mewgenics is a tactical roguelike life-sim built around two connected halves: turn-based grid combat and long-term cat breeding. A single run matters, but the bloodline matters more.</p>
        <h3>The core loop</h3>
        <ol>
          <li>Choose a team of cats with classes, stats, skills, equipment, quirks, and mutations.</li>
          <li>Fight through procedurally generated tactical encounters.</li>
          <li>Bring survivors home with experience, scars, items, and new breeding value.</li>
          <li>Breed stronger kittens by passing down stats, skills, mutations, and useful traits.</li>
          <li>Use furniture and room planning to influence breeding outcomes.</li>
        </ol>
        <div class="callout">The important mindset: do not only protect the current run. Protect the future breeding pool.</div>
        <h3>Early priorities</h3>
        <ul>
          <li>Keep at least one strong breeder safe at home instead of risking every good cat.</li>
          <li>Do not ignore disorders, injuries, or bad inherited traits. They can poison later generations.</li>
          <li>Learn status effects early; many losses come from chain reactions rather than raw enemy damage.</li>
          <li>Use simple classes first: Fighter, Tank, Hunter, and Mage are easier to understand than advanced synergy builds.</li>
          <li>Document good parents. A cat with strong stats and useful inherited skills can be more valuable than a single strong fighter.</li>
        </ul>
      `
    },
    'genetics': {
      title: 'Genetics',
      body: `
        <p>Genetics in Mewgenics is about inheritance across generations. Public breeding notes and community testing suggest that kittens inherit stats, spells/skills, passives, disorders, voices, and mutations through multiple layered rolls rather than one simple “copy parent” rule.</p>
        <h3>What can pass down?</h3>
        <ul>
          <li><strong>Stats:</strong> each stat can favor one parent, with stimulation improving the chance of inheriting the better value.</li>
          <li><strong>Skills/spells:</strong> skill inheritance is one of the biggest reasons to breed deliberately.</li>
          <li><strong>Mutations:</strong> many mutations are inheritable and can define a bloodline.</li>
          <li><strong>Disorders and defects:</strong> bad traits can also persist, especially with inbreeding or poor bloodline control.</li>
          <li><strong>Cosmetic/body traits:</strong> body-part mutations and voices can persist across generations.</li>
        </ul>
        <div class="callout tip">Stimulation is useful, but community formula notes suggest it is not magic by itself. Good parents, good rooms, and clean bloodline management still matter.</div>
        <h3>Practical rule</h3>
        <p>Breed for a purpose. Decide whether the cat is a combat carry, a breeder, a mutation project, or disposable exploration stock. Keeping every mediocre cat makes the house worse over time.</p>
      `
    },
    'breeding': {
      title: 'Breeding',
      body: `
        <p>Breeding is the long-term progression system. Surviving cats eventually feed the next generation, and good breeding decisions can matter more than one lucky combat run.</p>
        <h3>Breeding goals</h3>
        <ul>
          <li><strong>Stat lines:</strong> preserve high values in the stats that matter for the class.</li>
          <li><strong>Skill inheritance:</strong> pass down rare or build-defining skills and passives.</li>
          <li><strong>Mutation curation:</strong> keep positive mutations and remove or isolate harmful ones.</li>
          <li><strong>Disorder control:</strong> do not let severe disorders become normal in the bloodline.</li>
          <li><strong>Room planning:</strong> furniture and home stats influence outcomes, especially mutation-heavy breeding.</li>
        </ul>
        <h3>Community breeding pattern</h3>
        <ol>
          <li>Use safe runs to identify cats with strong stats or rare skills.</li>
          <li>Keep the best parents at home instead of risking them immediately.</li>
          <li>Create a main breeding room for clean, high-quality lines.</li>
          <li>Create a mutation/testing room for risky red mutations, disorders, or experimental cats.</li>
          <li>Only merge a cat back into the main line if it improves the bloodline.</li>
        </ol>
        <div class="callout warn">Inbreeding can concentrate good traits, but it also increases the chance of birth defects and inherited problems. Use it deliberately, not randomly.</div>
      `
    },
    'combat': {
      title: 'Combat',
      body: `
        <p>Combat is turn-based and grid-based. Cats and enemies use movement, active skills, passive effects, terrain, objects, weather, and status effects to create tactical chain reactions.</p>
        <h3>Combat priorities</h3>
        <ul>
          <li><strong>Action economy:</strong> extra turns, first-turn effects, summons, and disables are extremely valuable.</li>
          <li><strong>Positioning:</strong> chokepoints, line of sight, knockback, and hazards often matter more than raw damage.</li>
          <li><strong>Status control:</strong> Burn, Wet, Frozen, Bleed, Curse, Charm, Madness, Root, and Stun can swing fights.</li>
          <li><strong>Protect carries:</strong> injuries can damage the long-term breeding plan, not just the current run.</li>
        </ul>
        <h3>Beginner combat plan</h3>
        <ol>
          <li>Kill enemy status casters and ranged units first.</li>
          <li>Do not spend all movement walking into unknown threats.</li>
          <li>Use tanks to block lanes, not to chase enemies across the map.</li>
          <li>Save burst skills for enemies that are about to act.</li>
          <li>Retreat mentally before disaster: losing one run can be fine; losing your best bloodline is not.</li>
        </ol>
      `
    }
  },

  /* ---------------------------------------------------------- */
  /*                         SOURCES                            */
  /* ---------------------------------------------------------- */
  sources: [
    { name: 'Official Steam page', url: 'https://store.steampowered.com/app/686060/Mewgenics/', note: 'Official feature overview and release information.' },
    { name: 'Mewgenics Wiki.gg', url: 'https://mewgenics.wiki.gg/', note: 'Community wiki reference for mutations, classes, abilities, disorders, and status effects.' },
    { name: 'Steam Community Guides', url: 'https://steamcommunity.com/app/686060/guides/', note: 'Community strategy, breeding, and getting-started guides.' }
  ]
};
