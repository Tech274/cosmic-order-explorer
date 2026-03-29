import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig
} from "@/components/ui/chart";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from "recharts";
import Layout from "@/components/Layout";
import {
  mockPlanetPlacements, mockElementBalance, mockChartAspects,
} from "@/lib/cosmic-data";
import { Star, Sparkles, Check, AlertTriangle, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Static Data ──────────────────────────────────────────────

// Zodiac house signs (0 = Aries at 0°, etc.)
const houseSymbols = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];

const elementChartConfig: ChartConfig = {
  percentage: {
    label: "Strength",
    color: "hsl(var(--primary))",
  },
};

const aspectGlyph: Record<string, string> = {
  Trine:       "△",
  Square:      "□",
  Sextile:     "✶",
  Conjunction: "☌",
  Opposition:  "☍",
};

const aspectColors: Record<string, string> = {
  harmonious:  "bg-green-500/20 text-green-300 border-green-500/30",
  challenging: "bg-red-500/20 text-red-300 border-red-500/30",
  neutral:     "bg-blue-500/20 text-blue-300 border-blue-500/30",
};

const aspectIcons: Record<string, typeof Check> = {
  harmonious:  Check,
  challenging: AlertTriangle,
  neutral:     Minus,
};

// ─── Zodiac Wheel (pure SVG) ──────────────────────────────────

function ZodiacWheel() {
  const cx = 200; const cy = 200;
  const outerR = 155; const innerR = 105; const symbolR = 130; const planetR = 82;

  // Sun is in Leo (house 5) — highlight that segment
  const sunHouse = mockPlanetPlacements.find(p => p.planet === "Sun")?.house ?? 5;
  const highlightStartAngle = ((sunHouse - 1) * 30 - 90) * (Math.PI / 180);
  const highlightEndAngle = (((sunHouse - 1) * 30 + 30) - 90) * (Math.PI / 180);

  function polarX(r: number, angle: number) { return cx + r * Math.cos(angle); }
  function polarY(r: number, angle: number) { return cy + r * Math.sin(angle); }

  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-xs mx-auto" role="img" aria-label="Natal chart wheel">
      {/* Background glow */}
      <circle cx={cx} cy={cy} r={outerR + 10} fill="hsl(var(--primary)/0.04)" />

      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="hsl(var(--primary)/0.3)" strokeWidth="1.5" />
      {/* Inner ring */}
      <circle cx={cx} cy={cy} r={innerR} fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.2)" strokeWidth="1" />
      {/* Center */}
      <circle cx={cx} cy={cy} r={30} fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.2)" strokeWidth="1" />

      {/* Sun-sign highlight segment */}
      <path
        d={`M ${polarX(innerR, highlightStartAngle)} ${polarY(innerR, highlightStartAngle)}
            L ${polarX(outerR, highlightStartAngle)} ${polarY(outerR, highlightStartAngle)}
            A ${outerR} ${outerR} 0 0 1 ${polarX(outerR, highlightEndAngle)} ${polarY(outerR, highlightEndAngle)}
            L ${polarX(innerR, highlightEndAngle)} ${polarY(innerR, highlightEndAngle)}
            A ${innerR} ${innerR} 0 0 0 ${polarX(innerR, highlightStartAngle)} ${polarY(innerR, highlightStartAngle)}`}
        fill="hsl(var(--primary)/0.18)"
        stroke="none"
      />

      {/* 12 house dividing lines + zodiac symbols */}
      {Array.from({ length: 12 }).map((_, i) => {
        const lineAngle = (i * 30 - 90) * (Math.PI / 180);
        const symbolAngle = ((i * 30 + 15) - 90) * (Math.PI / 180);
        return (
          <g key={i}>
            <line
              x1={polarX(innerR, lineAngle)} y1={polarY(innerR, lineAngle)}
              x2={polarX(outerR, lineAngle)} y2={polarY(outerR, lineAngle)}
              stroke="hsl(var(--primary)/0.2)" strokeWidth="1"
              strokeDasharray={i % 3 === 0 ? "none" : "3 3"}
            />
            <text
              x={polarX(symbolR, symbolAngle)} y={polarY(symbolR, symbolAngle)}
              textAnchor="middle" dominantBaseline="central"
              fontSize="11" fill="hsl(var(--foreground)/0.7)"
            >
              {houseSymbols[i]}
            </text>
            {/* House number inside */}
            <text
              x={polarX(92, symbolAngle)} y={polarY(92, symbolAngle)}
              textAnchor="middle" dominantBaseline="central"
              fontSize="8" fill="hsl(var(--muted-foreground)/0.6)"
            >
              {i + 1}
            </text>
          </g>
        );
      })}

      {/* Planet symbols */}
      {mockPlanetPlacements.slice(0, 10).map(({ planet, emoji, house, retrograde }) => {
        const angle = ((house - 1) * 30 + 15 - 90) * (Math.PI / 180);
        const px = polarX(planetR, angle);
        const py = polarY(planetR, angle);
        return (
          <g key={planet}>
            <circle cx={px} cy={py} r={12} fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
            <text x={px} y={py} textAnchor="middle" dominantBaseline="central" fontSize="11">
              {emoji}
            </text>
            {retrograde && (
              <text x={px + 8} y={py - 8} textAnchor="middle" fontSize="7" fill="#f97316">℞</text>
            )}
          </g>
        );
      })}

      {/* Center labels */}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Natal</text>
      <text x={cx} y={cy + 6} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Chart</text>
    </svg>
  );
}

