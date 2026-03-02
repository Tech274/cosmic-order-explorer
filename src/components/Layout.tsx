import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Moon, Sun, Star, Menu, Sparkles, BookOpen, LayoutDashboard, Calendar, ShoppingBag, Users, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  variant?: "landing" | "app";
}

function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setDark(!dark)}
      aria-label="Toggle theme"
      className="rounded-full"
    >
      {dark ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

const landingLinks = [
  { label: "Features",    href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing",     href: "/pricing" },
];

const appLinks = [
  { label: "Dashboard",  href: "/dashboard",  icon: LayoutDashboard },
  { label: "Readings",   href: "/readings",   icon: Sparkles },
  { label: "Journal",    href: "/journal",    icon: BookOpen },
  { label: "Calendar",   href: "/calendar",   icon: Calendar },
  { label: "Sessions",   href: "/sessions",   icon: Users },
  { label: "Shop",       href: "/shop",       icon: ShoppingBag },
  { label: "Billing",    href: "/billing",    icon: CreditCard },
];

export default function Layout({ children, variant = "landing" }: LayoutProps) {
  const location = useLocation();
  const isApp = variant === "app";

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── Top Navigation ─────────────────────────────────── */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b border-border/50 backdrop-blur-md",
          isApp
            ? "bg-background/90"
            : "bg-background/70"
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
              <Star className="h-4 w-4 text-primary fill-primary" />
            </div>
            <span className="gradient-text hidden sm:inline">Cosmic Order Explorer</span>
            <span className="gradient-text sm:hidden">COE</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {isApp ? (
              appLinks.map(({ label, href, icon: Icon }) => (
                <Link key={href} to={href}>
                  <Button
                    variant={location.pathname === href ? "secondary" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Button>
                </Link>
              ))
            ) : (
              landingLinks.map(({ label, href }) =>
                href.startsWith("/") ? (
                  <Link key={href} to={href}>
                    <Button variant="ghost" size="sm">{label}</Button>
                  </Link>
                ) : (
                  <a key={href} href={href}>
                    <Button variant="ghost" size="sm">{label}</Button>
                  </a>
                )
              )
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {isApp ? (
              <div className="hidden md:flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-muted rounded-full px-3 py-1">
                  <Sparkles className="h-3 w-3 text-amber-400" />
                  <span>3 credits</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                  A
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/onboarding">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to="/onboarding">
                  <Button size="sm" className="gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-4 pt-4">
                  <div className="flex items-center gap-2 font-bold">
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <span className="gradient-text">Cosmic Order Explorer</span>
                  </div>
                  <Separator />
                  <nav className="flex flex-col gap-1">
                    {isApp
                      ? appLinks.map(({ label, href, icon: Icon }) => (
                          <Link key={href} to={href}>
                            <Button variant="ghost" className="w-full justify-start gap-2">
                              <Icon className="h-4 w-4" />
                              {label}
                            </Button>
                          </Link>
                        ))
                      : landingLinks.map(({ label, href }) =>
                          href.startsWith("/") ? (
                            <Link key={href} to={href}>
                              <Button variant="ghost" className="w-full justify-start">{label}</Button>
                            </Link>
                          ) : (
                            <a key={href} href={href}>
                              <Button variant="ghost" className="w-full justify-start">{label}</Button>
                            </a>
                          )
                        )}
                  </nav>
                  <Separator />
                  {!isApp && (
                    <div className="flex flex-col gap-2">
                      <Link to="/onboarding">
                        <Button variant="outline" className="w-full">Sign In</Button>
                      </Link>
                      <Link to="/onboarding">
                        <Button className="w-full gap-1.5">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          Get Started Free
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* ─── Main Content ─────────────────────────────────────── */}
      <main className="flex-1">{children}</main>

      {/* ─── Footer (landing only) ───────────────────────────── */}
      {!isApp && (
        <footer className="border-t border-border/50 bg-muted/30 py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 font-bold mb-3">
                  <Star className="h-4 w-4 text-primary fill-primary" />
                  <span className="gradient-text">Cosmic Order Explorer</span>
                </div>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Aligning you with the universe's infinite wisdom. Your cosmic journey begins here.
                </p>
              </div>
              <div>
                <p className="font-semibold text-sm mb-3">Product</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                  <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                  <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-sm mb-3">Company</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                </ul>
              </div>
            </div>
            <Separator className="mb-6" />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>© 2026 Cosmic Order Explorer. All rights reserved.</p>
              <p className="flex items-center gap-1">
                Made with <Star className="h-3 w-3 text-amber-400 fill-amber-400" /> and stardust
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
