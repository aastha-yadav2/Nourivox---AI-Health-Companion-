import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper: determine redirect URL for local or deployed environment
  const getRedirectURL = () => {
    // Use window.origin for local development
    return window.location.origin;
  };

  // Email/password signup
  const signUp = async (email, password, userData = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: getRedirectURL() // ensure redirect back to app
      }
    });
    if (error) throw error;
    return data;
  };

  // Email/password signin
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  // Google OAuth signin/signup (stays inside React app)
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: getRedirectURL() } // stays in app
    });
    if (error) throw error;
    return data;
  };

  // Sign out
  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setSession(null);
  };

  // Update user profile (Patient/Doctor/Admin)
  const updateProfile = async (profileData) => {
    if (!user) throw new Error('No user logged in');
    const { data, error } = await supabase
      .from('profiles')
      .upsert(
        { user_id: user.id, ...profileData, updated_at: new Date().toISOString() },
        { onConflict: 'user_id' }
      )
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  };

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        signOut: signOutUser,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
