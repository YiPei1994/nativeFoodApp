import { supabase } from "@/app/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { createContext } from "react";

type AuthData = {
  session: Session | null;
  loading: boolean;
  profile: any;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
});

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        throw new Error(error.message);
      }

      setSession(session);

      if (session) {
        // fetch profile
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(data || null);
      }
      setLoading(false);
    };
    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  console.log(profile);
  return (
    <AuthContext.Provider value={{ session, loading, profile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useSession = () => useContext(AuthContext);
