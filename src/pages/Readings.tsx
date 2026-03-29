import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Layout from "@/components/Layout";
import {
  readingTypes,
  mockGeneratedReading,
  mockReadings,
  mockUserStats,
  type ReadingType,
} from "@/lib/cosmic-data";
import {
  Star, Sparkles, Download, Share2, Bookmark,
  ChevronDown, ChevronUp, RefreshCw, Zap, Lock
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Reading Type Selector ─────────────────────────────────────

function ReadingTypeSelector({
  selected, onSelect, customQuestion, onCustomChange
}: {
  selected: string;
  onSelect: (id: string) => void;
  customQuestion: string;
  onCustomChange: (v: string) => void;
}) {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Choose Your Reading</CardTitle>
        <p className="text-sm text-muted-foreground">
          Select the type of cosmic guidance you are seeking.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {readingTypes.map((rt: ReadingType) => (
            <button
              key={rt.id}
              type="button"
              onClick={() => onSelect(rt.id)}
              className={cn(
                "flex flex-col gap-2 p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer",
                selected === rt.id
                  ? "border-primary bg-primary/10 scale-[1.02] shadow-md shadow-primary/20"
                  : "border-border hover:border-primary/40 hover:bg-muted/50"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{rt.emoji}</span>
                <Badge variant="outline" className="text-xs gap-1">
                  <Zap className="h-2.5 w-2.5" />
                  {rt.creditsRequired} credit{rt.creditsRequired !== 1 ? "s" : ""}
                </Badge>
              </div>
              <p className="font-semibold text-sm">{rt.label}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{rt.description}</p>
            </button>
          ))}
        </div>

        {selected === "custom" && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Your question for the universe</p>
            <Textarea
              placeholder="e.g. What is the universe trying to show me about my relationship right now?"
              value={customQuestion}
              onChange={(e) => onCustomChange(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── Generate Button ───────────────────────────────────────────

function GenerateSection({
  loading, creditsLeft, onGenerate
}: {
  loading: boolean;
  creditsLeft: number;
  onGenerate: () => void;
}) {
  const noCredits = creditsLeft <= 0;

  return (
    <Card className={cn("glass-card", noCredits ? "border-amber-500/30 bg-amber-500/5" : "")}>
      <CardContent className="pt-5 pb-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold mb-0.5">
              {noCredits ? "You are out of credits" : "Ready to receive your reading?"}
            </p>
            <p className="text-sm text-muted-foreground">
              {noCredits
                ? "Upgrade to Celestial for unlimited readings."
                : `${creditsLeft} credit${creditsLeft !== 1 ? "s" : ""} remaining this month`}
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {noCredits ? (
              <Link to="/onboarding">
                <Button className="gap-2">
                  <Lock className="h-4 w-4" />
                  Upgrade Plan
                </Button>
              </Link>
            ) : (
              <Button
                onClick={onGenerate}
                disabled={loading}
                className="gap-2 min-w-[180px]"
              >
                {loading ? (
                  <>
                    <Star className="h-4 w-4 animate-spin" />
                    The cosmos is speaking…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Reading
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Reading Output ─────────────────────────────────────────────

function ReadingOutput({ onReset }: { onReset: () => void }) {
  const r = mockGeneratedReading;

  return (
    <Card className="glass-card border-primary/30 animate-fade-up">
      <CardContent className="pt-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="text-4xl animate-float">{readingTypes.find(rt => rt.id === "daily")?.emoji ?? "🌟"}</div>
            <div>
              <Badge variant="outline" className="mb-2">{r.type}</Badge>
              <h2 className="font-bold text-xl gradient-text">{r.title}</h2>
              <p className="text-xs text-muted-foreground mt-1">{r.generatedAt}</p>
            </div>
          </div>
          {/* Energy Score */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke="hsl(var(--primary))" strokeWidth="3"
                  strokeDasharray={`${r.energyScore} 100`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                {r.energyScore}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Energy</p>
          </div>
        </div>

        {/* Theme + Keywords */}
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-primary/20 text-primary border-primary/30">{r.theme}</Badge>
          {r.keywords.map(k => (
            <Badge key={k} variant="outline" className="text-xs">{k}</Badge>
          ))}
        </div>

        <Separator />

        {/* Body */}
        <div className="space-y-4">
          {r.body.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed text-foreground/90 italic">
              {para}
            </p>
          ))}
        </div>

        {/* Planets */}
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="text-xs text-muted-foreground">Key planets:</span>
          {r.planets.map(p => (
            <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
          ))}
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="default" className="gap-1.5">
            <Bookmark className="h-3.5 w-3.5" />
            Save Reading
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5">
            <Download className="h-3.5 w-3.5" />
            Download PDF
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5">
            <Share2 className="h-3.5 w-3.5" />
            Share
          </Button>
          <Button size="sm" variant="ghost" className="gap-1.5 ml-auto text-muted-foreground" onClick={onReset}>
            <RefreshCw className="h-3.5 w-3.5" />
            New Reading
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Reading History ───────────────────────────────────────────

const historyFilters = ["All", "Daily Cosmic", "Birth Chart", "Love", "Career"];

const readingEmoji: Record<string, string> = {
  "Daily Cosmic Reading":     "🌟",
  "Birth Chart Analysis":     "🌌",
  "Love & Relationship Reading": "💕",
  "Career & Purpose Reading": "✨",
};

function ReadingHistory() {
  const [filter, setFilter] = useState("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = mockReadings.filter((r) =>
    filter === "All" || r.type.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Reading History</CardTitle>
        {/* Filter bar */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {historyFilters.map(f => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              className="h-7 text-xs"
              onClick={() => setFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No readings of this type yet.
          </div>
        )}
        {filtered.map((r, i) => (
          <div key={r.id}>
            <Collapsible open={openId === r.id} onOpenChange={(open) => setOpenId(open ? r.id : null)}>
              <CollapsibleTrigger asChild>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group">
                  <span className="text-2xl flex-shrink-0">{readingEmoji[r.type] ?? "⭐"}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm truncate">{r.type}</p>
                      <Badge variant="outline" className="text-xs flex-shrink-0">{r.theme}</Badge>
                      <span className="text-xs text-muted-foreground flex-shrink-0">{r.score}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{r.summary.slice(0, 80)}…</p>
                    <p className="text-xs text-muted-foreground mt-1">{r.date}</p>
                  </div>
                  <div className="flex-shrink-0 text-muted-foreground">
                    {openId === r.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-3 pb-3 pt-1 space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed italic">{r.summary}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1.5 text-xs h-7">
                      <Download className="h-3 w-3" />
                      PDF
                    </Button>
                    <Button size="sm" variant="ghost" className="gap-1.5 text-xs h-7">
                      <Share2 className="h-3 w-3" />
                      Share
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Energy score</span>
                    <Progress value={r.score} className="h-1.5 flex-1" />
                    <span className="text-xs font-medium">{r.score}%</span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
            {i < filtered.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// ── Page ─────────────────────────────────────────────────────

export default function Readings() {
  const [selectedType, setSelectedType] = useState("daily");
  const [customQuestion, setCustomQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const { creditsRemaining } = mockUserStats;

  function handleGenerate() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 1800);
  }

  return (
    <Layout variant="app">
      <div className="container py-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">
            <span className="gradient-text">Cosmic Readings</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            AI-generated guidance personalised to your birth chart and current cosmic weather.
          </p>
        </div>

        {/* Type Selector */}
        <ReadingTypeSelector
          selected={selectedType}
          onSelect={setSelectedType}
          customQuestion={customQuestion}
          onCustomChange={setCustomQuestion}
        />

        {/* Generate */}
        <GenerateSection
          loading={loading}
          creditsLeft={creditsRemaining}
          onGenerate={handleGenerate}
        />

        {/* Output */}
        {generated && (
          <div ref={outputRef}>
            <ReadingOutput onReset={() => { setGenerated(false); setSelectedType("daily"); }} />
          </div>
        )}

        {/* History */}
        <ReadingHistory />
      </div>
    </Layout>
  );
}
