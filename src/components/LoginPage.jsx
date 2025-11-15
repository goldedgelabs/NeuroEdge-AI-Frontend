import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInEmail, signInWithGoogle, signInWithGitHub, signInWithApple } from './AuthService';
import '../styles/login.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [isLoading, setIsLoading] = useState(false); // optional loader
  const navigate = useNavigate();

  const handleEmailLogin = () => {
    if (!email || !pw) return alert("Please enter email and password.");
    setIsLoading(true);
    signInEmail(email, pw)
      .then(() => navigate('/app'))
      .catch(err => alert(err.message))
      .finally(() => setIsLoading(false));
  };

  const handleSocialLogin = async (providerFn) => {
    setIsLoading(true);
    try {
      await providerFn();
      navigate('/app');
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="title">Sign in to NeuroEdge</h1>

      <div className="card">
        {/* Email Input */}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email address"
          className="input-field"
        />
        {/* Password Input */}
        <input
          type="password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          placeholder="Password"
          className="input-field"
        />

        {/* Primary Sign In Button */}
        <button
          onClick={handleEmailLogin}
          className="btn primary premium-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>

        <div className="divider">OR</div>

        {/* Social Buttons */}
        <button
          onClick={() => handleSocialLogin(signInWithGoogle)}
          className="btn google"
          disabled={isLoading}
        >
          Continue with Google
        </button>
        <button
          onClick={() => handleSocialLogin(signInWithApple)}
          className="btn apple"
          disabled={isLoading}
        >
          Continue with Apple
        </button>
        <button
          onClick={() => handleSocialLogin(signInWithGitHub)}
          className="btn github"
          disabled={isLoading}
        >
          Continue with GitHub
        </button>
      </div>
    </div>
  );
      }
