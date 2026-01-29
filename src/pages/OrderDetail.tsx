import { useParams, Link } from "react-router-dom";
import { useOrders } from "@/hooks/useOrders";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Package, Truck, Loader2 } from "lucide-react";
import { format } from "date-fns";

export default function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders, isLoading } = useOrders();
  const order = orders.find((o) => o.id === orderId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-secondary text-secondary-foreground";
      case "refunded":
        return "bg-muted text-muted-foreground";
      case "cancelled":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-accent text-accent-foreground";
    }
  };

  if (isLoading) {
    return (
      <Layout title="Order Details - RallyRoo">
        <div className="section-container py-16 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout title="Order Not Found - RallyRoo">
        <div className="section-container py-16 text-center">
          <Package className="mx-auto h-16 w-16 text-muted-foreground/50" />
          <h1 className="mt-6 text-2xl font-bold">Order Not Found</h1>
          <p className="mt-2 text-muted-foreground">
            This order doesn't exist or you don't have access to it.
          </p>
          <Button asChild className="mt-6">
            <Link to="/account">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Account
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Order #${order.id.slice(0, 8).toUpperCase()} - RallyRoo`}>
      <div className="section-container py-8 md:py-16">
        <Link
          to="/account"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Account
        </Link>

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Order #{order.id.slice(0, 8).toUpperCase()}
            </h1>
            <p className="text-muted-foreground mt-1">
              Placed on {format(new Date(order.created_at), "EEEE, d MMMM yyyy 'at' h:mm a")}
            </p>
          </div>
          <Badge className={`${getStatusColor(order.status)} text-sm`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Order Items */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-lg object-cover bg-muted"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <Separator className="my-6" />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${(order.amount_total / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Included</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${(order.amount_total / 100).toFixed(2)} {order.currency.toUpperCase()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Info */}
          <div className="space-y-6">
            {order.shipping && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Truck className="h-5 w-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{order.shipping.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {order.shipping.address_line1}
                    {order.shipping.address_line2 && <>, {order.shipping.address_line2}</>}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.shipping.suburb}, {order.shipping.state} {order.shipping.postcode}
                  </p>
                  {order.shipping.phone && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {order.shipping.phone}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  If you have any questions about your order, please contact our support team.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
