/* ─── Cosmic Data & Utilities ────────────────────────────────── */

// ── Moon Phase Calculation ────────────────────────────────────
export interface MoonPhase {
  phase: string;
  emoji: string;
  illumination: number;
  dayInCycle: number;
  description: string;
}

export function getMoonPhase(date: Date = new Date()): MoonPhase {
  // Known new moon: 6 Jan 2000 18:14 UTC
  const knownNewMoon = new Date("2000-01-06T18:14:00Z");
  const lunationCycle = 29.53058867;
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysSince = (date.getTime() - knownNewMoon.getTime()) / msPerDay;
  const day = ((daysSince % lunationCycle) + lunationCycle) % lunationCycle;
  const illumination = Math.round(
    ((1 - Math.cos((day / lunationCycle) * 2 * Math.PI)) / 2) * 100
  );

  let phase: string, emoji: string, description: string;

  if (day < 1.85) {
    phase = "New Moon"; emoji = "🌑";
    description = "A time of new beginnings. Set your intentions and plant seeds of desire.";
  } else if (day < 7.38) {
    phase = "Waxing Crescent"; emoji = "🌒";
    description = "Build momentum. Take the first steps toward your cosmic intentions.";
  } else if (day < 9.22) {
    phase = "First Quarter"; emoji = "🌓";
    description = "Decision time. Push through challenges and commit to your path.";
  } else if (day < 14.77) {
    phase = "Waxing Gibbous"; emoji = "🌔";
    description = "Refine and adjust. Your manifestations are growing stronger.";
  } else if (day < 16.61) {
    phase = "Full Moon"; emoji = "🌕";
    description = "Peak energy. Celebrate your progress and release what no longer serves you.";
  } else if (day < 22.15) {
    phase = "Waning Gibbous"; emoji = "🌖";
    description = "Share your wisdom. Gratitude amplifies your cosmic connection.";
  } else if (day < 23.99) {
    phase = "Last Quarter"; emoji = "🌗";
    description = "Let go and forgive. Clear space for new cosmic energy to enter.";
  } else {
    phase = "Waning Crescent"; emoji = "🌘";
    description = "Rest and reflect. Surrender to the universe and trust the process.";
  }

  return { phase, emoji, illumination, dayInCycle: Math.round(day), description };
}

// ── Zodiac Signs ──────────────────────────────────────────────
export interface ZodiacSign {
  name: string;
  symbol: string;
  emoji: string;
  element: string;
  dates: string;
  traits: string[];
}

export const zodiacSigns: ZodiacSign[] = [
  { name: "Aries",       symbol: "♈", emoji: "🐏", element: "Fire",  dates: "Mar 21 – Apr 19", traits: ["Bold", "Pioneering", "Energetic"] },
  { name: "Taurus",      symbol: "♉", emoji: "🐂", element: "Earth", dates: "Apr 20 – May 20", traits: ["Grounded", "Patient", "Sensual"] },
  { name: "Gemini",      symbol: "♊", emoji: "👯", element: "Air",   dates: "May 21 – Jun 20", traits: ["Curious", "Adaptable", "Witty"] },
  { name: "Cancer",      symbol: "♋", emoji: "🦀", element: "Water", dates: "Jun 21 – Jul 22", traits: ["Nurturing", "Intuitive", "Loyal"] },
  { name: "Leo",         symbol: "♌", emoji: "🦁", element: "Fire",  dates: "Jul 23 – Aug 22", traits: ["Creative", "Generous", "Dramatic"] },
  { name: "Virgo",       symbol: "♍", emoji: "🌾", element: "Earth", dates: "Aug 23 – Sep 22", traits: ["Analytical", "Helpful", "Precise"] },
  { name: "Libra",       symbol: "♎", emoji: "⚖️", element: "Air",   dates: "Sep 23 – Oct 22", traits: ["Harmonious", "Diplomatic", "Fair"] },
  { name: "Scorpio",     symbol: "♏", emoji: "🦂", element: "Water", dates: "Oct 23 – Nov 21", traits: ["Intense", "Perceptive", "Powerful"] },
  { name: "Sagittarius", symbol: "♐", emoji: "🏹", element: "Fire",  dates: "Nov 22 – Dec 21", traits: ["Adventurous", "Philosophical", "Free"] },
  { name: "Capricorn",   symbol: "♑", emoji: "🐐", element: "Earth", dates: "Dec 22 – Jan 19", traits: ["Ambitious", "Disciplined", "Practical"] },
  { name: "Aquarius",    symbol: "♒", emoji: "🏺", element: "Air",   dates: "Jan 20 – Feb 18", traits: ["Innovative", "Humanitarian", "Independent"] },
  { name: "Pisces",      symbol: "♓", emoji: "🐠", element: "Water", dates: "Feb 19 – Mar 20", traits: ["Empathic", "Imaginative", "Dreamy"] },
];

