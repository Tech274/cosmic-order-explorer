import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Layout from "@/components/Layout";
import { upcomingEvents, type CosmicEvent } from "@/lib/cosmic-data";
import { Bell, BellOff, Sparkles, ChevronDown, ChevronUp, Calendar as CalIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// ─── Static Maps ──────────────────────────────────────────────

const eventTypeEmoji: Record<string, string> = {
  eclipse:    "🌑",
  retrograde: "☿",
  solstice:   "☀️",
  newmoon:    "🌑",
  fullmoon:   "🌕",
  transit:    "⭐",
};

const eventTypeColor: Record<string, string> = {
  fullmoon:   "bg-amber-400",
  newmoon:    "bg-violet-500",
  eclipse:    "bg-red-500",
  retrograde: "bg-blue-400",
  solstice:   "bg-orange-400",
  transit:    "bg-green-400",
};

const energyColors: Record<string, string> = {
  transformative: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  expansive:      "bg-blue-500/20 text-blue-300 border-blue-500/30",
  grounding:      "bg-green-500/20 text-green-300 border-green-500/30",
  illuminating:   "bg-amber-500/20 text-amber-300 border-amber-500/30",
  introspective:  "bg-pink-500/20 text-pink-300 border-pink-500/30",
};

const FILTERS: { label: string; value: "All" | CosmicEvent["type"]; emoji: string }[] = [
  { label: "All Events",   value: "All",        emoji: "✨" },
  { label: "Full Moons",   value: "fullmoon",   emoji: "🌕" },
  { label: "New Moons",    value: "newmoon",    emoji: "🌑" },
  { label: "Eclipses",     value: "eclipse",    emoji: "🌑" },
  { label: "Retrogrades",  value: "retrograde", emoji: "☿" },
  { label: "Solstices",    value: "solstice",   emoji: "☀️" },
];

// ─── Month Grid ───────────────────────────────────────────────

function MonthGrid({ events }: { events: CosmicEvent[] }) {
  const year = 2026; const month = 2; // March (0-indexed)
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayDay = 2; // March 2, 2026

  return (
    <div>
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">{d}</div>
        ))}
      </div>
      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {/* Blank cells before month starts */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`blank-${i}`} className="aspect-square" />
        ))}
        {/* Day cells */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = `2026-03-${String(day).padStart(2, "0")}`;
          const dayEvents = events.filter(e => e.date === dateStr);
          const isToday = day === todayDay;

          return (
            <div
              key={day}
              className={cn(
                "aspect-square rounded-lg p-1 flex flex-col items-center gap-0.5 transition-colors",
                isToday
                  ? "ring-2 ring-primary bg-primary/10"
                  : dayEvents.length > 0
                    ? "bg-muted/50 hover:bg-muted"
                    : "bg-muted/20 hover:bg-muted/40"
              )}
            >
              <span className={cn(
                "text-xs self-end leading-none",
                isToday ? "text-primary font-bold" : "text-muted-foreground"
              )}>
                {day}
              </span>
              <div className="flex flex-wrap gap-0.5 justify-center mt-auto">
                {dayEvents.map(e => (
                  <div
                    key={e.id}
                    className={`w-1.5 h-1.5 rounded-full ${eventTypeColor[e.type] ?? "bg-primary"}`}
                    title={e.title}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Event Card ───────────────────────────────────────────────

function EventCard({
  event, expanded, onToggle, hasReminder, onReminder
}: {
  event: CosmicEvent & { interpretation?: string };
  expanded: boolean;
  onToggle: () => void;
  hasReminder: boolean;
  onReminder: () => void;
}) {
  const daysUntil = Math.ceil(
    (new Date(event.date).getTime() - new Date("2026-03-02").getTime()) /
    (1000 * 60 * 60 * 24)
  );

  return (
    <Card className={cn("glass-card transition-all", expanded && "border-primary/40")}>
      <CardContent className="pt-4 pb-4">
        <div className="flex items-start gap-4">
          {/* Type icon */}
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0",
            "bg-muted/50"
          )}>
            {eventTypeEmoji[event.type] ?? "⭐"}
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <p className="font-semibold">{event.title}</p>
              <span className={cn("text-xs px-2 py-0.5 rounded-full border capitalize", energyColors[event.energy])}>
                {event.energy}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CalIcon className="h-3 w-3" />
                {event.date}
              </span>
              <span>{daysUntil > 0 ? `in ${daysUntil} day${daysUntil !== 1 ? "s" : ""}` : "Today"}</span>
            </div>
          </div>

          {/* Reminder button */}
          <Button
            size="icon"
            variant="ghost"
            className={cn("h-8 w-8 flex-shrink-0", hasReminder ? "text-primary" : "text-muted-foreground")}
            onClick={onReminder}
            title={hasReminder ? "Remove reminder" : "Set reminder"}
          >
            {hasReminder ? <Bell className="h-4 w-4 fill-current" /> : <BellOff className="h-4 w-4" />}
          </Button>
        </div>

        {/* "What this means for you" — collapsible */}
        {event.interpretation && (
          <Collapsible open={expanded} onOpenChange={onToggle}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="mt-3 gap-1.5 text-primary -ml-1">
                <Sparkles className="h-3.5 w-3.5" />
                What this means for you
                {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-3 pl-3 border-l-2 border-primary/30 space-y-3 animate-fade-up">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {event.interpretation}
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function CosmicCalendar() {
  const [activeFilter, setActiveFilter] = useState<"All" | CosmicEvent["type"]>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [reminders, setReminders] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "month">("list");
  const { toast } = useToast();

  const filtered = upcomingEvents.filter(e =>
    activeFilter === "All" || e.type === activeFilter
  );

  // Group by month
  const byMonth = filtered.reduce<Record<string, typeof filtered>>((acc, event) => {
    const month = new Date(event.date).toLocaleString("en-GB", { month: "long", year: "numeric" });
    (acc[month] ??= []).push(event);
    return acc;
  }, {});

  function toggleReminder(id: string, title: string) {
    setReminders(prev => {
      const has = prev.includes(id);
      toast({
        description: has
          ? `Reminder removed for ${title}`
          : `Reminder set for ${title}`,
      });
      return has ? prev.filter(r => r !== id) : [...prev, id];
    });
  }

  const nextEvent = upcomingEvents[0];

  return (
    <Layout variant="app">
      <div className="container py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              <span className="gradient-text">Cosmic Calendar</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Upcoming astrological events and what they mean for you.
            </p>
          </div>
          {/* View toggle */}
          <div className="flex rounded-lg border border-border overflow-hidden flex-shrink-0">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode("list")}
            >
              List
            </Button>
            <Button
              variant={viewMode === "month" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode("month")}
            >
              Month
            </Button>
          </div>
        </div>

        {/* Next event highlight */}
        {nextEvent && (
          <Card className="relative overflow-hidden gradient-cosmic border-primary/30">
            <div className="starfield opacity-20" />
            <CardContent className="relative z-10 py-5">
              <div className="flex items-center gap-4">
                <div className="text-4xl animate-float flex-shrink-0">
                  {eventTypeEmoji[nextEvent.type]}
                </div>
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Next Cosmic Event</p>
                  <p className="text-white font-bold text-lg">{nextEvent.title}</p>
                  <p className="text-white/70 text-sm">{nextEvent.date} · {nextEvent.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(f => (
            <Button
              key={f.value}
              size="sm"
              variant={activeFilter === f.value ? "default" : "outline"}
              className="gap-1.5"
              onClick={() => setActiveFilter(f.value)}
            >
              <span>{f.emoji}</span>
              {f.label}
            </Button>
          ))}
        </div>

        {/* Month view */}
        {viewMode === "month" && (
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">March 2026</CardTitle>
            </CardHeader>
            <CardContent>
              <MonthGrid events={upcomingEvents} />
              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
                {Object.entries(eventTypeColor).map(([type, color]) => (
                  <div key={type} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                    <span className="capitalize">{type.replace("moon", " moon")}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* List view — grouped by month */}
        {viewMode === "list" && (
          <div className="space-y-6">
            {Object.entries(byMonth).map(([month, events]) => (
              <div key={month}>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                    {month}
                  </h2>
                  <Separator className="flex-1" />
                  <Badge variant="outline" className="text-xs">{events.length} event{events.length !== 1 ? "s" : ""}</Badge>
                </div>
                <div className="space-y-3">
                  {events.map(event => (
                    <EventCard
                      key={event.id}
                      event={event}
                      expanded={expandedId === event.id}
                      onToggle={() => setExpandedId(expandedId === event.id ? null : event.id)}
                      hasReminder={reminders.includes(event.id)}
                      onReminder={() => toggleReminder(event.id, event.title)}
                    />
                  ))}
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <Card className="glass-card">
                <CardContent className="py-12 text-center text-muted-foreground text-sm">
                  <CalIcon className="h-8 w-8 mx-auto mb-3 opacity-40" />
                  No events matching this filter.
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
