import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import Layout from "@/components/Layout";
import { mockBillingInfo, mockUserStats, creditPacks, pricingPlans } from "@/lib/cosmic-data";
import {
  CreditCard, Zap, Star, ArrowUpRight, Download, Shield,
  Check, RotateCcw, AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// ─── Current Plan Card ────────────────────────────────────────

function CurrentPlanCard() {
  const billing = mockBillingInfo;
  const isFreePlan = billing.plan === "free";
  const { toast } = useToast();

  const proPlan = pricingPlans.find(p => p.id === "pro")!;

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
          Current Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold">{billing.planName}</h3>
              <Badge variant={isFreePlan ? "outline" : "default"} className="text-xs">
                {isFreePlan ? "Free" : "Active"}
              </Badge>
            </div>
            {isFreePlan ? (
              <p className="text-sm text-muted-foreground">
                You are on the free plan. Upgrade for unlimited readings.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Next billing: <span className="text-foreground font-medium">{billing.nextBillingDate}</span>
                {" · "}${billing.amount.toFixed(2)} / month
              </p>
            )}
          </div>
        </div>

        {/* Credits progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Reading credits</span>
            <span className="font-medium">{billing.creditsRemaining} / {billing.creditsTotal} remaining</span>
          </div>
          <Progress value={(billing.creditsRemaining / billing.creditsTotal) * 100} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Resets on the 1st of each month · {billing.renewalCredits} credits on renewal
          </p>
        </div>

        <Separator />

        {isFreePlan ? (
          <div className="space-y-3">
            <p className="text-sm font-medium">Upgrade to Celestial and get:</p>
            <ul className="space-y-1.5">
              {proPlan.features.slice(0, 4).map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/pricing">
              <Button className="w-full gap-2 mt-2">
                <Zap className="h-4 w-4" />
                Upgrade to Celestial — $9.99/mo
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/pricing" className="flex-1">
              <Button variant="outline" className="w-full gap-1.5">
                <ArrowUpRight className="h-4 w-4" />
                Change Plan
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={() => toast({ description: "Cancellation request submitted — your plan stays active until the billing period ends." })}
            >
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Credits Card ─────────────────────────────────────────────

function CreditsCard() {
  const { creditsRemaining } = mockUserStats;
  const { toast } = useToast();
  const isLow = creditsRemaining <= 3;

  return (
    <Card className={cn("glass-card", isLow && "border-amber-500/30 bg-amber-500/5")}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-400" />
          Credit Balance
          {isLow && (
            <Badge variant="outline" className="ml-auto text-xs text-amber-400 border-amber-400/30 gap-1">
              <AlertTriangle className="h-3 w-3" />
              Running Low
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center py-4">
          <p className="text-5xl font-bold">{creditsRemaining}</p>
          <p className="text-muted-foreground text-sm mt-1">credits remaining</p>
        </div>
        <div className="space-y-2.5">
          {creditPacks.map(pack => (
            <div
              key={pack.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-xl border transition-all",
                pack.highlighted
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/40 hover:bg-muted/50"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="text-xl">⚡</div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{pack.credits} Credits</p>
                    {pack.badge && (
                      <Badge className="text-[10px] px-1.5 py-0">{pack.badge}</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">${pack.perCredit.toFixed(2)} / credit</p>
                </div>
              </div>
              <Button
                size="sm"
                variant={pack.highlighted ? "default" : "outline"}
                onClick={() => toast({ description: `${pack.credits} credits added! $${pack.price.toFixed(2)} charged.` })}
              >
                ${pack.price.toFixed(2)}
              </Button>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Credits never expire and are separate from your plan's monthly allocation.
        </p>
      </CardContent>
    </Card>
  );
}

// ─── Payment Method Card ──────────────────────────────────────

function PaymentMethodCard() {
  const { toast } = useToast();
  const hasCard = Boolean(mockBillingInfo.cardLast4);

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-primary" />
          Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasCard ? (
          <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/30">
            <div className="w-10 h-7 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {mockBillingInfo.cardBrand}
            </div>
            <div>
              <p className="text-sm font-medium">•••• •••• •••• {mockBillingInfo.cardLast4}</p>
              <p className="text-xs text-muted-foreground">Expires 04/28</p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="ml-auto text-xs"
              onClick={() => toast({ description: "Card update form would open here." })}
            >
              Update
            </Button>
          </div>
        ) : (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
              <CreditCard className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">No payment method on file.</p>
          </div>
        )}

        <Button
          className="w-full gap-2"
          variant="outline"
          onClick={() => toast({ description: "Stripe checkout would open here." })}
        >
          <CreditCard className="h-4 w-4" />
          {hasCard ? "Change Payment Method" : "Add Payment Method"}
        </Button>
        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Shield className="h-3 w-3" />
          Secured by Stripe — we never store your card details
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Invoice History ──────────────────────────────────────────

const statusStyles: Record<string, string> = {
  paid:    "bg-green-500/20 text-green-400 border-green-500/30",
  pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  failed:  "bg-red-500/20 text-red-400 border-red-500/30",
};

function InvoiceHistory() {
  const { toast } = useToast();

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <RotateCcw className="h-4 w-4 text-primary" />
          Billing History
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBillingInfo.invoices.map(inv => (
              <TableRow key={inv.id} className="hover:bg-muted/30">
                <TableCell className="text-sm text-muted-foreground">{inv.date}</TableCell>
                <TableCell className="text-sm font-medium">{inv.description}</TableCell>
                <TableCell className="text-sm font-mono">${inv.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("text-xs capitalize", statusStyles[inv.status])}>
                    {inv.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => toast({ description: `Invoice ${inv.id} downloading…` })}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {mockBillingInfo.invoices.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">No invoices yet.</p>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function Billing() {
  return (
    <Layout variant="app">
      <div className="container py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              <span className="gradient-text">Billing & Subscription</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage your plan, credits, and payment details.
            </p>
          </div>
          <Link to="/pricing">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Zap className="h-4 w-4" />
              View All Plans
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            <CurrentPlanCard />
            <InvoiceHistory />
          </div>
          {/* Right column */}
          <div className="space-y-6">
            <CreditsCard />
            <PaymentMethodCard />
          </div>
        </div>
      </div>
    </Layout>
  );
}
