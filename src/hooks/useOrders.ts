import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface OrderShipping {
  name: string;
  address_line1: string;
  address_line2?: string;
  suburb: string;
  state: string;
  postcode: string;
  phone?: string;
}

export interface Order {
  id: string;
  user_id: string | null;
  customer_email: string;
  stripe_checkout_session_id: string | null;
  stripe_payment_link_id: string | null;
  stripe_payment_intent_id: string | null;
  amount_total: number;
  currency: string;
  status: "pending" | "paid" | "refunded" | "cancelled";
  items: OrderItem[];
  shipping: OrderShipping | null;
  created_at: string;
}

export function useOrders() {
  const { user, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      setOrders([]);
      setIsLoading(false);
      return;
    }

    fetchOrders();
  }, [user, authLoading]);

  const fetchOrders = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      // Cast the data to Order type
      const typedOrders = (data || []).map((order) => ({
        ...order,
        items: (order.items as unknown as OrderItem[]) || [],
        shipping: order.shipping as unknown as OrderShipping | null,
        status: order.status as Order["status"],
      }));
      setOrders(typedOrders);
    }
    setIsLoading(false);
  };

  const getOrder = (id: string) => orders.find((o) => o.id === id) || null;

  return {
    orders,
    isLoading: authLoading || isLoading,
    error,
    getOrder,
    refetch: fetchOrders,
  };
}
