import { Layout } from "@/components/layout/Layout";
import { Truck, Clock, RotateCcw, MapPin, AlertCircle } from "lucide-react";

const Shipping = () => {
  return (
    <Layout
      title="Shipping & Returns"
      description="Learn about RallyRoo's shipping options and return policy. Free worldwide shipping on all orders."
    >
      <div className="section-container py-12 md:py-16">
        <h1 className="mb-8 text-3xl font-bold text-foreground md:text-4xl">
          Shipping & Returns
        </h1>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Shipping */}
          <div className="space-y-8">
            <section>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-eucalyptus-light">
                  <Truck className="h-6 w-6 text-secondary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Shipping</h2>
              </div>

              <div className="rounded-xl bg-card p-6 shadow-soft">
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  Free Worldwide Shipping
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">FREE shipping</strong> on
                      all orders — domestic and international
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-muted-foreground">
                      We ship to all Australian states and territories, plus worldwide
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-eucalyptus-light">
                  <Clock className="h-6 w-6 text-secondary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Dispatch Times
                </h2>
              </div>

              <div className="rounded-xl bg-card p-6 shadow-soft">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Orders are dispatched within{" "}
                      <strong className="text-foreground">1-2 business days</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Australian delivery:</strong> 3-7 business days
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">International delivery:</strong> approximately 3 weeks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-muted-foreground">
                      You'll receive tracking information via email once shipped
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-eucalyptus-light">
                  <MapPin className="h-6 w-6 text-secondary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Regional Delivery
                </h2>
              </div>

              <div className="rounded-xl bg-card p-6 shadow-soft">
                <p className="text-muted-foreground">
                  Remote and regional areas within Australia may experience slightly longer delivery times.
                  International orders are shipped via trusted global carriers. Delivery times may vary
                  by destination but typically arrive within 3 weeks.
                </p>
              </div>
            </section>
          </div>

          {/* Returns */}
          <div className="space-y-8">
            <section>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-eucalyptus-light">
                  <RotateCcw className="h-6 w-6 text-secondary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Returns</h2>
              </div>

              <div className="rounded-xl bg-card p-6 shadow-soft">
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  30-Day Return Policy
                </h3>
                <p className="mb-4 text-muted-foreground">
                  We want you to be completely satisfied with your purchase. If
                  you're not happy with your RC truck, you can return it within 30
                  days of delivery.
                </p>
                <h4 className="mb-2 font-semibold text-foreground">
                  Conditions for Returns:
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Item must be unused and in original packaging
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-muted-foreground">
                      All accessories and documentation included
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Return shipping costs are the customer's responsibility
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <div className="rounded-xl bg-card p-6 shadow-soft">
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  Faulty Products
                </h3>
                <p className="mb-4 text-muted-foreground">
                  If you receive a faulty or damaged product, please contact us
                  immediately. We will arrange a free return and replacement or
                  full refund.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Contact us within 7 days of delivery
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Include photos of the damage/fault
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-muted-foreground">
                      We'll provide a prepaid return label
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <div className="rounded-xl border border-border bg-muted p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 flex-shrink-0 text-primary" />
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">
                      Need Help?
                    </h3>
                    <p className="text-muted-foreground">
                      If you have any questions about shipping or returns, please
                      don't hesitate to contact us at{" "}
                      <a
                        href="mailto:support@rallyroo.com.au"
                        className="text-primary hover:underline"
                      >
                        support@rallyroo.com.au
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