// ─── Planet Placements Table ──────────────────────────────────

function PlanetTable() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Planet</TableHead>
            <TableHead>Sign</TableHead>
            <TableHead>House</TableHead>
            <TableHead className="hidden sm:table-cell">Degree</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockPlanetPlacements.map((p) => (
            <TableRow key={p.planet} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <span className="text-base">{p.emoji}</span>
                  <span>{p.planet}</span>
                  {p.retrograde && (
                    <Badge variant="outline" className="text-[10px] px-1 py-0 text-amber-400 border-amber-400/30">℞</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-sm">{p.sign}</TableCell>
              <TableCell className="text-sm">H{p.house}</TableCell>
              <TableCell className="hidden sm:table-cell font-mono text-xs text-muted-foreground">
                {p.degree}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ─── Element Balance Chart ────────────────────────────────────

function ElementBalanceChart() {
  const radarData = mockElementBalance.map(e => ({
    element: e.element,
    percentage: e.percentage,
  }));

  return (
    <div className="space-y-6">
      <ChartContainer config={elementChartConfig} className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis
              dataKey="element"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Radar
              name="Elements"
              dataKey="percentage"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </RadarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Bar breakdown */}
      <div className="space-y-2">
        {mockElementBalance.map(e => (
          <div key={e.element} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">{e.element}</span>
              <span className="font-medium">{e.percentage}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${e.percentage}%`, backgroundColor: e.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Aspects List ─────────────────────────────────────────────

function AspectsList() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {mockChartAspects.map(aspect => {
        const key = `${aspect.planet1}-${aspect.planet2}`;
        const isOpen = expanded === key;
        const Icon = aspectIcons[aspect.influence] ?? Minus;
        const glyph = aspectGlyph[aspect.aspect] ?? "·";

        return (
          <div key={key}>
            <button
              type="button"
              onClick={() => setExpanded(isOpen ? null : key)}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 text-left transition-colors"
            >
              <div className={cn("w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border", aspectColors[aspect.influence])}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm">{aspect.planet1}</span>
                  <span className="text-muted-foreground text-base font-light">{glyph}</span>
                  <span className="font-medium text-sm">{aspect.planet2}</span>
                  <Badge variant="outline" className="text-xs">{aspect.aspect}</Badge>
                  <span className="text-xs text-muted-foreground">{aspect.orb}</span>
                </div>
              </div>
              <span className={cn("text-xs flex-shrink-0 px-2 py-0.5 rounded-full border capitalize", aspectColors[aspect.influence])}>
                {aspect.influence}
              </span>
            </button>
            {isOpen && (
              <div className="mx-3 mb-3 px-3 py-2 rounded-lg bg-muted/30 text-sm text-muted-foreground leading-relaxed animate-fade-up">
                {aspect.description}
              </div>
            )}
            <Separator />
          </div>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function BirthChart() {
  const sunSign = mockPlanetPlacements.find(p => p.planet === "Sun");
  const ascendant = mockPlanetPlacements.find(p => p.planet === "Ascendant");

  return (
    <Layout variant="app">
      <div className="container py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              <span className="gradient-text">Your Natal Chart</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {sunSign && `Sun in ${sunSign.sign}`}
              {ascendant && ` · ${ascendant.sign} Rising`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              Birth Chart Analysis
            </Badge>
          </div>
        </div>

        {/* Main grid: wheel + placements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Natal Chart Wheel
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Your planetary positions at the moment of birth. Highlighted segment shows your Sun sign.
              </p>
            </CardHeader>
            <CardContent>
              <ZodiacWheel />
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Planet Placements</CardTitle>
              <p className="text-xs text-muted-foreground">
                Where each planet was located at the time of your birth.
              </p>
            </CardHeader>
            <CardContent className="p-0 pt-0">
              <PlanetTable />
            </CardContent>
          </Card>
        </div>

        {/* Tabs: Elements + Aspects */}
        <Tabs defaultValue="elements">
          <TabsList className="grid w-full max-w-xs grid-cols-2">
            <TabsTrigger value="elements">Element Balance</TabsTrigger>
            <TabsTrigger value="aspects">Key Aspects</TabsTrigger>
          </TabsList>

          <TabsContent value="elements" className="mt-4">
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Elemental Distribution</CardTitle>
                <p className="text-xs text-muted-foreground">
                  The balance of Fire, Earth, Air, and Water across your natal placements shapes your core nature.
                </p>
              </CardHeader>
              <CardContent>
                <ElementBalanceChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aspects" className="mt-4">
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Planetary Aspects</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Geometric relationships between planets that describe the dynamics of your character.
                </p>
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <AspectsList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