export function getZodiacSign(month: number, day: number): ZodiacSign {
  const dates = [
    [3, 21], [4, 20], [5, 21], [6, 21], [7, 23], [8, 23],
    [9, 23], [10, 23], [11, 22], [12, 22], [1, 20], [2, 19],
  ];
  for (let i = 0; i < dates.length; i++) {
    const [m, d] = dates[i];
    if (month === m && day >= d) return zodiacSigns[i];
    if (month === (m % 12) + 1 && day < dates[(i + 1) % 12][1]) return zodiacSigns[i];
  }
  return zodiacSigns[11];
}

// ── Daily Affirmations ────────────────────────────────────────
export const affirmations: string[] = [
  "The universe conspires in my favour. My desires are already on their way to me.",
  "I am aligned with the cosmic flow of abundance, love, and perfect timing.",
  "Every star in the sky reflects a possibility within me. I am limitless.",
  "My intentions are powerful cosmic orders, received and fulfilled by the universe.",
  "I trust the journey of my soul. Everything unfolds in divine order.",
  "I am a vessel of light, drawing to me all that vibrates at my highest frequency.",
  "The cosmos holds my deepest wishes. I release them with faith and receive with grace.",
  "My energy is magnetic. I attract what I am, and I am extraordinary.",
  "I am in harmony with the planets, the stars, and the infinite intelligence of the universe.",
  "Today I open myself fully to cosmic guidance and miraculous possibilities.",
  "I walk in alignment with my highest self. The universe celebrates my authentic expression.",
  "What I seek is seeking me. We are drawn together by the laws of the cosmos.",
  "I am worthy of all the beauty, love, and abundance the universe has prepared for me.",
  "My connection to the stars reminds me that I am made of the same ancient stardust.",
  "I release resistance and welcome the magic that flows effortlessly into my life.",
];

export function getDailyAffirmation(date: Date = new Date()): string {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
    (1000 * 60 * 60 * 24)
  );
  return affirmations[dayOfYear % affirmations.length];
}

// ── Planetary Positions (Mock) ─────────────────────────────────
export interface PlanetPosition {
  planet: string;
  emoji: string;
  sign: string;
  influence: string;
}

export const dailyPlanets: PlanetPosition[] = [
  { planet: "Sun",     emoji: "☀️",  sign: "Pisces",      influence: "Deep intuition & spiritual insight" },
  { planet: "Moon",    emoji: "🌙",  sign: "Scorpio",     influence: "Emotional transformation & depth" },
  { planet: "Mercury", emoji: "☿",  sign: "Aquarius",    influence: "Innovative thinking & communication" },
  { planet: "Venus",   emoji: "♀",  sign: "Aries",       influence: "Bold desires & passionate love" },
  { planet: "Mars",    emoji: "♂",  sign: "Gemini",      influence: "Versatile energy & quick action" },
];

// ── Upcoming Cosmic Events ─────────────────────────────────────
export interface CosmicEvent {
  id: string;
  date: string;
  title: string;
  type: "eclipse" | "retrograde" | "solstice" | "newmoon" | "fullmoon" | "transit";
  description: string;
  energy: "transformative" | "expansive" | "grounding" | "illuminating" | "introspective";
  interpretation?: string;
}

