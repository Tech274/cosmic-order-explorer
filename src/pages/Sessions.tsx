import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import Layout from "@/components/Layout";
import { practitioners, type Practitioner } from "@/lib/cosmic-data";
import {
  Star, Calendar, Clock, Globe, Shield, Search,
  Video, Check, ChevronRight, Sparkles, Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// ─── Static data ──────────────────────────────────────────────

const SPECIALTIES = [
  "All", "Astrology", "Tarot", "Numerology", "Human Design",
  "Relationships", "Career", "Spiritual Awakening",
];

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "7:00 PM",
];

const badgeStyles: Record<string, string> = {
  "Top Rated":    "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "Verified":     "bg-green-500/20 text-green-300 border-green-500/30",
  "Fast Responder":"bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Certified":    "bg-violet-500/20 text-violet-300 border-violet-500/30",
  "Rising Star":  "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "Expert":       "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "Multilingual": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
};

// ─── Booking Dialog ───────────────────────────────────────────

function BookingDialog({
  practitioner, open, onClose
}: {
  practitioner: Practitioner | null;
  open: boolean;
  onClose: () => void;
}) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDate] = useState("2026-03-05");
  const { toast } = useToast();

  if (!practitioner) return null;

  function handleConfirm() {
    toast({
      description: `Session booked with ${practitioner!.name} on ${selectedDate} at ${selectedSlot}. Confirmation sent to your email.`,
    });
    onClose();
    setSelectedSlot(null);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center">
              {practitioner.avatar}
            </div>
            <div>
              <p className="font-bold">{practitioner.name}</p>
              <p className="text-xs text-muted-foreground font-normal">{practitioner.title}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Date */}
          <div>
            <p className="text-sm font-medium mb-2">Select Date</p>
            <Input type="date" defaultValue={selectedDate} className="w-full" />
          </div>

          {/* Time slots */}
          <div>
            <p className="text-sm font-medium mb-2">Select Time (Your local timezone)</p>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={cn(
                    "px-2 py-1.5 rounded-lg border text-xs font-medium transition-all",
                    selectedSlot === slot
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          {selectedSlot && (
            <div className="rounded-xl bg-muted/40 p-3 space-y-1 text-sm animate-fade-up">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Session (60 min)</span>
                <span className="font-medium">${practitioner.pricePerHour}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform fee</span>
                <span className="font-medium">$0.00</span>
              </div>
              <Separator className="my-1" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${practitioner.pricePerHour}.00</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button disabled={!selectedSlot} onClick={handleConfirm} className="gap-1.5">
            <Check className="h-4 w-4" />
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Practitioner Card ────────────────────────────────────────

function PractitionerCard({
  practitioner, onBook
}: {
  practitioner: Practitioner;
  onBook: (p: Practitioner) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="glass-card hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
      <CardContent className="pt-5 pb-5 space-y-4">
        {/* Header */}
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary font-bold text-lg flex items-center justify-center flex-shrink-0 ring-2 ring-primary/20">
            {practitioner.avatar}
          </div>
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-bold">{practitioner.name}</p>
                <p className="text-sm text-muted-foreground">{practitioner.title}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-sm">${practitioner.pricePerHour}</p>
                <p className="text-xs text-muted-foreground">/ hour</p>
              </div>
            </div>
            {/* Rating & sessions */}
            <div className="flex items-center gap-3 mt-1.5">
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium">{practitioner.rating}</span>
                <span className="text-xs text-muted-foreground">({practitioner.reviews})</span>
              </div>
              <span className="text-muted-foreground text-xs">·</span>
              <span className="text-xs text-muted-foreground">{practitioner.sessionsCompleted.toLocaleString()} sessions</span>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          {practitioner.badges.map(b => (
            <Badge key={b} variant="outline" className={cn("text-xs", badgeStyles[b] ?? "")}>
              {b === "Verified" && <Shield className="h-2.5 w-2.5 mr-1" />}
              {b}
            </Badge>
          ))}
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-1">
          {practitioner.specialties.map(s => (
            <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
          ))}
        </div>

        {/* Bio (expandable) */}
        <div>
          <p className={cn("text-sm text-muted-foreground leading-relaxed", !expanded && "line-clamp-2")}>
            {practitioner.bio}
          </p>
          <button
            type="button"
            className="text-xs text-primary mt-1 hover:underline"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        </div>

        <Separator />

        {/* Footer */}
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              <span className="text-foreground font-medium">{practitioner.nextAvailable}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="h-3 w-3" />
              {practitioner.languages.join(", ")}
            </div>
          </div>
          <Button onClick={() => onBook(practitioner)} className="gap-1.5 flex-shrink-0">
            <Calendar className="h-4 w-4" />
            Book Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── How it works ─────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    { emoji: "🔍", title: "Find Your Guide",   desc: "Browse verified practitioners and filter by specialty, language, or budget." },
    { emoji: "📅", title: "Book a Time Slot",  desc: "Choose from available slots in your local timezone. No back-and-forth emails." },
    { emoji: "🎥", title: "Connect via Video", desc: "Join your secure video session directly in the app — no extra software needed." },
  ];
  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">How Practitioner Sessions Work</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {steps.map(({ emoji, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-2">
              <div className="text-3xl">{emoji}</div>
              <p className="font-semibold text-sm">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <Separator className="my-4" />
        <div className="flex flex-wrap gap-4 justify-center text-xs text-muted-foreground">
          {[
            { icon: Shield,    label: "Secure & encrypted video" },
            { icon: Check,     label: "Verified practitioners only" },
            { icon: Video,     label: "HD video, no downloads" },
            { icon: Sparkles,  label: "Full refund if unsatisfied" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5 text-primary" />
              {label}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function Sessions() {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [bookingFor, setBookingFor] = useState<Practitioner | null>(null);

  const filtered = practitioners.filter(p => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.specialties.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchSpecialty =
      specialty === "All" ||
      p.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase()));
    return matchSearch && matchSpecialty;
  });

  return (
    <Layout variant="app">
      <div className="container py-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">
            <span className="gradient-text">Book a Practitioner</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            1:1 sessions with verified astrologers, tarot readers, and cosmic coaches.
          </p>
        </div>

        {/* How it works */}
        <HowItWorks />

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or specialty…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            {SPECIALTIES.slice(0, 5).map(s => (
              <Button
                key={s}
                size="sm"
                variant={specialty === s ? "default" : "outline"}
                className="h-8 text-xs"
                onClick={() => setSpecialty(s)}
              >
                {s}
              </Button>
            ))}
          </div>
        </div>

        {/* Results header */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filtered.length} practitioner{filtered.length !== 1 ? "s" : ""} available
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ChevronRight className="h-3 w-3" />
            Sort: Top Rated
          </div>
        </div>

        {/* Practitioner grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map(p => (
            <PractitionerCard key={p.id} practitioner={p} onBook={setBookingFor} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground text-sm">
              No practitioners match your search.
            </div>
          )}
        </div>

        {/* Become a practitioner CTA */}
        <Card className="glass-card border-primary/20 bg-primary/5">
          <CardContent className="pt-5 pb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold">Are you an astrologer or cosmic coach?</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Join our practitioner marketplace and reach thousands of seekers.
              </p>
            </div>
            <Button variant="outline" className="gap-1.5 flex-shrink-0">
              <Sparkles className="h-4 w-4" />
              Apply to Join
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Booking dialog */}
      <BookingDialog
        practitioner={bookingFor}
        open={bookingFor !== null}
        onClose={() => setBookingFor(null)}
      />
    </Layout>
  );
}
