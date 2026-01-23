import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ProductGrid } from "@/components/products/ProductGrid";
import { useProducts } from "@/hooks/useProducts";
import heroImage from "@/assets/hero-truck.jpg";
const Index = () => {
  const {
    data: products,
    isLoading
  } = useProducts();
  const featuredProducts = products?.slice(0, 4);
  return <Layout title="RallyRoo - Australia's Home for RC Trucks" description="Discover premium RC trucks built for adventure. Off-road, drift, stunt, and DIY kits. Fast Australian shipping, secure checkout.">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-foreground">
        <div className="absolute inset-0">
          <img src={heroImage} alt="RC truck in Australian outback" className="h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent" />
        </div>

        <div className="section-container relative py-20 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary-foreground mb-6 animate-fade-in">
              🇦🇺 Proudly Australian  
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl animate-fade-in" style={{
            animationDelay: "100ms"
          }}>
              Adventure Starts with{" "}
              <span className="text-primary">RallyRoo</span>
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl animate-fade-in" style={{
            animationDelay: "200ms"
          }}>
              Premium RC trucks built for the toughest Aussie terrain. From
              backyard adventures to competitive racing, we've got you covered.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row animate-fade-in" style={{
            animationDelay: "300ms"
          }}>
              <Button asChild size="lg" className="text-base shadow-button">
                <Link to="/shop">
                  Shop All Trucks
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b border-border bg-card py-8">
        <div className="section-container">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex items-center justify-center gap-3">
              <Truck className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Free Shipping</p>
                <p className="text-sm text-muted-foreground">Over $99</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Secure Checkout</p>
                <p className="text-sm text-muted-foreground">SSL Encrypted</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Fast Dispatch</p>
                <p className="text-sm text-muted-foreground">1-2 Business Days</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Star className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Quality Assured</p>
                <p className="text-sm text-muted-foreground">Tested & Approved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
                Featured Trucks
              </h2>
              <p className="text-muted-foreground">
                Our most popular RC trucks, ready for adventure
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden sm:flex">
              <Link to="/shop">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <ProductGrid products={featuredProducts} isLoading={isLoading} />

          <div className="mt-8 text-center sm:hidden">
            <Button asChild>
              <Link to="/shop">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-muted py-16 md:py-24">
        <div className="section-container">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground md:text-4xl">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {[{
            name: "Off-road",
            emoji: "🏜️",
            desc: "Conquer any terrain"
          }, {
            name: "Drift",
            emoji: "🏎️",
            desc: "Smooth 360° action"
          }, {
            name: "Stunt",
            emoji: "🔥",
            desc: "Flip, roll & tumble"
          }, {
            name: "DIY",
            emoji: "🔧",
            desc: "Build your own"
          }].map(cat => <Link key={cat.name} to={`/shop?category=${cat.name}`} className="group rounded-xl bg-card p-6 text-center shadow-soft transition-all hover:shadow-elevated hover:-translate-y-1">
                <span className="text-4xl">{cat.emoji}</span>
                <h3 className="mt-3 font-semibold text-foreground group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{cat.desc}</p>
              </Link>)}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="hero-gradient py-16 md:py-20">
        <div className="section-container text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
            Ready to Start Your Adventure?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80">
            Join thousands of RC enthusiasts across Australia. Fast shipping,
            quality products, and expert support.
          </p>
          <Button asChild size="lg" variant="secondary" className="shadow-elevated">
            <Link to="/shop">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>;
};
export default Index;