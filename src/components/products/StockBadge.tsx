import { Badge } from "@/components/ui/badge";
import type { StockStatus } from "@/hooks/useProducts";

interface StockBadgeProps {
  status: StockStatus;
  className?: string;
}

export function StockBadge({ status, className }: StockBadgeProps) {
  const config = {
    in_stock: {
      label: "In Stock",
      variant: "default" as const,
      className: "bg-green-600 hover:bg-green-600 text-white",
    },
    low_stock: {
      label: "Low Stock",
      variant: "default" as const,
      className: "bg-amber-500 hover:bg-amber-500 text-white",
    },
    sold_out: {
      label: "Sold Out",
      variant: "secondary" as const,
      className: "bg-muted text-muted-foreground",
    },
  };

  const { label, variant, className: badgeClassName } = config[status];

  return (
    <Badge variant={variant} className={`${badgeClassName} ${className || ""}`}>
      {label}
    </Badge>
  );
}
