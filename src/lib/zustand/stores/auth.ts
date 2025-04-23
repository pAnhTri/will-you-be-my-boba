import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";

interface AuthStore {
  isLoading: boolean;
  user: User | null;
  session: Session | null;
  setIsLoading: (isLoading: boolean) => void;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoading: true,
  user: null,
  session: null,
  setIsLoading: (isLoading) => set({ isLoading }),
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session, user: session?.user ?? null }),
  initializeAuth: async () => {
    const supabase = createClient();

    // Get initial session
    const {
      data: { session },
    } = await supabase.auth.getSession();
    set({ session, user: session?.user ?? null, isLoading: false });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        set({ session: null, user: null });
      } else if (session) {
        set({ session, user: session.user, isLoading: false });
      }
    });

    // Cleanup subscription when the store is destroyed
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", () => {
        subscription.unsubscribe();
      });
    }
  },
}));
