import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  ExternalLink,
  Truck,
  Shield,
  AlertTriangle,
  Package,
  Ruler,
  Battery,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct, useSiteSettings, getStockStatus } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import { StockBadge } from "@/components/products/StockBadge";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useProduct(slug || "");
  const { data: settings } = useSiteSettings();
  const { addItem } = useCart();

  const stockStatus = product ? getStockStatus(product) : "sold_out";
  const isSoldOut = stockStatus === "sold_out";

  const handleAddToCart = () => {
    if (!product) return;
    if (isSoldOut) {
      toast.error("This product is currently sold out.");
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price_aud,
      image: product.images[0] || "/placeholder.svg",
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    if (isSoldOut) {
      toast.error("This product is currently sold out.");
      return;
    }
    if (!product?.stripe_payment_link_url) {
      toast.error(
        "This product is not available for purchase yet. Please check back soon!"
      );
      return;
    }
    window.open(product.stripe_payment_link_url, "_blank");
  };

  const hasDiscount =
    product?.compare_at_price_aud &&
    product.compare_at_price_aud > product.price_aud;
  const discountPercent = hasDiscount
    ? Math.round(
        (1 - product.price_aud / product.compare_at_price_aud!) * 100
      )
    : 0;

  const qualifiesForFreeShipping =
    product && settings && product.price_aud >= settings.free_shipping_threshold_aud;

  if (isLoading) {
    return (
      <Layout>
        <div className="section-container py-12">
          <Skeleton className="mb-6 h-6 w-32" />
          <div className="grid gap-10 lg:grid-cols-2">
            <Skeleton className="aspect-square rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout title="Product Not Found">
        <div className="section-container py-24 text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">
            Product Not Found
          </h1>
          <p className="mb-8 text-muted-foreground">
            Sorry, we couldn't find the product you're looking for.
          </p>
          <Button asChild>
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const dimensions = product.dimensions_cm as { length: number; width: number; height: number };

  return (
    <Layout
      title={product.name}
      description={product.description}
    >
      <div className="section-container py-8 md:py-12">
        {/* Back Link */}
        <Link
          to="/shop"
          className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image & Video */}
          <div className="space-y-4">
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-xl bg-muted">
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              {hasDiscount && (
                <span className="absolute left-4 top-4 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
                  Save {discountPercent}%
                </span>
              )}
            </div>
            {product.video_url && (
              <div className="aspect-video overflow-hidden rounded-xl bg-muted">
                <iframe
                  src={product.video_url.replace('youtu.be/', 'www.youtube.com/embed/').replace('watch?v=', 'embed/')}
                  title={`${product.name} video`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {/* Category & Stock */}
            <div className="mb-4 flex items-center gap-2">
              <span className="badge-category">
                {product.category}
              </span>
              <StockBadge status={stockStatus} />
              {product.sku && (
                <span className="text-xs text-muted-foreground">SKU: {product.sku}</span>
              )}
            </div>

            {/* Title */}
            <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-6 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                ${product.price_aud.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.compare_at_price_aud!.toFixed(2)}
                </span>
              )}
              <span className="text-sm text-muted-foreground">AUD</span>
            </div>

            {/* Shipping Info */}
            <div className="mb-6 rounded-lg bg-eucalyptus-light p-4">
              <div className="flex items-center gap-2 text-secondary">
                <Truck className="h-5 w-5" />
                <span className="font-medium">
                  {qualifiesForFreeShipping
                    ? "✓ Qualifies for FREE shipping!"
                    : `Shipping: $${settings?.shipping_flat_rate_aud?.toFixed(2) || "9.95"} flat rate AU-wide`}
                </span>
              </div>
              {!qualifiesForFreeShipping && settings && (
                <p className="mt-1 text-sm text-secondary/80">
                  Free shipping on orders over $
                  {settings.free_shipping_threshold_aud}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="mb-6 text-muted-foreground">{product.description}</p>

            {/* Quick Specs */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Age Grade</p>
                  <p className="font-medium text-foreground">
                    Ages {product.age_grade}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                <Battery className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Batteries</p>
                  <p className="font-medium text-foreground">
                    {product.battery_type} (not included)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                <Ruler className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Dimensions</p>
                  <p className="font-medium text-foreground">
                    {dimensions.length} × {dimensions.width} × {dimensions.height} cm
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                <Package className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Weight</p>
                  <p className="font-medium text-foreground">
                    {product.weight_kg} kg
                  </p>
                </div>
              </div>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 font-semibold text-foreground">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="flex-1" onClick={handleBuyNow} disabled={isSoldOut}>
                <ExternalLink className="mr-2 h-5 w-5" />
                {isSoldOut ? "Sold Out" : "Buy Now"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={isSoldOut}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>

            {/* Safety Warning */}
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 text-accent" />
                <div className="text-sm">
                  <p className="font-medium text-foreground">Safety Notice</p>
                  <p className="text-muted-foreground">
                    This product requires {product.battery_type} batteries (not
                    included). Always use quality batteries and follow battery
                    safety guidelines. Adult supervision recommended for
                    children under 14.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-secondary" />
                Secure Checkout
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4 text-secondary" />
                Fast AU Dispatch
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
