import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/Layout";
import { digitalProducts, creditPacks, type DigitalProduct } from "@/lib/cosmic-data";
import {
  ShoppingCart, Star, Zap, Check, BookOpen, Headphones,
  GraduationCap, Sparkles, Calendar, Moon, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// ─── Category config ──────────────────────────────────────────

const categories = [
  { id: "all",     label: "All Products",  icon: Sparkles  },
  { id: "ebook",   label: "E-Books",       icon: BookOpen  },
  { id: "audio",   label: "Audio",         icon: Headphones},
  { id: "course",  label: "Courses",       icon: GraduationCap },
  { id: "ritual",  label: "Rituals",       icon: Moon      },
  { id: "planner", label: "Planners",      icon: Calendar  },
];

const categoryEmoji: Record<string, string> = {
  ebook: "📖", audio: "🎧", course: "🎓", ritual: "✨", planner: "📅",
};

// ─── Mini Cart ────────────────────────────────────────────────

interface CartItem { id: string; name: string; price: number; emoji: string }

function CartDrawer({
  items, onRemove, onCheckout
}: {
  items: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
}) {
  const total = items.reduce((s, i) => s + i.price, 0);
  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-up">
      <Card className="glass-card border-primary/40 shadow-2xl shadow-black/40 w-72">
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-sm">
              <ShoppingCart className="h-4 w-4 text-primary" />
              Cart ({items.length})
            </div>
            <span className="font-bold text-sm">${total.toFixed(2)}</span>
          </div>
        </CardHeader>
        <CardContent className="pb-4 space-y-2">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between gap-2 text-sm">
              <span>{item.emoji} {item.name.slice(0, 28)}{item.name.length > 28 ? "…" : ""}</span>
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="font-mono text-xs">${item.price.toFixed(2)}</span>
                <button type="button" onClick={() => onRemove(item.id)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
          <Separator />
          <Button className="w-full gap-2" size="sm" onClick={onCheckout}>
            <ShoppingCart className="h-3.5 w-3.5" />
            Checkout — ${total.toFixed(2)}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────

function ProductCard({
  product, inCart, onAddRemove
}: {
  product: DigitalProduct;
  inCart: boolean;
  onAddRemove: (p: DigitalProduct) => void;
}) {
  const savings = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className={cn(
      "glass-card flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10",
      inCart && "border-primary/50 bg-primary/5"
    )}>
      {product.badge && (
        <div className="absolute -top-2 -right-2">
          <Badge className="text-xs px-2">{product.badge}</Badge>
        </div>
      )}
      <CardHeader className="pb-3 relative">
        <div className="flex items-start justify-between">
          <div className="text-3xl mb-2">{product.emoji}</div>
          <Badge variant="outline" className="text-xs capitalize">{product.category}</Badge>
        </div>
        <h3 className="font-bold leading-snug">{product.name}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{product.description}</p>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 gap-4">
        {/* Rating */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn("h-3 w-3", i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30")}
              />
            ))}
          </div>
          <span>{product.rating} ({product.reviews.toLocaleString()} reviews)</span>
        </div>

        {/* Features */}
        <ul className="space-y-1.5 flex-1">
          {product.features.map(f => (
            <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
              <Check className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>

        {/* Price + Add to cart */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            {savings > 0 && (
              <span className="text-xs text-green-400">Save {savings}%</span>
            )}
          </div>
          <Button
            size="sm"
            variant={inCart ? "outline" : "default"}
            className="gap-1.5"
            onClick={() => onAddRemove(product)}
          >
            {inCart ? (
              <><Check className="h-3.5 w-3.5 text-green-400" />Added</>
            ) : (
              <><ShoppingCart className="h-3.5 w-3.5" />Add</>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Credit Packs Section ─────────────────────────────────────

function CreditPacksSection() {
  const { toast } = useToast();
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg font-bold"><span className="gradient-text">Reading Credits</span></h2>
        <Badge variant="outline" className="text-xs">Never expire</Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {creditPacks.map(pack => (
          <Card
            key={pack.id}
            className={cn(
              "flex flex-col transition-all hover:-translate-y-0.5",
              pack.highlighted ? "border-primary bg-primary/5 shadow-lg shadow-primary/20" : "glass-card"
            )}
          >
            <CardContent className="pt-5 pb-5 flex flex-col gap-3">
              {pack.badge && (
                <Badge className="w-fit text-xs">{pack.badge}</Badge>
              )}
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{pack.credits}</span>
                  <span className="text-muted-foreground">credits</span>
                </div>
                <p className="text-xs text-muted-foreground">${pack.perCredit.toFixed(2)} per credit</p>
              </div>
              {pack.originalPrice && (
                <p className="text-xs text-green-400">
                  Save ${(pack.originalPrice - pack.price).toFixed(2)}
                </p>
              )}
              <Button
                variant={pack.highlighted ? "default" : "outline"}
                className="gap-1.5"
                onClick={() => toast({ description: `${pack.credits} credits added to your account!` })}
              >
                <Zap className="h-4 w-4" />
                Buy — ${pack.price.toFixed(2)}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const filtered = digitalProducts.filter(p =>
    activeCategory === "all" || p.category === activeCategory
  );

  function toggleCart(product: DigitalProduct) {
    setCart(prev => {
      const inCart = prev.some(i => i.id === product.id);
      if (inCart) return prev.filter(i => i.id !== product.id);
      toast({ description: `"${product.name}" added to cart` });
      return [...prev, { id: product.id, name: product.name, price: product.price, emoji: product.emoji }];
    });
  }

  function handleCheckout() {
    toast({ description: "Redirecting to checkout… (Stripe integration pending)" });
    setCart([]);
  }

  return (
    <Layout variant="app">
      <div className="container py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">
            <span className="gradient-text">Cosmic Shop</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            E-books, guided meditations, courses, and ritual tools to deepen your cosmic journey.
          </p>
        </div>

        {/* Credits section */}
        <CreditPacksSection />

        <Separator />

        {/* Digital Products */}
        <div>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h2 className="text-lg font-bold"><span className="gradient-text">Digital Products</span></h2>
            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  size="sm"
                  variant={activeCategory === id ? "default" : "outline"}
                  className="gap-1.5 h-7 text-xs"
                  onClick={() => setActiveCategory(id)}
                >
                  <Icon className="h-3 w-3" />
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative">
            {filtered.map(product => (
              <div key={product.id} className="relative">
                <ProductCard
                  product={product}
                  inCart={cart.some(i => i.id === product.id)}
                  onAddRemove={toggleCart}
                />
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground text-sm">
                No products in this category yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating cart */}
      <CartDrawer items={cart} onRemove={id => setCart(prev => prev.filter(i => i.id !== id))} onCheckout={handleCheckout} />
    </Layout>
  );
}
