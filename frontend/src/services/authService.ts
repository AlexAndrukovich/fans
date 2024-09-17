import { User } from '../context/UserContext';
import api, { ApiError } from './apiService';

export const loginUser = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    await api.post<string>('auth/login', { email, password });
  } catch (error) {
    const err = error as ApiError;
    throw new Error(err.response?.data?.message || 'Login failed');
  }
};

export const registerUser = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    await api.post<string>('users', { email, password });
  } catch (error) {
    const err = error as ApiError;
    throw new Error(err.response?.data?.message || 'Signup failed');
  }
};

export const fetchCurrentUser = async (): Promise<User> => {
  try {
    const { data } = await api.get<User>('users');
    return data;
  } catch (error) {
    const err = error as ApiError;
    throw new Error(err.response?.data?.message || 'Load user failed');
  }
};