export const upcomingEvents: CosmicEvent[] = [
  {
    id: "1",
    date: "2026-03-14",
    title: "Full Moon in Virgo",
    type: "fullmoon",
    description: "A powerful full moon illuminating health, daily routines, and service to others.",
    energy: "illuminating",
    interpretation: "This full moon asks you to audit the small daily choices that compound into your destiny. Release perfectionism that keeps you from starting. Your wellbeing rituals — sleep, nourishment, movement — deserve the same devotion you give your ambitions. The cosmos is highlighting who and what you serve, and whether you have remembered to place yourself on that list.",
  },
  {
    id: "2",
    date: "2026-03-20",
    title: "Spring Equinox",
    type: "solstice",
    description: "Day and night in perfect balance. The cosmos resets for a new solar cycle.",
    energy: "expansive",
    interpretation: "The equinox is nature's great reset button. As light and dark equalise, you are invited to find your own inner equilibrium — between effort and rest, between giving and receiving, between what has been and what is coming. This is a sacred threshold. Set a single powerful intention for the solar year ahead, water it with belief, and watch the universe co-create it with you.",
  },
  {
    id: "3",
    date: "2026-03-29",
    title: "New Moon in Aries",
    type: "newmoon",
    description: "The astrological new year begins. The most powerful time to set bold intentions.",
    energy: "transformative",
    interpretation: "Aries new moons carry the fierce energy of new beginnings. This is the cosmic moment for audacious intentions — the kind that scare you slightly because they are real. Write them down. Speak them aloud. Begin something, even one small symbolic action. Aries rewards those who act on instinct. The universe is ready to back your boldest move.",
  },
  {
    id: "4",
    date: "2026-04-06",
    title: "Mercury Retrograde Ends",
    type: "retrograde",
    description: "Communication and travel return to clarity. Sign contracts and make decisions freely.",
    energy: "grounding",
    interpretation: "The cosmic messenger resumes direct motion, and the fog that may have clouded your thinking, communications, or travel begins to lift. Projects that stalled can now accelerate. Conversations that needed reflection can now reach resolution. This is an excellent window for signing agreements, launching plans, and making commitments you have been carefully reconsidering.",
  },
  {
    id: "5",
    date: "2026-04-13",
    title: "Full Moon in Libra",
    type: "fullmoon",
    description: "Relationships and balance take centre stage. Harmony and justice are illuminated.",
    energy: "illuminating",
    interpretation: "Under this Libra full moon, your relationships become a mirror. What is being reflected back? The partnerships that are truly reciprocal will feel luminous right now. Those that have quietly become imbalanced will reveal their true nature. This is not a moon for conflict — it is a moon for honest, compassionate renegotiation of the terms by which you connect.",
  },
  {
    id: "6",
    date: "2026-04-29",
    title: "Solar Eclipse in Taurus",
    type: "eclipse",
    description: "A rare solar eclipse supercharges new beginnings around security and self-worth.",
    energy: "transformative",
    interpretation: "Solar eclipses are the universe's most dramatic catalysts — capable of shifting your life trajectory in ways that feel both sudden and inevitable. In Taurus, this eclipse targets your relationship with security, resources, and self-value. A new chapter around what you own, earn, and consider truly yours is beginning. Events near this date may be life-defining. Pay close attention.",
  },
];

// ── Mock Reading History ───────────────────────────────────────
export interface Reading {
  id: string;
  type: string;
  date: string;
  summary: string;
  theme: string;
  score: number;
}

export const mockReadings: Reading[] = [
  {
    id: "1",
    type: "Daily Cosmic Reading",
    date: "2026-03-02",
    summary: "The Moon in Scorpio heightens your intuition today. Trust the whispers of your inner knowing — a hidden truth is ready to surface.",
    theme: "Transformation",
    score: 92,
  },
  {
    id: "2",
    type: "Birth Chart Analysis",
    date: "2026-02-28",
    summary: "Your Sun in Leo trines Jupiter in Sagittarius, creating an extraordinary window for creative expression and philosophical growth.",
    theme: "Expansion",
    score: 88,
  },
  {
    id: "3",
    type: "Love & Relationship Reading",
    date: "2026-02-24",
    summary: "Venus entering Aries ignites bold desire. If you have been holding back in matters of the heart, the cosmos urges courage.",
    theme: "Love",
    score: 85,
  },
  {
    id: "4",
    type: "Career & Purpose Reading",
    date: "2026-02-19",
    summary: "Saturn's discipline meets your natal Neptune's vision. This is a defining moment to ground your dreams into tangible action.",
    theme: "Purpose",
    score: 90,
  },
];

// ── User Stats (Mock) ─────────────────────────────────────────
export interface UserStats {
  readingsThisMonth: number;
  currentStreak: number;
  totalReadings: number;
  creditsRemaining: number;
  memberSince: string;
}

export const mockUserStats: UserStats = {
  readingsThisMonth: 8,
  currentStreak: 12,
  totalReadings: 47,
  creditsRemaining: 3,
  memberSince: "January 2026",
};

