import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Layout from "@/components/Layout";
import {
  getMoonPhase, journalPrompts, mockJournalEntries,
  type JournalEntry,
} from "@/lib/cosmic-data";
import {
  BookOpen, Flame, TrendingUp, Save, Check, ChevronDown,
  ChevronUp, Plus, Moon, Star
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Static Data ──────────────────────────────────────────────

const moonPhase = getMoonPhase();

const todayPrompt =
  journalPrompts.find((_, i) =>
    journalPrompts.indexOf(journalPrompts[i]) === 0
  ) ?? journalPrompts[0];

const INTENTION_TAGS = [
  { label: "Love",     color: "text-pink-400",   bg: "bg-pink-500/10",    border: "border-pink-500/30" },
  { label: "Career",   color: "text-blue-400",   bg: "bg-blue-500/10",    border: "border-blue-500/30" },
  { label: "Healing",  color: "text-green-400",  bg: "bg-green-500/10",   border: "border-green-500/30" },
  { label: "Spirit",   color: "text-violet-400", bg: "bg-violet-500/10",  border: "border-violet-500/30" },
  { label: "Clarity",  color: "text-cyan-400",   bg: "bg-cyan-500/10",    border: "border-cyan-500/30" },
  { label: "Wealth",   color: "text-amber-400",  bg: "bg-amber-500/10",   border: "border-amber-500/30" },
];

const MOOD_OPTIONS = [
  { value: 1, emoji: "😔", label: "Low" },
  { value: 2, emoji: "😐", label: "Neutral" },
  { value: 3, emoji: "🙂", label: "Good" },
  { value: 4, emoji: "😊", label: "Great" },
  { value: 5, emoji: "🌟", label: "Radiant" },
];

const journalStats = {
  totalEntries: 23,
  currentStreak: 7,
  longestStreak: 14,
  topThemes: ["Trust", "Growth", "Release", "Clarity", "Love"],
  averageWords: 267,
};

// ─── Journal Header / Prompt ──────────────────────────────────

function JournalHeader() {
  const phase = moonPhase;
  const prompt = journalPrompts[phase.dayInCycle % journalPrompts.length];

  return (
    <Card className="relative overflow-hidden gradient-cosmic border-primary/30">
      <div className="starfield opacity-20" />
      <CardContent className="relative z-10 py-6">
        <div className="flex items-start gap-5">
          <div className="text-5xl animate-float flex-shrink-0">{phase.emoji}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="border-white/30 text-white/80 text-xs">
                Today's Prompt
              </Badge>
              <span className="text-white/50 text-xs">
                {phase.phase} · {phase.illumination}% illuminated
              </span>
            </div>
            <p className="text-white text-base leading-relaxed italic">
              "{prompt}"
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── New Entry Card ───────────────────────────────────────────

function NewEntryCard({
  onSave
}: {
  onSave: (entry: JournalEntry) => void;
}) {
  const [text, setText] = useState("");
  const [mood, setMood] = useState(3);
  const [tags, setTags] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const canSave = wordCount >= 10;

  function toggleTag(label: string) {
    setTags(prev =>
      prev.includes(label) ? prev.filter(t => t !== label) : [...prev, label]
    );
  }

  function handleSave() {
    if (!canSave) return;
    const phase = getMoonPhase();
    onSave({
      id: `j-new-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      moonPhase: phase.phase,
      moonEmoji: phase.emoji,
      prompt: journalPrompts[phase.dayInCycle % journalPrompts.length],
      body: text,
      wordCount,
      intentions: tags,
      mood,
    });
    setText("");
    setTags([]);
    setMood(3);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Plus className="h-4 w-4 text-primary" />
          New Entry
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Textarea */}
        <div>
          <Textarea
            placeholder="Begin writing… let the words flow without judgment."
            value={text}
            onChange={e => setText(e.target.value)}
            rows={6}
            className="resize-none"
          />
          <div className="flex items-center justify-between mt-1.5">
            <span className={cn("text-xs", wordCount >= 10 ? "text-muted-foreground" : "text-amber-500")}>
              {wordCount} words {wordCount < 10 ? `(${10 - wordCount} more to unlock save)` : ""}
            </span>
            <span className="text-xs text-muted-foreground">
              ~{Math.ceil(wordCount / 200)} min read
            </span>
          </div>
        </div>

        {/* Mood selector */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">How are you feeling?</p>
          <div className="flex gap-2">
            {MOOD_OPTIONS.map(m => (
              <button
                key={m.value}
                type="button"
                onClick={() => setMood(m.value)}
                title={m.label}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-lg border transition-all text-lg",
                  mood === m.value
                    ? "border-primary bg-primary/10 scale-105"
                    : "border-border hover:border-primary/40"
                )}
              >
                <span>{m.emoji}</span>
                <span className="text-[10px] text-muted-foreground">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Intention tags */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Tag your intentions</p>
          <div className="flex flex-wrap gap-2">
            {INTENTION_TAGS.map(({ label, color, bg, border }) => (
              <button
                key={label}
                type="button"
                onClick={() => toggleTag(label)}
                className={cn(
                  "px-3 py-1 rounded-full border text-xs font-medium transition-all",
                  tags.includes(label)
                    ? `${border} ${bg} ${color}`
                    : "border-border text-muted-foreground hover:border-primary/40"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Save button */}
        <Button
          className="w-full gap-2"
          disabled={!canSave}
          onClick={handleSave}
          variant={saved ? "outline" : "default"}
        >
          {saved ? (
            <>
              <Check className="h-4 w-4 text-green-400" />
              Entry saved to the cosmos
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Entry
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── Past Entry Card ──────────────────────────────────────────

function EntryCard({
  entry, expanded, onToggle
}: {
  entry: JournalEntry;
  expanded: boolean;
  onToggle: () => void;
}) {
  const moodEmoji = MOOD_OPTIONS.find(m => m.value === entry.mood)?.emoji ?? "🙂";

  return (
    <Card className="glass-card">
      <CardContent className="pt-4 pb-4">
        <Collapsible open={expanded} onOpenChange={onToggle}>
          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl flex-shrink-0">{entry.moonEmoji}</span>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{entry.date}</p>
                  <span className="text-xs text-muted-foreground">{entry.moonPhase}</span>
                  <span className="text-base">{moodEmoji}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {entry.intentions.map(t => (
                    <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0">
                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
          </div>

          {/* Preview (always shown) */}
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            {expanded ? "" : entry.body.slice(0, 160) + (entry.body.length > 160 ? "…" : "")}
          </p>

          {/* Full content */}
          <CollapsibleContent>
            <div className="mt-3 space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary/30 pl-3">
                "{entry.prompt}"
              </p>
              <p className="text-sm leading-relaxed">{entry.body}</p>
              <p className="text-xs text-muted-foreground">{entry.wordCount} words</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}

// ─── Stats Sidebar ────────────────────────────────────────────

function StatsSidebar() {
  const s = journalStats;
  const phase = moonPhase;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Journal Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { icon: BookOpen, label: "Total Entries",   value: s.totalEntries },
            { icon: Flame,    label: "Current Streak",  value: `${s.currentStreak} days` },
            { icon: TrendingUp, label: "Longest Streak", value: `${s.longestStreak} days` },
            { icon: Star,     label: "Avg. Words",      value: s.averageWords },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="h-3.5 w-3.5" />
                {label}
              </div>
              <span className="text-sm font-semibold">{value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top themes */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Your Themes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1.5">
            {s.topThemes.map(theme => (
              <Badge key={theme} variant="secondary" className="text-xs">{theme}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Moon guide */}
      <Card className="glass-card border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Moon className="h-4 w-4 text-primary" />
            {phase.phase} Writing Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {phase.description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>(mockJournalEntries);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function handleSave(entry: JournalEntry) {
    setEntries(prev => [entry, ...prev]);
  }

  return (
    <Layout variant="app">
      <div className="container py-8 space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold">
            <span className="gradient-text">Cosmic Journal</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Capture your intentions, reflections, and cosmic insights.
          </p>
        </div>

        {/* Moon prompt header */}
        <JournalHeader />

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: new entry + past entries */}
          <div className="lg:col-span-2 space-y-4">
            <NewEntryCard onSave={handleSave} />

            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Past Entries ({entries.length})
              </h2>
              {entries.map(entry => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  expanded={expandedId === entry.id}
                  onToggle={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                />
              ))}
              {entries.length === 0 && (
                <Card className="glass-card">
                  <CardContent className="py-12 text-center text-muted-foreground text-sm">
                    <Moon className="h-8 w-8 mx-auto mb-3 opacity-40" />
                    No entries yet. Begin your first cosmic reflection above.
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Right: stats sidebar */}
          <div>
            <StatsSidebar />
          </div>
        </div>
      </div>
    </Layout>
  );
}
