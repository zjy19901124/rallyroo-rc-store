import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AdminAuthState {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
}

export const useAdminAuth = () => {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    isAdmin: false,
    isLoading: true,
  });

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const user = session?.user ?? null;
        setState(prev => ({ ...prev, user }));
        
        // Check admin role after auth state change
        if (user) {
          setTimeout(() => {
            checkAdminRole(user.id);
          }, 0);
        } else {
          setState(prev => ({ ...prev, isAdmin: false, isLoading: false }));
        }
      }
    );

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user ?? null;
      setState(prev => ({ ...prev, user }));
      
      if (user) {
        checkAdminRole(user.id);
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        console.error("Error checking admin role:", error);
        setState(prev => ({ ...prev, isAdmin: false, isLoading: false }));
        return;
      }

      setState(prev => ({ ...prev, isAdmin: !!data, isLoading: false }));
    } catch (err) {
      console.error("Error checking admin role:", err);
      setState(prev => ({ ...prev, isAdmin: false, isLoading: false }));
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setState({ user: null, isAdmin: false, isLoading: false });
  };

  return {
    ...state,
    signOut,
  };
};