// ── Pricing Plans ─────────────────────────────────────────────
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Stardust",
    price: 0,
    period: "forever",
    description: "Begin your cosmic journey with essential tools.",
    features: [
      "3 AI readings per month",
      "Daily moon phase tracker",
      "Daily affirmation",
      "Basic birth chart",
      "Community access",
    ],
    highlighted: false,
    cta: "Start for Free",
  },
  {
    id: "pro",
    name: "Celestial",
    price: 9.99,
    period: "month",
    description: "Deepen your practice with unlimited cosmic guidance.",
    features: [
      "Unlimited AI readings",
      "Full birth chart analysis",
      "Cosmic journal (unlimited)",
      "Planetary transit alerts",
      "Monthly cosmic report PDF",
      "Priority support",
    ],
    highlighted: true,
    cta: "Start 7-Day Free Trial",
  },
  {
    id: "premium",
    name: "Galactic",
    price: 24.99,
    period: "month",
    description: "The complete cosmic experience, nothing held back.",
    features: [
      "Everything in Celestial",
      "1:1 practitioner sessions (2/mo)",
      "Custom corporate reports",
      "API access (500 calls/mo)",
      "White-label readings",
      "VIP cosmic events access",
    ],
    highlighted: false,
    cta: "Go Galactic",
  },
];

// ── Testimonials ──────────────────────────────────────────────
export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  stars: number;
  sign: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sophia Laurent",
    role: "Holistic Life Coach",
    avatar: "SL",
    quote: "Cosmic Order Explorer transformed my daily practice. The AI readings are eerily accurate and deeply insightful. I recommend it to every client I work with.",
    stars: 5,
    sign: "Scorpio ♏",
  },
  {
    name: "Marcus Chen",
    role: "Entrepreneur & Meditator",
    avatar: "MC",
    quote: "I was sceptical at first, but the birth chart analysis captured my nature so perfectly I was speechless. The cosmic journal has become non-negotiable in my morning routine.",
    stars: 5,
    sign: "Capricorn ♑",
  },
  {
    name: "Amara Osei",
    role: "Yoga Teacher & Author",
    avatar: "AO",
    quote: "The full moon rituals guided by this platform have brought profound shifts in my energy and relationships. This is not just an app — it is a spiritual companion.",
    stars: 5,
    sign: "Pisces ♓",
  },
];

// ── Reading Types ─────────────────────────────────────────────
export interface ReadingType {
  id: string;
  label: string;
  emoji: string;
  description: string;
  creditsRequired: number;
}

export const readingTypes: ReadingType[] = [
  { id: "daily",     label: "Daily Cosmic",         emoji: "🌟", description: "Today's cosmic weather and personalised guidance",          creditsRequired: 1 },
  { id: "birth",     label: "Birth Chart Analysis", emoji: "🌌", description: "A deep dive into your natal placements and life themes",    creditsRequired: 2 },
  { id: "love",      label: "Love & Relationships", emoji: "💕", description: "Venus-guided insight into your romantic energy",            creditsRequired: 1 },
  { id: "career",    label: "Career & Purpose",     emoji: "✨", description: "Saturn's path to your authentic calling",                  creditsRequired: 1 },
  { id: "spiritual", label: "Spiritual Guidance",   emoji: "🔮", description: "Neptune's mystical revelation for your soul's journey",    creditsRequired: 2 },
  { id: "custom",    label: "Ask the Universe",     emoji: "🌠", description: "Submit your own question to the cosmic intelligence",      creditsRequired: 1 },
];

// ── Generated Reading (mock AI output) ───────────────────────
export interface GeneratedReading {
  id: string;
  type: string;
  generatedAt: string;
  title: string;
  body: string[];
  energyScore: number;
  theme: string;
  planets: string[];
  keywords: string[];
}

