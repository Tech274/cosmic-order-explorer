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
}

export const upcomingEvents: CosmicEvent[] = [
  {
    id: "1",
    date: "2026-03-14",
    title: "Full Moon in Virgo",
    type: "fullmoon",
    description: "A powerful full moon illuminating health, daily routines, and service to others.",
    energy: "illuminating",
  },
  {
    id: "2",
    date: "2026-03-20",
    title: "Spring Equinox",
    type: "solstice",
    description: "Day and night in perfect balance. The cosmos resets for a new solar cycle.",
    energy: "expansive",
  },
  {
    id: "3",
    date: "2026-03-29",
    title: "New Moon in Aries",
    type: "newmoon",
    description: "The astrological new year begins. The most powerful time to set bold intentions.",
    energy: "transformative",
  },
  {
    id: "4",
    date: "2026-04-06",
    title: "Mercury Retrograde Ends",
    type: "retrograde",
    description: "Communication and travel return to clarity. Sign contracts and make decisions freely.",
    energy: "grounding",
  },
  {
    id: "5",
    date: "2026-04-13",
    title: "Full Moon in Libra",
    type: "fullmoon",
    description: "Relationships and balance take centre stage. Harmony and justice are illuminated.",
    energy: "illuminating",
  },
  {
    id: "6",
    date: "2026-04-29",
    title: "Solar Eclipse in Taurus",
    type: "eclipse",
    description: "A rare solar eclipse supercharges new beginnings around security and self-worth.",
    energy: "transformative",
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
