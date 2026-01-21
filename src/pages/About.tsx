import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Target, Heart, Truck, Shield } from "lucide-react";
const About = () => {
  return <Layout title="About RallyRoo" description="Learn about RallyRoo, Australia's home for quality RC trucks. Our mission, values, and commitment to adventure.">
      {/* Hero */}
      <section className="bg-muted py-16 md:py-24">
        <div className="section-container text-center">
          <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl">
            About <span className="text-primary">RallyRoo</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Australia's home for quality RC trucks. We're passionate about
            bringing the thrill of remote control adventures to Aussie backyards,
            beaches, and bush tracks.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold text-foreground">Our Story</h2>
            <div className="prose prose-lg text-muted-foreground">
              <p>
                RallyRoo was born from a simple love of RC trucks and the great
                Australian outdoors. We noticed that finding quality RC vehicles
                in Australia often meant paying inflated prices or waiting weeks
                for international shipping.
              </p>
              <p>
                We set out to change that. Today, we curate the best RC trucks
                from around the world, ensuring every product meets our standards
                for quality, durability, and fun. Whether you're a first-time
                buyer looking for a backyard basher or an experienced hobbyist
                chasing the next challenge, we've got you covered.
              </p>
              <p>Based in Melbourne, we're proud to ship fast to every corner of Australia – from bustling cities to remote outback towns. Because adventure shouldn't have to wait.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-card py-16 md:py-24">
        <div className="section-container">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            What We Stand For
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-eucalyptus-light">
                <Target className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Quality First
              </h3>
              <p className="text-muted-foreground">
                Every product is tested and approved before it hits our shelves.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-eucalyptus-light">
                <Heart className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Passion Driven
              </h3>
              <p className="text-muted-foreground">
                We're enthusiasts first, retailers second. We love what we sell.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-eucalyptus-light">
                <Truck className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Fast Shipping
              </h3>
              <p className="text-muted-foreground">
                1-2 day dispatch with flat rate and free shipping options.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-eucalyptus-light">
                <Shield className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Customer Focus
              </h3>
              <p className="text-muted-foreground">
                Real support from real people who care about your experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient py-16 md:py-20">
        <div className="section-container text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
            Ready to Start Your Adventure?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80">
            Browse our collection and find the perfect RC truck for your next
            outdoor adventure.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/shop">Shop Now</Link>
          </Button>
        </div>
      </section>
    </Layout>;
};
export default About;