export const mockGeneratedReading: GeneratedReading = {
  id: "gen-001",
  type: "Daily Cosmic",
  generatedAt: new Date().toLocaleDateString("en-GB"),
  title: "The Stars Speak: A Day of Profound Transition",
  energyScore: 88,
  theme: "Transformation",
  planets: ["Moon", "Pluto", "Mercury"],
  keywords: ["Renewal", "Clarity", "Depth", "Communication", "Rebirth"],
  body: [
    "The Moon in Scorpio forms a powerful trine with Pluto in Capricorn today, creating an extraordinary window for deep emotional transformation. You may find yourself drawn to examine patterns that have long operated beneath the surface of your conscious awareness — this is not a time to shy away from intensity but to lean into it with courage and curiosity. The universe is not asking you to destroy what no longer serves; it is asking you to transmute it, to discover the gold within the shadow.",
    "Mercury's recent ingress into Aquarius electrifies your mental landscape with original ideas and unconventional perspectives. If you have been struggling to articulate a truth that feels difficult to express, today opens a channel of unprecedented clarity. Conversations begun under this influence carry particular weight — what is spoken today plants seeds that will bloom for months to come. Choose your words as deliberate cosmic orders, knowing the universe receives them literally.",
    "By evening, as the Moon applies to a sextile with Neptune, your intuition reaches extraordinary levels. Pay close attention to dreams, synchronicities, and the quiet voice that speaks between thoughts. The cosmos is orchestrating a series of meaningful encounters designed to confirm that you are exactly where your soul intended to be. Trust the journey. The stars have conspired for this exact moment in your story, and the next chapter is more luminous than you dare imagine.",
  ],
};

// ── Journal Data ──────────────────────────────────────────────
export interface JournalEntry {
  id: string;
  date: string;
  moonPhase: string;
  moonEmoji: string;
  prompt: string;
  body: string;
  wordCount: number;
  intentions: string[];
  mood: number;
}

export const journalPrompts: string[] = [
  "What intention am I ready to release to the universe, knowing it will be received and fulfilled?",
  "Under this moon, what old story am I choosing to complete, and what new chapter am I beginning?",
  "Where in my life am I resisting flow? What would happen if I surrendered to the current?",
  "What is the universe reflecting back to me right now through the people and events in my life?",
  "What does my highest self want me to know that my everyday self has been too busy to hear?",
  "What am I grateful for that I often overlook? How do these hidden blessings shape my path?",
  "If the stars could write a letter to me about this moment in my life, what would they say?",
  "What cosmic gift is hidden within my current challenge? How is this situation serving my growth?",
  "Where am I placing my energy? Does it align with what I am calling into my life?",
  "What would I do differently if I truly believed the universe was always working in my favour?",
];

export const mockJournalEntries: JournalEntry[] = [
  {
    id: "j-001",
    date: "2026-02-28",
    moonPhase: "Waxing Gibbous",
    moonEmoji: "🌔",
    prompt: "What intention am I ready to release to the universe?",
    body: "Today I feel a deep sense of readiness that I haven't felt in months. The energy in the room feels charged with possibility, like the air before a storm. I am releasing my fear around stepping into a larger creative vision — the novel I have been carrying in my chest for two years. I release it to the stars with open hands, trusting that inspiration will meet commitment and something beautiful will emerge.",
    wordCount: 72,
    intentions: ["Spiritual Growth", "Clarity"],
    mood: 4,
  },
  {
    id: "j-002",
    date: "2026-02-24",
    moonPhase: "First Quarter",
    moonEmoji: "🌓",
    prompt: "Where in my life am I resisting flow?",
    body: "Resistance shows up most acutely in my relationships. I notice how I hold back the full expression of my feelings, as though tenderness is a vulnerability that will be used against me. The moon tonight makes me want to be softer. I wrote a message I have been too afraid to send. I didn't send it yet — but I wrote it, and that felt like a beginning.",
    wordCount: 66,
    intentions: ["Love & Relationships"],
    mood: 3,
  },
  {
    id: "j-003",
    date: "2026-02-19",
    moonPhase: "New Moon",
    moonEmoji: "🌑",
    prompt: "What does my highest self want me to know?",
    body: "Stillness. That is the word that rose when I sat in meditation this morning. My highest self doesn't want me to run faster — she wants me to arrive, fully, in this moment. She is not worried about timelines or outcomes. She is at peace with the unfolding. She sends me this message: you are not behind. You are precisely on time, moving at the speed of your soul.",
    wordCount: 67,
    intentions: ["Spiritual Growth"],
    mood: 5,
  },
  {
    id: "j-004",
    date: "2026-02-14",
    moonPhase: "Full Moon",
    moonEmoji: "🌕",
    prompt: "What cosmic gift is hidden in my current challenge?",
    body: "The gift inside the frustration at work is clarity about what I actually value. I have been afraid to say it plainly: I want to create, not just execute. This job, with all its friction, is teaching me the exact vocabulary for what I need next. I am grateful for the contrast. I am writing my resignation in my heart while building my next chapter in the world.",
    wordCount: 66,
    intentions: ["Career & Purpose", "Abundance"],
    mood: 3,
  },
  {
    id: "j-005",
    date: "2026-02-09",
    moonPhase: "Waning Crescent",
    moonEmoji: "🌘",
    prompt: "What am I grateful for that I often overlook?",
    body: "The list surprised me with its simplicity: morning light through the east window. The particular sound of rain on leaves. The friend who checks in with a single emoji that says everything. The body that carries me through each day without complaint. The moments between the moments, quiet and ordinary, where life actually lives. I have been chasing extraordinary when extraordinary was here all along.",
    wordCount: 71,
    intentions: ["Healing & Wellness"],
    mood: 5,
  },
];

