import { useState, useCallback } from 'react';
import {
  loginUser,
  fetchCurrentUser,
  registerUser,
} from '../services/authService';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

interface AuthError {
  message: string;
}

interface UseAuth {
  loginHandler: (email: string, password: string) => Promise<void>;
  registerHandler: (email: string, password: string) => Promise<void>;
  fetchUser: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useAuth = (): UseAuth => {
  const { setUser } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loginHandler = async (
    email: string,
    password: string,
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await loginUser(email, password);
      navigate('/user');
    } catch (err) {
      setError((err as AuthError)?.message);
    } finally {
      setLoading(false);
    }
  };

  const registerHandler = async (
    email: string,
    password: string,
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await registerUser(email, password);
      navigate('/login');
    } catch (err) {
      setError((err as AuthError)?.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const user = await fetchCurrentUser();
      setUser(user);
    } catch (err) {
      setError((err as AuthError)?.message);
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  return {
    loginHandler,
    registerHandler,
    fetchUser,
    loading,
    error,
  };
};
