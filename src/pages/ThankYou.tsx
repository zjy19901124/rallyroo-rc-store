import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Package, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const ThankYou = () => {
  return (
    <Layout
      title="Thank You for Your Order"
      description="Your RallyRoo order has been placed successfully. Get ready for adventure!"
    >
      <div className="section-container py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          {/* Success Icon */}
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-eucalyptus-light animate-scale-in">
            <CheckCircle className="h-12 w-12 text-secondary" />
          </div>

          <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl animate-fade-in">
            Thank You for Your Order!
          </h1>

          <p className="mb-8 text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "100ms" }}>
            Your order has been successfully placed. Get ready for some serious
            RC truck action! 🚛
          </p>

          {/* Order Info Cards */}
          <div className="mb-10 grid gap-4 sm:grid-cols-2 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="rounded-xl bg-card p-6 shadow-soft">
              <Mail className="mx-auto mb-3 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-semibold text-foreground">
                Check Your Email
              </h3>
              <p className="text-sm text-muted-foreground">
                You'll receive an order confirmation email from Stripe with your
                receipt details.
              </p>
            </div>
            <div className="rounded-xl bg-card p-6 shadow-soft">
              <Package className="mx-auto mb-3 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-semibold text-foreground">
                Fast Dispatch
              </h3>
              <p className="text-sm text-muted-foreground">
                We'll dispatch your order within 1-2 business days and send you
                tracking info.
              </p>
            </div>
          </div>

          {/* What's Next */}
          <div className="mb-10 rounded-xl bg-muted p-6 text-left animate-fade-in" style={{ animationDelay: "300ms" }}>
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              What Happens Next?
            </h2>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  1
                </span>
                <span className="text-muted-foreground">
                  You'll receive an email confirmation from Stripe with your
                  payment receipt
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  2
                </span>
                <span className="text-muted-foreground">
                  Our team will prepare and pack your order
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  3
                </span>
                <span className="text-muted-foreground">
                  You'll get a shipping notification with tracking details
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  4
                </span>
                <span className="text-muted-foreground">
                  Your RC truck arrives and the adventure begins! 🎉
                </span>
              </li>
            </ol>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center animate-fade-in" style={{ animationDelay: "400ms" }}>
            <Button asChild size="lg">
              <Link to="/shop">
                Continue Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>

          {/* Support */}
          <p className="mt-10 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "500ms" }}>
            Have questions about your order? Contact us at{" "}
            <a
              href="mailto:support@rallyroo.com.au"
              className="text-primary hover:underline"
            >
              support@rallyroo.com.au
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ThankYou;