// ── Birth Chart Data ──────────────────────────────────────────
export interface PlanetPlacement {
  planet: string;
  emoji: string;
  sign: string;
  house: number;
  degree: string;
  degreeNumeric: number;
  retrograde: boolean;
}

export const mockPlanetPlacements: PlanetPlacement[] = [
  { planet: "Sun",     emoji: "☀️",  sign: "Leo",         house: 5,  degree: "14°32′", degreeNumeric: 134, retrograde: false },
  { planet: "Moon",    emoji: "🌙",  sign: "Scorpio",     house: 8,  degree: "27°48′", degreeNumeric: 237, retrograde: false },
  { planet: "Mercury", emoji: "☿",  sign: "Virgo",       house: 6,  degree: "02°15′", degreeNumeric: 152, retrograde: false },
  { planet: "Venus",   emoji: "♀",  sign: "Cancer",      house: 4,  degree: "18°44′", degreeNumeric: 108, retrograde: false },
  { planet: "Mars",    emoji: "♂",  sign: "Aries",       house: 1,  degree: "09°22′", degreeNumeric: 9,   retrograde: false },
  { planet: "Jupiter", emoji: "♃",  sign: "Sagittarius", house: 9,  degree: "21°03′", degreeNumeric: 261, retrograde: false },
  { planet: "Saturn",  emoji: "♄",  sign: "Capricorn",   house: 10, degree: "05°17′", degreeNumeric: 275, retrograde: true  },
  { planet: "Uranus",  emoji: "♅",  sign: "Aquarius",    house: 11, degree: "16°59′", degreeNumeric: 316, retrograde: false },
  { planet: "Neptune", emoji: "♆",  sign: "Pisces",      house: 12, degree: "23°41′", degreeNumeric: 353, retrograde: true  },
  { planet: "Pluto",   emoji: "♇",  sign: "Scorpio",     house: 8,  degree: "00°28′", degreeNumeric: 210, retrograde: false },
];

export interface ElementBalance {
  element: string;
  count: number;
  percentage: number;
  color: string;
}

export const mockElementBalance: ElementBalance[] = [
  { element: "Fire",  count: 3, percentage: 30, color: "#f97316" },
  { element: "Earth", count: 2, percentage: 20, color: "#84cc16" },
  { element: "Air",   count: 3, percentage: 30, color: "#38bdf8" },
  { element: "Water", count: 2, percentage: 20, color: "#818cf8" },
];

export interface ChartAspect {
  planet1: string;
  planet2: string;
  aspect: string;
  glyph: string;
  orb: string;
  influence: "harmonious" | "challenging" | "neutral";
  description: string;
}

export const mockChartAspects: ChartAspect[] = [
  {
    planet1: "Sun", planet2: "Jupiter", aspect: "Trine", glyph: "△",
    orb: "2°18′", influence: "harmonious",
    description: "A profound blessing of optimism and expansion. Your natural confidence opens doors that others struggle to find. Creative endeavours and leadership roles are particularly favoured.",
  },
  {
    planet1: "Moon", planet2: "Pluto", aspect: "Conjunction", glyph: "☌",
    orb: "0°34′", influence: "challenging",
    description: "Emotional intensity is your constant companion. You feel everything at a cellular level, which grants extraordinary empathy but can make boundaries difficult. Transformation through feeling is your path.",
  },
  {
    planet1: "Mercury", planet2: "Saturn", aspect: "Sextile", glyph: "⚹",
    orb: "3°02′", influence: "harmonious",
    description: "Your mind is both precise and patient — a rare combination. You have the ability to think in structures, making you excellent at long-form projects and disciplined communication.",
  },
  {
    planet1: "Venus", planet2: "Mars", aspect: "Square", glyph: "□",
    orb: "1°47′", influence: "challenging",
    description: "The interplay between desire and action creates creative tension in relationships. Passion runs high, as does conflict. Learning to channel this intensity consciously is your relationship mastery lesson.",
  },
  {
    planet1: "Sun", planet2: "Saturn", aspect: "Opposition", glyph: "☍",
    orb: "4°45′", influence: "neutral",
    description: "A lifelong conversation between your creative self-expression and the demands of responsibility. When reconciled, this aspect produces exceptional discipline married to authentic purpose.",
  },
];

