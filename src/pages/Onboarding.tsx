import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { zodiacSigns, getZodiacSign } from "@/lib/cosmic-data";
import {
  Star, Sparkles, Moon, Heart, Briefcase, Leaf,
  Coins, ArrowRight, ArrowLeft, Check, ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  birthTime: string;
  birthCity: string;
  intentions: string[];
}

const INTENTIONS = [
  { id: "love",      label: "Love & Relationships", icon: Heart,     color: "text-pink-400",   bg: "bg-pink-500/10",    border: "border-pink-500/30" },
  { id: "career",    label: "Career & Purpose",     icon: Briefcase, color: "text-blue-400",   bg: "bg-blue-500/10",    border: "border-blue-500/30" },
  { id: "healing",   label: "Healing & Wellness",   icon: Leaf,      color: "text-green-400",  bg: "bg-green-500/10",   border: "border-green-500/30" },
  { id: "abundance", label: "Abundance & Wealth",   icon: Coins,     color: "text-amber-400",  bg: "bg-amber-500/10",   border: "border-amber-500/30" },
  { id: "spiritual", label: "Spiritual Growth",     icon: Sparkles,  color: "text-violet-400", bg: "bg-violet-500/10",  border: "border-violet-500/30" },
  { id: "clarity",   label: "Clarity & Intuition",  icon: Moon,      color: "text-cyan-400",   bg: "bg-cyan-500/10",    border: "border-cyan-500/30" },
];

const TOTAL_STEPS = 4;

// ─── Step Components ──────────────────────────────────────────

