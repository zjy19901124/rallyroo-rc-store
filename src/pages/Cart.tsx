import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useCart } from "@/hooks/useCart";
import { useSiteSettings } from "@/hooks/useProducts";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { data: settings } = useSiteSettings();

  const shippingCost = settings?.shipping_flat_rate_aud || 9.95;
  const freeShippingThreshold = settings?.free_shipping_threshold_aud || 99;
  const qualifiesForFreeShipping = total >= freeShippingThreshold;
  const finalTotal = total + (qualifiesForFreeShipping ? 0 : shippingCost);
  const amountToFreeShipping = freeShippingThreshold - total;

  const handleCheckout = () => {
    toast.info(
      "To complete your purchase, please use the 'Buy Now' button on individual products to checkout via Stripe."
    );
  };

  if (items.length === 0) {
    return (
      <Layout title="Shopping Cart">
        <div className="section-container py-24 text-center">
          <ShoppingBag className="mx-auto mb-6 h-16 w-16 text-muted-foreground" />
          <h1 className="mb-4 text-2xl font-bold text-foreground">
            Your cart is empty
          </h1>
          <p className="mb-8 text-muted-foreground">
            Looks like you haven't added any trucks yet!
          </p>
          <Button asChild size="lg">
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Shopping Cart">
      <div className="section-container py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              to="/shop"
              className="mb-2 inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
          </div>
          <Button variant="ghost" onClick={clearCart} className="text-destructive">
            Clear Cart
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-xl bg-card p-4 shadow-soft"
              >
                {/* Image */}
                <Link to={`/product/${item.slug}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link
                      to={`/product/${item.slug}`}
                      className="font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-lg font-bold text-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Remove */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Line Total (Desktop) */}
                <div className="hidden flex-col items-end justify-center sm:flex">
                  <span className="text-lg font-bold text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 rounded-xl bg-card p-6 shadow-soft">
              <h2 className="mb-6 text-xl font-bold text-foreground">
                Order Summary
              </h2>

              {/* Free Shipping Progress */}
              {!qualifiesForFreeShipping && (
                <div className="mb-6 rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">
                    Add <span className="font-bold text-foreground">${amountToFreeShipping.toFixed(2)}</span> more for free shipping!
                  </p>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{
                        width: `${Math.min((total / freeShippingThreshold) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Totals */}
              <div className="space-y-3 border-b border-border pb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-foreground">
                    {qualifiesForFreeShipping ? (
                      <span className="text-secondary">FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-4">
                <span className="text-lg font-bold text-foreground">Total</span>
                <span className="text-lg font-bold text-foreground">
                  ${finalTotal.toFixed(2)} AUD
                </span>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handleCheckout}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Proceed to Checkout
              </Button>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Checkout is handled securely via Stripe. Use "Buy Now" on
                individual products for direct checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
