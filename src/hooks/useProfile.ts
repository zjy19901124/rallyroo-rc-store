import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export function useProfile() {
  const { user, isLoading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    fetchProfile();
  }, [user, authLoading]);

  const fetchProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      setError(error.message);
    } else {
      setProfile(data);
    }
    setIsLoading(false);
  };

  const updateProfile = async (updates: Partial<Pick<Profile, "full_name" | "phone">>) => {
    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
      .from("profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      return { error: error.message };
    }

    await fetchProfile();
    return { error: null };
  };

  return {
    profile,
    isLoading: authLoading || isLoading,
    error,
    updateProfile,
    refetch: fetchProfile,
  };
}
