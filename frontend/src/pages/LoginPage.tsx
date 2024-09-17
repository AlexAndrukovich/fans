import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AuthForm from '../components/AuthForm';

const Login: React.FC = () => {
  const { loginHandler, loading, error } = useAuth();

  return (
    <AuthForm
      onSubmit={loginHandler}
      pageTitle="Login"
      loading={loading}
      error={error}
    />
  );
};

export default React.memo(Login);
