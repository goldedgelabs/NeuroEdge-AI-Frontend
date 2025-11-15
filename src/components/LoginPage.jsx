import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInEmail, signInWithGoogle, signInWithGitHub, signInWithApple } from './AuthService';
import '../styles/login.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = () => {
    signInEmail(email, pw)
      .then(() => navigate('/app'))
      .catch(err => alert(err.message));
  };

  return (
    <div className="login-container">
      <h1 className="title">Sign in to NeuroEdge</h1>
      <div className="card">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email address"
          className="input-field"
        />
        <input
          type="password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          placeholder="Password"
          className="input-field"
        />
        <button onClick={handleEmailLogin} className="btn primary">Sign In</button>
        <div className="divider">OR</div>
        <button onClick={() => signInWithGoogle().then(() => navigate('/app'))} className="btn google">Continue with Google</button>
        <button onClick={() => signInWithApple().then(() => navigate('/app'))} className="btn apple">Continue with Apple</button>
        <button onClick={() => signInWithGitHub().then(() => navigate('/app'))} className="btn github">Continue with GitHub</button>
      </div>
    </div>
  );
}