function StepPersonal({
  data, onChange
}: {
  data: FormData;
  onChange: (key: keyof FormData, val: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-5xl mb-4">👤</div>
        <h2 className="text-2xl font-bold mb-2">Welcome, Cosmic Explorer</h2>
        <p className="text-muted-foreground">Tell us a little about yourself to begin.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="e.g. Sophia"
            value={data.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="e.g. Laurent"
            value={data.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          We'll send your first cosmic reading to this address.
        </p>
      </div>
    </div>
  );
}

function StepBirth({
  data, onChange
}: {
  data: FormData;
  onChange: (key: keyof FormData, val: string) => void;
}) {
  const sign = (() => {
    if (!data.birthDate) return null;
    const d = new Date(data.birthDate);
    return getZodiacSign(d.getMonth() + 1, d.getDate());
  })();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-5xl mb-4">🌌</div>
        <h2 className="text-2xl font-bold mb-2">Your Cosmic Blueprint</h2>
        <p className="text-muted-foreground">
          Your birth details are the foundation of your personal natal chart.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="birthDate">Date of Birth</Label>
          <Input
            id="birthDate"
            type="date"
            value={data.birthDate}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => onChange("birthDate", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthTime" className="flex items-center gap-2">
            Time of Birth
            <Badge variant="outline" className="text-xs font-normal">Optional but recommended</Badge>
          </Label>
          <Input
            id="birthTime"
            type="time"
            value={data.birthTime}
            onChange={(e) => onChange("birthTime", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Birth time determines your Ascendant sign and house placements for deeper accuracy.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthCity">City of Birth</Label>
          <div className="relative">
            <Input
              id="birthCity"
              placeholder="e.g. London, UK"
              value={data.birthCity}
              onChange={(e) => onChange("birthCity", e.target.value)}
            />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Zodiac preview */}
      {sign && (
        <Card className="glass-card border-primary/30 bg-primary/5">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{sign.emoji}</div>
              <div>
                <p className="text-sm text-muted-foreground mb-0.5">Your Sun Sign</p>
                <p className="font-bold text-lg">
                  {sign.symbol} {sign.name}
                </p>
                <div className="flex gap-1.5 mt-1">
                  {sign.traits.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StepIntentions({
  data, onToggle
}: {
  data: FormData;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-5xl mb-4">✨</div>
        <h2 className="text-2xl font-bold mb-2">Set Your Cosmic Intentions</h2>
        <p className="text-muted-foreground">
          What are you calling into your life? Select all that resonate.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {INTENTIONS.map(({ id, label, icon: Icon, color, bg, border }) => {
          const selected = data.intentions.includes(id);
          return (
            <button
              key={id}
              type="button"
              onClick={() => onToggle(id)}
              className={cn(
                "relative flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer",
                selected
                  ? `${border} ${bg} scale-[1.02]`
                  : "border-border hover:border-primary/40 hover:bg-muted/50"
              )}
            >
              <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <span className="font-medium text-sm">{label}</span>
              {selected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {data.intentions.length > 0 && (
        <p className="text-center text-sm text-muted-foreground">
          {data.intentions.length} intention{data.intentions.length !== 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}

function StepComplete({ data }: { data: FormData }) {
  const sign = (() => {
    if (!data.birthDate) return null;
    const d = new Date(data.birthDate);
    return getZodiacSign(d.getMonth() + 1, d.getDate());
  })();

  return (
    <div className="space-y-6 text-center">
      <div className="relative flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center animate-pulse-glow">
          <Star className="h-10 w-10 text-primary fill-primary" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">
          Welcome,{" "}
          <span className="gradient-text">
            {data.firstName || "Cosmic Explorer"}
          </span>
          !
        </h2>
        <p className="text-muted-foreground">
          Your cosmic profile has been created. Your journey begins now.
        </p>
      </div>

      <Card className="glass-card text-left">
        <CardContent className="pt-6 space-y-3">
          {sign && (
            <div className="flex items-center gap-3">
              <span className="text-2xl">{sign.emoji}</span>
              <div>
                <p className="text-xs text-muted-foreground">Sun Sign</p>
                <p className="font-semibold">{sign.name} {sign.symbol}</p>
              </div>
            </div>
          )}
          {sign && <Separator />}
          {data.intentions.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Your Intentions</p>
              <div className="flex flex-wrap gap-1.5">
                {data.intentions.map((id) => {
                  const intent = INTENTIONS.find((i) => i.id === id);
                  return intent ? (
                    <Badge key={id} variant="secondary" className="gap-1">
                      {intent.label}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 justify-center">
          <Check className="h-4 w-4 text-green-400" />
          <span>Your first AI reading is ready</span>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <Check className="h-4 w-4 text-green-400" />
          <span>3 free credits added to your account</span>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <Check className="h-4 w-4 text-green-400" />
          <span>Daily cosmic weather unlocked</span>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    birthTime: "",
    birthCity: "",
    intentions: [],
  });

  function handleChange(key: keyof FormData, val: string) {
    setData((prev) => ({ ...prev, [key]: val }));
  }

  function handleToggleIntention(id: string) {
    setData((prev) => ({
      ...prev,
      intentions: prev.intentions.includes(id)
        ? prev.intentions.filter((i) => i !== id)
        : [...prev.intentions, id],
    }));
  }

  function canAdvance(): boolean {
    if (step === 1) return Boolean(data.firstName && data.email);
    if (step === 2) return Boolean(data.birthDate && data.birthCity);
    if (step === 3) return data.intentions.length > 0;
    return true;
  }

  function handleNext() {
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
    else navigate("/dashboard");
  }

  const stepLabels = ["Your Info", "Birth Details", "Intentions", "Complete"];

  return (
    <div className="min-h-screen gradient-cosmic flex items-center justify-center p-4 relative">
      <div className="starfield opacity-40" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-white mb-2">
            <Star className="h-5 w-5 text-primary fill-primary" />
            <span className="font-bold text-lg gradient-text">Cosmic Order Explorer</span>
          </div>
          <p className="text-white/60 text-sm">Your cosmic journey begins here</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {stepLabels.map((label, i) => (
              <span
                key={label}
                className={cn(
                  "text-xs font-medium transition-colors",
                  i + 1 <= step ? "text-primary" : "text-white/30"
                )}
              >
                {label}
              </span>
            ))}
          </div>
          <Progress value={(step / TOTAL_STEPS) * 100} className="h-1.5" />
        </div>

        {/* Card */}
        <Card className="glass-card shadow-2xl shadow-black/40">
          <CardContent className="pt-6 pb-6">
            {step === 1 && <StepPersonal data={data} onChange={handleChange} />}
            {step === 2 && <StepBirth data={data} onChange={handleChange} />}
            {step === 3 && <StepIntentions data={data} onToggle={handleToggleIntention} />}
            {step === 4 && <StepComplete data={data} />}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-border/50">
              <Button
                variant="ghost"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="gap-1.5"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <span className="text-sm text-muted-foreground">
                Step {step} of {TOTAL_STEPS}
              </span>
              <Button
                onClick={handleNext}
                disabled={!canAdvance()}
                className="gap-1.5"
              >
                {step === TOTAL_STEPS ? (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Enter the Cosmos
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-white/40 text-xs mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