// ── Digital Products (Shop) ───────────────────────────────────
export interface DigitalProduct {
  id: string;
  name: string;
  emoji: string;
  category: "ebook" | "audio" | "course" | "ritual" | "planner";
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  badge?: string;
}

export const digitalProducts: DigitalProduct[] = [
  {
    id: "dp-1",
    name: "Cosmic Ordering Mastery Guide",
    emoji: "📖",
    category: "ebook",
    price: 19.99,
    originalPrice: 29.99,
    description: "The definitive 120-page guide to manifesting with cosmic precision. Learn the art of aligning your desires with planetary cycles for accelerated results.",
    features: ["120-page deep-dive", "12 cosmic ordering templates", "Moon ritual calendar", "Personal workbook pages"],
    rating: 4.9,
    reviews: 847,
    badge: "Bestseller",
  },
  {
    id: "dp-2",
    name: "Full Moon Release Meditation Series",
    emoji: "🎧",
    category: "audio",
    price: 14.99,
    description: "Six guided meditations (45–60 minutes each) designed to harness the releasing power of each full moon archetype throughout the year.",
    features: ["6 full-length meditations", "Binaural beat background", "Downloadable MP3", "Companion ritual guide"],
    rating: 4.8,
    reviews: 512,
    badge: "New",
  },
  {
    id: "dp-3",
    name: "Astrology Foundations: Self-Paced Course",
    emoji: "🎓",
    category: "course",
    price: 79.00,
    originalPrice: 129.00,
    description: "Go from curious beginner to confident birth-chart reader in 8 weeks. 24 video lessons, quizzes, and a live Q&A session included.",
    features: ["24 video lessons", "Live monthly Q&A", "Certificate of completion", "Lifetime access"],
    rating: 4.9,
    reviews: 1203,
    badge: "Top Rated",
  },
  {
    id: "dp-4",
    name: "New Moon Manifestation Ritual Kit",
    emoji: "✨",
    category: "ritual",
    price: 12.99,
    description: "Everything you need to perform a powerful new moon ritual. Includes step-by-step ceremony, affirmation cards, and a 28-day tracking journal.",
    features: ["Step-by-step ceremony", "28 affirmation cards", "28-day tracker", "Moon water instructions"],
    rating: 4.7,
    reviews: 389,
  },
  {
    id: "dp-5",
    name: "2026 Cosmic Planner PDF",
    emoji: "📅",
    category: "planner",
    price: 9.99,
    description: "A beautifully illustrated 52-week digital planner aligned to every major cosmic event of 2026 — lunar cycles, eclipses, retrogrades, and solstices.",
    features: ["52-week layout", "Moon phase tracker", "Eclipse planning pages", "Printable A4 & Letter"],
    rating: 4.8,
    reviews: 641,
  },
  {
    id: "dp-6",
    name: "Shadow Work Cosmic Journal Prompts",
    emoji: "🌑",
    category: "ebook",
    price: 7.99,
    description: "365 deep journal prompts specifically designed for shadow work, aligned to the lunar calendar. One transformative prompt for every day of the year.",
    features: ["365 unique prompts", "Moon-phase aligned", "Shadow work framework", "Integration exercises"],
    rating: 4.6,
    reviews: 276,
  },
];

// ── Credit Packs ──────────────────────────────────────────────
export interface CreditPack {
  id: string;
  credits: number;
  price: number;
  originalPrice?: number;
  perCredit: number;
  badge?: string;
  highlighted: boolean;
}

export const creditPacks: CreditPack[] = [
  { id: "cp-5",  credits: 5,  price: 4.99,  perCredit: 1.00, highlighted: false },
  { id: "cp-20", credits: 20, price: 14.99, perCredit: 0.75, badge: "Best Value", highlighted: true },
  { id: "cp-50", credits: 50, price: 29.99, originalPrice: 49.99, perCredit: 0.60, badge: "Power Pack", highlighted: false },
];

