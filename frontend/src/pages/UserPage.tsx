import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const UserPage: React.FC = () => {
  const { user, isAuthenticated } = useUser();
  const { fetchUser, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      if (!isAuthenticated) {
        await fetchUser();
      }
    };

    loadUser();
  }, [fetchUser, isAuthenticated]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <p>You need to log in to view this page.</p>
        {error && <p>Error: {error}</p>}
        <button onClick={() => navigate('/login')}>Go to Login</button>
        <button onClick={() => navigate('/register')}>Go to Sign Up</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome</h1>
      <p>ID: {user?.id}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default React.memo(UserPage);
