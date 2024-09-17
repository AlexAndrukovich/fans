import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  pageTitle: string;
  loading: boolean;
  error: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  pageTitle,
  loading,
  error,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const isLoginPage = pageTitle === 'Login';

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await onSubmit(email, password);
    },
    [email, password, onSubmit],
  );

  const handleSwitchPage = () => {
    if (pageTitle === 'Login') {
      navigate('/register');
    } else {
      navigate('/login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{pageTitle}</h2>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>
      {error && <p>{error}</p>}
      <button type="submit" disabled={loading}>
        {pageTitle}
      </button>
      <button type="button" onClick={handleSwitchPage} disabled={loading}>
        {isLoginPage
          ? 'Need an account? Sign Up'
          : 'Already have an account? Login'}
      </button>
    </form>
  );
};

export default React.memo(AuthForm);
