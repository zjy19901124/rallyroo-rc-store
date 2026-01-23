import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price_aud: number;
  compare_at_price_aud: number | null;
  description: string;
  features: string[];
  age_grade: string;
  battery_type: string;
  dimensions_cm: { length: number; width: number; height: number };
  weight_kg: number;
  images: string[];
  category: string;
  is_active: boolean;
  stripe_payment_link_url: string | null;
  sku: string | null;
  stock_on_hand: number;
  stock_reserved: number;
  stock_available: number;
  low_stock_threshold: number;
  created_at: string;
  updated_at: string;
}

export type StockStatus = "in_stock" | "low_stock" | "sold_out";

export function getStockStatus(product: Product): StockStatus {
  if (product.stock_available <= 0) return "sold_out";
  if (product.stock_available <= product.low_stock_threshold) return "low_stock";
  return "in_stock";
}

export function useProducts(category?: string) {
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      let query = supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (category && category !== "All") {
        query = query.eq("category", category);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Product[];
    },
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

      if (error) throw error;
      return data as Product;
    },
    enabled: !!slug,
  });
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .single();

      if (error) throw error;
      return data;
    },
  });
}
