import { Layout } from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout
      title="Terms & Conditions"
      description="RallyRoo's terms and conditions. Read our terms of service before making a purchase."
    >
      <div className="section-container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-bold text-foreground md:text-4xl">
            Terms & Conditions
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="lead">
              Last updated: January 2026
            </p>

            <p>
              Welcome to RallyRoo. By accessing our website and making purchases,
              you agree to be bound by these Terms and Conditions. Please read
              them carefully.
            </p>

            <h2 className="text-foreground">1. General Terms</h2>
            <p>
              These terms apply to all visitors, users, and customers of the
              RallyRoo website. By using our site, you represent that you are at
              least 18 years of age or have parental consent.
            </p>

            <h2 className="text-foreground">2. Products</h2>
            <p>
              All products are subject to availability. We reserve the right to
              discontinue any product at any time. Product descriptions and
              specifications are provided in good faith but may vary slightly
              from actual items.
            </p>

            <h2 className="text-foreground">3. Pricing</h2>
            <p>
              All prices are listed in Australian Dollars (AUD) and include GST
              where applicable. We reserve the right to change prices at any time
              without notice. Prices at the time of purchase will be honored.
            </p>

            <h2 className="text-foreground">4. Orders</h2>
            <p>
              By placing an order, you make an offer to purchase products subject
              to these terms. We reserve the right to accept or decline any
              order. Order confirmation does not guarantee acceptance.
            </p>

            <h2 className="text-foreground">5. Payment</h2>
            <p>
              Payment is processed securely through Stripe. We accept major
              credit cards including Visa, Mastercard, and American Express. By
              providing payment information, you represent that you are
              authorized to use the payment method.
            </p>

            <h2 className="text-foreground">6. Shipping</h2>
            <p>
              We ship to addresses within Australia only. Shipping costs are
              calculated at checkout. We are not responsible for delays caused by
              shipping carriers, customs, or circumstances beyond our control.
              See our{" "}
              <a href="/shipping" className="text-primary">
                Shipping Policy
              </a>{" "}
              for full details.
            </p>

            <h2 className="text-foreground">7. Returns & Refunds</h2>
            <p>
              We offer a 30-day return policy for unused items in original
              packaging. Faulty products will be replaced or refunded. Return
              shipping costs are the customer's responsibility unless the product
              is faulty. See our{" "}
              <a href="/shipping" className="text-primary">
                Returns Policy
              </a>{" "}
              for full details.
            </p>

            <h2 className="text-foreground">8. Product Safety</h2>
            <p>
              Our RC trucks are toys and should be used according to the age
              guidelines provided. Adult supervision is recommended for children.
              Users are responsible for safe operation of products. We are not
              liable for injuries or damage resulting from misuse.
            </p>

            <h2 className="text-foreground">9. Intellectual Property</h2>
            <p>
              All content on this website, including text, images, logos, and
              graphics, is the property of RallyRoo or our licensors. You may not
              reproduce, distribute, or use our content without permission.
            </p>

            <h2 className="text-foreground">10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, RallyRoo shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages arising from your use of our website or products.
            </p>

            <h2 className="text-foreground">11. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless RallyRoo, its officers,
              directors, employees, and agents from any claims, damages, or
              expenses arising from your breach of these terms or misuse of our
              products.
            </p>

            <h2 className="text-foreground">12. Governing Law</h2>
            <p>
              These terms are governed by the laws of New South Wales, Australia.
              Any disputes shall be resolved in the courts of New South Wales.
            </p>

            <h2 className="text-foreground">13. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes
              will be effective immediately upon posting. Continued use of our
              website constitutes acceptance of modified terms.
            </p>

            <h2 className="text-foreground">14. Contact</h2>
            <p>
              For questions about these terms, contact us at{" "}
              <a href="mailto:support@rallyroo.com.au" className="text-primary">
                support@rallyroo.com.au
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
