import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { pricingPlans } from "@/lib/cosmic-data";
import {
  Check, Zap, Star, Shield, ArrowRight, Sparkles,
  Users, Globe, MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Plan comparison feature matrix ──────────────────────────
const allFeatures = [
  { feature: "AI readings per month",      free: "3",         pro: "Unlimited",  premium: "Unlimited" },
  { feature: "Daily moon phase tracker",   free: true,        pro: true,         premium: true        },
  { feature: "Daily affirmation",          free: true,        pro: true,         premium: true        },
  { feature: "Cosmic journal",             free: "3 entries", pro: "Unlimited",  premium: "Unlimited" },
  { feature: "Basic birth chart",          free: true,        pro: false,        premium: false       },
  { feature: "Full birth chart analysis",  free: false,       pro: true,         premium: true        },
  { feature: "Planetary transit alerts",   free: false,       pro: true,         premium: true        },
  { feature: "Monthly cosmic report PDF",  free: false,       pro: true,         premium: true        },
  { feature: "Community access",           free: true,        pro: true,         premium: true        },
  { feature: "Priority support",           free: false,       pro: true,         premium: true        },
  { feature: "1:1 practitioner sessions",  free: false,       pro: false,        premium: "2 / month" },
  { feature: "Corporate team reports",     free: false,       pro: false,        premium: true        },
  { feature: "API access",                 free: false,       pro: false,        premium: "500 calls/mo"},
  { feature: "White-label readings",       free: false,       pro: false,        premium: true        },
  { feature: "VIP cosmic events access",   free: false,       pro: false,        premium: true        },
];

const faqs = [
  {
    q: "Can I change my plan at any time?",
    a: "Yes — upgrade or downgrade instantly. Upgrades take effect immediately. Downgrades apply at your next billing cycle.",
  },
  {
    q: "What happens to my data if I downgrade?",
    a: "Your journal entries, readings, and birth chart are always preserved regardless of plan. Premium features simply become inaccessible until you re-upgrade.",
  },
  {
    q: "Do unused credits roll over?",
    a: "On the free plan, credits reset each month. Purchased credit packs never expire and roll over indefinitely.",
  },
  {
    q: "Is there a student or hardship discount?",
    a: "Yes — contact our support team with verification and we offer 40% off the Celestial plan. We believe cosmic guidance should be accessible to everyone.",
  },
  {
    q: "How do practitioner sessions work on the Galactic plan?",
    a: "Each month you receive 2 session credits bookable with any verified practitioner on the platform. Credits reset monthly and cannot roll over.",
  },
];

// ─── Sub-components ───────────────────────────────────────────

function FeatureValue({ val }: { val: boolean | string }) {
  if (val === false) return <span className="text-muted-foreground/40 text-lg">—</span>;
  if (val === true) return <Check className="h-4 w-4 text-green-400 mx-auto" />;
  return <span className="text-xs font-medium text-center block">{val}</span>;
}

function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left py-3 pr-6 font-medium text-muted-foreground w-1/2">Feature</th>
            {["Stardust", "Celestial", "Galactic"].map(name => (
              <th key={name} className="text-center py-3 px-4 font-semibold w-[16%]">{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allFeatures.map(({ feature, free, pro, premium }, i) => (
            <tr key={feature} className={cn(i % 2 === 0 ? "bg-muted/20" : "", "hover:bg-muted/30 transition-colors")}>
              <td className="py-2.5 pr-6 text-muted-foreground text-xs">{feature}</td>
              <td className="py-2.5 px-4 text-center"><FeatureValue val={free} /></td>
              <td className="py-2.5 px-4 text-center"><FeatureValue val={pro} /></td>
              <td className="py-2.5 px-4 text-center"><FeatureValue val={premium} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TrustBadges() {
  const badges = [
    { icon: Shield,       label: "SSL Encrypted",     sub: "Bank-grade security" },
    { icon: Star,         label: "4.9 / 5 Rating",    sub: "12,000+ reviews" },
    { icon: Users,        label: "50,000+ Members",   sub: "Active community" },
    { icon: Globe,        label: "30-Day Guarantee",  sub: "Full refund policy" },
    { icon: MessageSquare,label: "24/7 Support",      sub: "Average reply < 2h" },
  ];
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {badges.map(({ icon: Icon, label, sub }) => (
        <div key={label} className="flex flex-col items-center gap-1 text-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-xs text-muted-foreground">{sub}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const discount = annual ? 0.8 : 1; // 20% off annual

  return (
    <Layout variant="landing">
      <div className="container py-16 space-y-20">

        {/* ── Hero ────────────────────────────────────────────── */}
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="mb-2">Pricing</Badge>
          <h1 className="text-4xl md:text-5xl font-bold">
            Choose Your <span className="gradient-text">Cosmic Plan</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start free — no credit card required. Upgrade whenever you're ready.
            All plans include our core cosmic toolkit.
          </p>

          {/* Annual / Monthly toggle */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <Label htmlFor="billing-toggle" className={cn("text-sm", !annual && "font-semibold")}>
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={annual}
              onCheckedChange={setAnnual}
            />
            <Label htmlFor="billing-toggle" className={cn("text-sm flex items-center gap-2", annual && "font-semibold")}>
              Annual
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Save 20%</Badge>
            </Label>
          </div>
        </div>

        {/* ── Plan Cards ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map(plan => {
            const monthlyPrice = plan.price === 0 ? 0 : plan.price * discount;
            return (
              <Card
                key={plan.id}
                className={cn(
                  "relative flex flex-col transition-all duration-300 hover:-translate-y-1",
                  plan.highlighted
                    ? "border-primary shadow-xl shadow-primary/20 bg-primary/5"
                    : "glass-card"
                )}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1 gap-1">
                      <Zap className="h-3 w-3" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <h3 className="font-bold text-xl">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      {monthlyPrice === 0 ? "Free" : `$${monthlyPrice.toFixed(2)}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground text-sm ml-1">/ month{annual ? " (billed annually)" : ""}</span>
                    )}
                  </div>
                  {annual && plan.price > 0 && (
                    <p className="text-xs text-green-400">
                      Save ${(plan.price * 12 * 0.2).toFixed(0)} per year
                    </p>
                  )}
                </CardHeader>
                <CardContent className="flex flex-col flex-1 gap-4">
                  <ul className="space-y-2.5 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <div className="mt-0.5 w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="h-2.5 w-2.5 text-primary" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/onboarding">
                    <Button className="w-full gap-1.5 mt-4" variant={plan.highlighted ? "default" : "outline"}>
                      {plan.cta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground -mt-12">
          All paid plans include a 7-day free trial and 30-day money-back guarantee. Cancel any time.
        </p>

        {/* ── Comparison Table ─────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">
            Full <span className="gradient-text">Feature Comparison</span>
          </h2>
          <Card className="glass-card overflow-hidden">
            <CardContent className="p-4 md:p-6">
              <ComparisonTable />
            </CardContent>
          </Card>
        </div>

        {/* ── Trust Badges ─────────────────────────────────────── */}
        <div>
          <TrustBadges />
        </div>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Card key={i} className="glass-card">
                <button
                  type="button"
                  className="w-full flex items-center justify-between p-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-sm pr-4">{faq.q}</span>
                  <span className="text-primary text-lg flex-shrink-0">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <>
                    <Separator />
                    <p className="px-4 py-3 text-sm text-muted-foreground leading-relaxed animate-fade-up">
                      {faq.a}
                    </p>
                  </>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* ── Final CTA ────────────────────────────────────────── */}
        <div className="relative rounded-3xl overflow-hidden gradient-cosmic p-12 text-center">
          <div className="starfield opacity-40" />
          <div className="relative z-10">
            <div className="text-5xl mb-4">🌟</div>
            <h2 className="text-3xl font-bold text-white mb-3">
              Still deciding? <span className="gradient-text">Start free.</span>
            </h2>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              No credit card required. Explore the cosmos at your own pace and upgrade only when you're ready.
            </p>
            <Link to="/onboarding">
              <Button size="lg" className="gap-2 animate-pulse-glow">
                <Sparkles className="h-4 w-4" />
                Begin for Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