// ── Practitioners ─────────────────────────────────────────────
export interface Practitioner {
  id: string;
  name: string;
  avatar: string;
  title: string;
  specialties: string[];
  rating: number;
  reviews: number;
  sessionsCompleted: number;
  pricePerHour: number;
  nextAvailable: string;
  languages: string[];
  bio: string;
  badges: string[];
}

export const practitioners: Practitioner[] = [
  {
    id: "p-1",
    name: "Celestine Mora",
    avatar: "CM",
    title: "Vedic Astrologer & Life Coach",
    specialties: ["Vedic Astrology", "Career Guidance", "Relationship Synastry", "Spiritual Awakening"],
    rating: 4.97,
    reviews: 312,
    sessionsCompleted: 890,
    pricePerHour: 120,
    nextAvailable: "Today, 4:00 PM",
    languages: ["English", "Spanish"],
    bio: "With 14 years of Vedic astrology practice and a Masters in Psychology, Celestine weaves ancient wisdom with modern coaching to help you navigate life's pivotal crossroads.",
    badges: ["Top Rated", "Verified", "Fast Responder"],
  },
  {
    id: "p-2",
    name: "Orion Blake",
    avatar: "OB",
    title: "Western Astrologer & Tarot Reader",
    specialties: ["Western Astrology", "Tarot", "Love & Relationships", "Shadow Work"],
    rating: 4.92,
    reviews: 218,
    sessionsCompleted: 547,
    pricePerHour: 85,
    nextAvailable: "Tomorrow, 10:00 AM",
    languages: ["English"],
    bio: "Orion combines 10 years of Western astrology with an intuitive tarot practice to deliver sessions that are both deeply insightful and immediately actionable.",
    badges: ["Certified", "Rising Star"],
  },
  {
    id: "p-3",
    name: "Ananya Krishnan",
    avatar: "AK",
    title: "Numerologist & Cosmic Coach",
    specialties: ["Numerology", "Life Path Reading", "Abundance Mindset", "Purpose Work"],
    rating: 4.89,
    reviews: 178,
    sessionsCompleted: 423,
    pricePerHour: 75,
    nextAvailable: "Today, 7:00 PM",
    languages: ["English", "Hindi", "Tamil"],
    bio: "Ananya's unique fusion of numerology and cosmic coaching creates a precise map of your soul's purpose and the practical steps to walk your most authentic path.",
    badges: ["Multilingual", "Verified"],
  },
  {
    id: "p-4",
    name: "Sebastian Wolf",
    avatar: "SW",
    title: "Human Design Analyst",
    specialties: ["Human Design", "Gene Keys", "Energy Management", "Manifestation"],
    rating: 4.94,
    reviews: 267,
    sessionsCompleted: 711,
    pricePerHour: 110,
    nextAvailable: "Mar 5, 2:00 PM",
    languages: ["English", "German"],
    bio: "Sebastian is one of the leading Human Design analysts in Europe, helping executives, creatives, and seekers understand their unique energetic blueprint and how to work with — not against — their design.",
    badges: ["Top Rated", "Verified", "Expert"],
  },
];

// ── Subscription / Billing (mock) ─────────────────────────────
export interface Invoice {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "paid" | "pending" | "failed";
}

export interface BillingInfo {
  plan: "free" | "pro" | "premium";
  planName: string;
  nextBillingDate: string;
  amount: number;
  creditsRemaining: number;
  creditsTotal: number;
  renewalCredits: number;
  cardLast4: string;
  cardBrand: string;
  invoices: Invoice[];
}

export const mockBillingInfo: BillingInfo = {
  plan: "free",
  planName: "Stardust",
  nextBillingDate: "—",
  amount: 0,
  creditsRemaining: 3,
  creditsTotal: 3,
  renewalCredits: 3,
  cardLast4: "",
  cardBrand: "",
  invoices: [
    { id: "inv-001", date: "2026-02-01", description: "20 Credit Pack", amount: 14.99, status: "paid" },
    { id: "inv-002", date: "2026-01-15", description: "20 Credit Pack", amount: 14.99, status: "paid" },
    { id: "inv-003", date: "2026-01-01", description: "5 Credit Pack", amount: 4.99, status: "paid" },
  ],
};
