import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AuthForm from '../components/AuthForm';

const SignUp: React.FC = () => {
  const { registerHandler, loading, error } = useAuth();

  return (
    <AuthForm
      onSubmit={registerHandler}
      pageTitle="Sign Up"
      loading={loading}
      error={error}
    />
  );
};

export default React.memo(SignUp);
