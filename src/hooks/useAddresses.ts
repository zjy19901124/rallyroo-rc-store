import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Address {
  id: string;
  user_id: string;
  name: string;
  phone: string | null;
  address_line1: string;
  address_line2: string | null;
  suburb: string;
  state: string;
  postcode: string;
  is_default: boolean;
  created_at: string;
}

export type AddressInput = Omit<Address, "id" | "user_id" | "created_at">;

export function useAddresses() {
  const { user, isLoading: authLoading } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      setAddresses([]);
      setIsLoading(false);
      return;
    }

    fetchAddresses();
  }, [user, authLoading]);

  const fetchAddresses = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", user.id)
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setAddresses(data || []);
    }
    setIsLoading(false);
  };

  const addAddress = async (address: AddressInput) => {
    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
      .from("addresses")
      .insert({
        ...address,
        user_id: user.id,
      });

    if (error) {
      return { error: error.message };
    }

    await fetchAddresses();
    return { error: null };
  };

  const updateAddress = async (id: string, updates: Partial<AddressInput>) => {
    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
      .from("addresses")
      .update(updates)
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      return { error: error.message };
    }

    await fetchAddresses();
    return { error: null };
  };

  const deleteAddress = async (id: string) => {
    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
      .from("addresses")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      return { error: error.message };
    }

    await fetchAddresses();
    return { error: null };
  };

  const setDefaultAddress = async (id: string) => {
    return updateAddress(id, { is_default: true });
  };

  const defaultAddress = addresses.find((a) => a.is_default) || addresses[0] || null;

  return {
    addresses,
    defaultAddress,
    isLoading: authLoading || isLoading,
    error,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    refetch: fetchAddresses,
  };
}
