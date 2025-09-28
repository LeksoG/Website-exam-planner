import { useEffect, useState } from 'react';
import supabase from '../supabase';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import Dashboard from '../components/Dashboard';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    // Check existing session on page load
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes (login/signup/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user)
    return showSignup ? (
      <SignupForm switchToLogin={() => setShowSignup(false)} />
    ) : (
      <LoginForm switchToSignup={() => setShowSignup(true)} />
    );

  return <Dashboard user={user} />;
}
