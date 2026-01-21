import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    category: "Ordering & Shipping",
    questions: [
      {
        question: "How much does shipping cost?",
        answer:
          "We offer flat rate shipping of $9.95 for all orders within Australia. Orders over $99 qualify for FREE shipping! We ship to all Australian states and territories.",
      },
      {
        question: "How long will delivery take?",
        answer:
          "Orders are dispatched within 1-2 business days. Delivery typically takes 3-7 business days depending on your location. You'll receive tracking information via email once your order ships.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Currently, we only ship within Australia. We're working on expanding our shipping options – stay tuned for updates!",
      },
      {
        question: "Can I track my order?",
        answer:
          "Yes! Once your order ships, you'll receive an email with tracking information. You can track your package through Australia Post or our shipping partner's website.",
      },
    ],
  },
  {
    category: "Products & Batteries",
    questions: [
      {
        question: "What batteries do your RC trucks use?",
        answer:
          "Most of our RC trucks use AA batteries. The exact quantity varies by model and is listed on each product page. Some models include rechargeable battery packs. Batteries are NOT included with purchase unless otherwise stated.",
      },
      {
        question: "Are batteries included with the RC trucks?",
        answer:
          "No, batteries are not included unless specifically stated on the product page. We recommend using high-quality alkaline or rechargeable batteries for best performance.",
      },
      {
        question: "What are the battery safety guidelines?",
        answer:
          "Always use the correct battery type as specified. Never mix old and new batteries. Remove batteries if the toy won't be used for extended periods. Keep batteries away from heat and water. Never attempt to recharge non-rechargeable batteries. Dispose of batteries properly according to local regulations.",
      },
      {
        question: "What age are your RC trucks suitable for?",
        answer:
          "Our products have two age grades: 8+ and 14+. Products rated 8+ are suitable for children aged 8 and above with adult supervision. Products rated 14+ are designed for teens and adults and may have smaller parts or require more skill. Always check the age grade on the product page.",
      },
    ],
  },
  {
    category: "Returns & Warranty",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy. Items must be unused, in original packaging, and include all accessories. Return shipping costs are the customer's responsibility. Faulty products will be replaced or refunded with free return shipping.",
      },
      {
        question: "What if I receive a faulty product?",
        answer:
          "Contact us within 7 days of delivery with photos of the damage or fault. We'll provide a prepaid return label and offer a replacement or full refund at no extra cost.",
      },
      {
        question: "Is there a warranty on your products?",
        answer:
          "All our RC trucks come with a standard manufacturer's warranty covering defects in materials and workmanship. Warranty period varies by product – check the product page or included documentation for details.",
      },
    ],
  },
  {
    category: "Payment & Checkout",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, Mastercard, American Express) through our secure Stripe checkout. Apple Pay and Google Pay are also available where supported.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Absolutely! All payments are processed through Stripe, a PCI-compliant payment processor. We never store your credit card details on our servers.",
      },
      {
        question: "How does checkout work?",
        answer:
          "When you click 'Buy Now' on a product, you'll be directed to our secure Stripe checkout page. Complete your payment, and you'll be redirected back to our thank you page with your order confirmation.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <Layout
      title="Frequently Asked Questions"
      description="Find answers to common questions about RallyRoo RC trucks, shipping, batteries, returns, and more."
    >
      <div className="section-container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mb-10 text-lg text-muted-foreground">
            Can't find what you're looking for?{" "}
            <Link to="/contact" className="text-primary hover:underline">
              Contact us
            </Link>{" "}
            and we'll be happy to help.
          </p>

          <div className="space-y-8">
            {faqs.map((section) => (
              <div key={section.category}>
                <h2 className="mb-4 text-xl font-bold text-foreground">
                  {section.category}
                </h2>
                <Accordion type="single" collapsible className="rounded-xl bg-card shadow-soft">
                  {section.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${section.category}-${index}`}
                      className="border-border px-6"
                    >
                      <AccordionTrigger className="text-left text-foreground hover:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl bg-muted p-8 text-center">
            <h3 className="mb-4 text-xl font-bold text-foreground">
              Still have questions?
            </h3>
            <p className="mb-6 text-muted-foreground">
              Our team is here to help. Reach out and we'll get back to you
              within 24-48 hours.
            </p>
            <Button asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
