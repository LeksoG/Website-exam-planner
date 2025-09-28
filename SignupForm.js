import { useState } from 'react';
import supabase from '../supabase';

export default function SignupForm({ switchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) setErrorMsg(error.message);
    else console.log('Signed up:', data.user);
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      </form>
      <p>
        Already have an account? <button onClick={switchToLogin}>Log in</button>
      </p>
    </div>
  );
}
