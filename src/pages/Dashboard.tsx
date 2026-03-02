import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getMoonPhase,
  getDailyAffirmation,
  dailyPlanets,
  upcomingEvents,
  mockReadings,
  mockUserStats,
} from "@/lib/cosmic-data";
import Layout from "@/components/Layout";
import {
  Star, Sparkles, BookOpen, TrendingUp, Calendar,
  Flame, CreditCard, Plus, ArrowRight, Moon,
  RefreshCw, Download, ExternalLink
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────

const today = new Date();

const moonPhase = getMoonPhase(today);
const affirmation = getDailyAffirmation(today);

const dateLabel = today.toLocaleDateString("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const energyBadgeColors: Record<string, string> = {
  transformative: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  expansive:      "bg-blue-500/20 text-blue-300 border-blue-500/30",
  grounding:      "bg-green-500/20 text-green-300 border-green-500/30",
  illuminating:   "bg-amber-500/20 text-amber-300 border-amber-500/30",
  introspective:  "bg-pink-500/20 text-pink-300 border-pink-500/30",
};

const eventTypeEmoji: Record<string, string> = {
  eclipse:    "🌑",
  retrograde: "☿",
  solstice:   "☀️",
  newmoon:    "🌑",
  fullmoon:   "🌕",
  transit:    "⭐",
};

// ─── Stat Card ────────────────────────────────────────────────

function StatCard({
  icon: Icon, label, value, sub, color
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}) {
  return (
    <Card className="glass-card">
      <CardContent className="pt-5 pb-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className="text-3xl font-bold">{value}</p>
            {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
          </div>
          <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Daily Cosmic Card ─────────────────────────────────────────

function CosmicWeatherCard() {
  return (
    <Card className="relative overflow-hidden gradient-cosmic border-primary/30 col-span-1 lg:col-span-2">
      <div className="starfield opacity-30" />
      <CardContent className="relative z-10 pt-6 pb-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Moon Phase */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-6xl animate-float">{moonPhase.emoji}</div>
            <div>
              <p className="text-white/60 text-sm">Tonight's Moon</p>
              <p className="text-white font-bold text-xl">{moonPhase.phase}</p>
              <div className="flex items-center gap-2 mt-2">
                <Progress value={moonPhase.illumination} className="w-24 h-1.5" />
                <span className="text-white/60 text-xs">{moonPhase.illumination}% illuminated</span>
              </div>
            </div>
          </div>

          <Separator className="bg-white/10 lg:hidden" />

          {/* Moon guidance */}
          <div className="flex-1">
            <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Lunar Guidance</p>
            <p className="text-white text-sm leading-relaxed">{moonPhase.description}</p>
          </div>
        </div>

        {/* Planets strip */}
        <Separator className="bg-white/10 my-4" />
        <div className="flex flex-wrap gap-3">
          {dailyPlanets.map(({ planet, emoji, sign, influence }) => (
            <div key={planet} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1.5">
              <span className="text-base">{emoji}</span>
              <div>
                <p className="text-white/80 text-xs font-medium">{planet} in {sign}</p>
                <p className="text-white/50 text-xs">{influence}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Affirmation Card ─────────────────────────────────────────

function AffirmationCard() {
  return (
    <Card className="glass-card border-amber-500/20 bg-amber-500/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
          Today's Cosmic Affirmation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-base leading-relaxed font-medium italic">
          "{affirmation}"
        </p>
        <Button size="sm" variant="ghost" className="mt-3 gap-1.5 text-muted-foreground -ml-2">
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── Quick Actions ────────────────────────────────────────────

function QuickActions() {
  const actions = [
    { label: "New AI Reading",  icon: Sparkles, href: "/readings", primary: true },
    { label: "Journal Entry",   icon: BookOpen, href: "/journal",  primary: false },
    { label: "View Chart",      icon: Star,     href: "/chart",    primary: false },
    { label: "Book Session",    icon: Calendar, href: "/sessions", primary: false },
  ];

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map(({ label, icon: Icon, href, primary }) => (
          <Link key={label} to={href}>
            <Button
              variant={primary ? "default" : "ghost"}
              className="w-full justify-start gap-2"
              size="sm"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

// ─── Recent Readings ──────────────────────────────────────────

function RecentReadings() {
  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">Recent Readings</CardTitle>
        <Link to="/readings">
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockReadings.map((reading, i) => (
          <div key={reading.id}>
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-lg">
                {reading.type.includes("Daily") ? "🌟" :
                 reading.type.includes("Birth") ? "🌌" :
                 reading.type.includes("Love") ? "💕" : "✨"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm truncate">{reading.type}</p>
                  <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                    <Badge variant="outline" className="text-xs">{reading.theme}</Badge>
                    <span className="text-xs text-muted-foreground">{reading.score}%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {reading.summary}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-muted-foreground">{reading.date}</span>
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs gap-1 text-primary hover:text-primary/80">
                    <Download className="h-3 w-3" />
                    PDF
                  </Button>
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs gap-1 text-muted-foreground">
                    <ExternalLink className="h-3 w-3" />
                    Full reading
                  </Button>
                </div>
              </div>
            </div>
            {i < mockReadings.length - 1 && <Separator className="mt-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// ─── Upcoming Events ──────────────────────────────────────────

function UpcomingEvents() {
  const next4 = upcomingEvents.slice(0, 4);

  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">Cosmic Calendar</CardTitle>
        <Link to="/calendar">
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
            Full calendar
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {next4.map((event) => (
          <div key={event.id} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-lg flex-shrink-0">
              {eventTypeEmoji[event.type] || "⭐"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-medium truncate">{event.title}</p>
                <span className={`text-xs px-1.5 py-0.5 rounded-full border capitalize ${energyBadgeColors[event.energy]}`}>
                  {event.energy}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{event.date}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// ─── Credits Banner ───────────────────────────────────────────

function CreditsBanner() {
  const { creditsRemaining } = mockUserStats;
  const isLow = creditsRemaining <= 3;

  return (
    <Card className={`glass-card ${isLow ? "border-amber-500/40 bg-amber-500/5" : ""}`}>
      <CardContent className="pt-4 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-medium">
                {creditsRemaining} reading credit{creditsRemaining !== 1 ? "s" : ""} remaining
              </p>
              <p className="text-xs text-muted-foreground">
                {isLow ? "Running low — top up to continue your journey" : "Resets on your billing date"}
              </p>
            </div>
          </div>
          <Button size="sm" variant={isLow ? "default" : "outline"} className="gap-1.5 flex-shrink-0">
            <Plus className="h-3.5 w-3.5" />
            Top Up
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function Dashboard() {
  const [_tab, setTab] = useState("overview");
  const { readingsThisMonth, currentStreak, totalReadings } = mockUserStats;

  return (
    <Layout variant="app">
      <div className="container py-8 space-y-6">

        {/* ── Welcome Header ─────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              Good morning, <span className="gradient-text">Cosmic Explorer</span> ✨
            </h1>
            <p className="text-muted-foreground text-sm mt-1">{dateLabel}</p>
          </div>
          <Link to="/onboarding">
            <Button className="gap-2" size="sm">
              <Sparkles className="h-4 w-4" />
              New Reading
            </Button>
          </Link>
        </div>

        {/* ── Credits Banner ─────────────────────────────────── */}
        <CreditsBanner />

        {/* ── Stats Row ──────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Sparkles}
            label="Readings This Month"
            value={readingsThisMonth}
            sub="of unlimited (Pro)"
            color="bg-violet-500/20 text-violet-400"
          />
          <StatCard
            icon={Flame}
            label="Current Streak"
            value={`${currentStreak} days`}
            sub="Keep it going! 🔥"
            color="bg-orange-500/20 text-orange-400"
          />
          <StatCard
            icon={Star}
            label="Total Readings"
            value={totalReadings}
            sub="Since January 2026"
            color="bg-amber-500/20 text-amber-400"
          />
          <StatCard
            icon={TrendingUp}
            label="Manifestation Score"
            value="87%"
            sub="↑ 5% this month"
            color="bg-green-500/20 text-green-400"
          />
        </div>

        {/* ── Tabs ───────────────────────────────────────────── */}
        <Tabs defaultValue="overview" onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-3 max-w-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="readings">Readings</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          {/* ── Overview Tab ─────────────────────────────────── */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            {/* Top row: cosmic weather + affirmation */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <CosmicWeatherCard />
              <div className="space-y-4">
                <AffirmationCard />
                <QuickActions />
              </div>
            </div>

            {/* Bottom row: readings + events */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <RecentReadings />
              </div>
              <UpcomingEvents />
            </div>
          </TabsContent>

          {/* ── Readings Tab ─────────────────────────────────── */}
          <TabsContent value="readings" className="mt-6">
            <RecentReadings />
          </TabsContent>

          {/* ── Calendar Tab ─────────────────────────────────── */}
          <TabsContent value="calendar" className="mt-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="h-5 w-5 text-primary" />
                  Upcoming Cosmic Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-4 p-4 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors">
                    <div className="text-3xl flex-shrink-0">{eventTypeEmoji[event.type]}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{event.title}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${energyBadgeColors[event.energy]}`}>
                          {event.energy}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                      <p className="text-xs text-muted-foreground font-medium">{event.date}</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex-shrink-0 gap-1.5">
                      <Plus className="h-3.5 w-3.5" />
                      Set Reminder
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
