import { Link } from "react-router-dom";
import { ShoppingCart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import type { Product } from "@/hooks/useProducts";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const hasDiscount = product.compare_at_price_aud && product.compare_at_price_aud > product.price_aud;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price_aud / product.compare_at_price_aud!) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price_aud,
      image: product.images[0] || "/placeholder.svg",
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.stripe_payment_link_url) {
      toast.error("This product is not available for purchase yet. Please check back soon!");
      return;
    }
    window.open(product.stripe_payment_link_url, "_blank");
  };

  return (
    <Link to={`/product/${product.slug}`} className="product-card group block">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {hasDiscount && (
          <span className="badge-sale">-{discountPercent}%</span>
        )}
        <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-1 font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="mb-4 flex items-baseline gap-2">
          <span className="text-lg font-bold text-foreground">
            ${product.price_aud.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.compare_at_price_aud!.toFixed(2)}
            </span>
          )}
        </div>

        {/* Age Grade & Battery */}
        <div className="mb-4 flex gap-2">
          <span className="badge-category">Ages {product.age_grade}</span>
          <span className="badge-category">{product.battery_type} Batteries</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={handleBuyNow}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Buy Now
          </Button>
        </div>
      </div>
    </Link>
  );
}
