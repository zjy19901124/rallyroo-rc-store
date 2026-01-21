import { Layout } from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout
      title="Privacy Policy"
      description="RallyRoo's privacy policy. Learn how we collect, use, and protect your personal information."
    >
      <div className="section-container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-bold text-foreground md:text-4xl">
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="lead">
              Last updated: January 2026
            </p>

            <p>
              RallyRoo ("we", "our", or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use, and
              safeguard your information when you visit our website or make a
              purchase.
            </p>

            <h2 className="text-foreground">Information We Collect</h2>
            <p>We collect information you provide directly to us, including:</p>
            <ul>
              <li>Name and contact information (email, phone, address)</li>
              <li>Payment information (processed securely via Stripe)</li>
              <li>Order history and preferences</li>
              <li>Communications you send to us</li>
            </ul>

            <p>We automatically collect certain information when you visit our site:</p>
            <ul>
              <li>Device and browser information</li>
              <li>IP address and location data</li>
              <li>Pages visited and time spent on site</li>
              <li>Referring website or source</li>
            </ul>

            <h2 className="text-foreground">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your order status</li>
              <li>Send you promotional materials (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-foreground">Payment Security</h2>
            <p>
              All payment transactions are processed through Stripe, a PCI-DSS
              compliant payment processor. We do not store your credit card
              information on our servers. For more information about Stripe's
              security practices, please visit{" "}
              <a href="https://stripe.com/au/privacy" target="_blank" rel="noopener noreferrer" className="text-primary">
                Stripe's Privacy Policy
              </a>.
            </p>

            <h2 className="text-foreground">Cookies and Analytics</h2>
            <p>
              We use cookies and similar technologies to enhance your browsing
              experience, analyze site traffic, and understand where our visitors
              are coming from. You can control cookie preferences through your
              browser settings.
            </p>

            <h2 className="text-foreground">Third-Party Services</h2>
            <p>
              We may share your information with third-party service providers
              who assist us in operating our website, conducting our business, or
              serving our users. These parties are obligated to keep your
              information confidential.
            </p>

            <h2 className="text-foreground">Your Rights</h2>
            <p>
              Under Australian Privacy law, you have the right to:
            </p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <h2 className="text-foreground">Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to
              fulfill the purposes outlined in this policy, unless a longer
              retention period is required by law.
            </p>

            <h2 className="text-foreground">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact
              us at{" "}
              <a href="mailto:support@rallyroo.com.au" className="text-primary">
                support@rallyroo.com.au
              </a>
            </p>

            <h2 className="text-foreground">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last updated" date.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
