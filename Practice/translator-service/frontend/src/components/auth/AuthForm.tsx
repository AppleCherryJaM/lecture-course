import React from 'react';
import BaseAuth from './BaseAuth';

interface AuthFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onToggleForm: () => void;
  error: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin, onToggleForm, error }) => {
  return (
    <BaseAuth
      title="Sign In"
      submitText="Sign In"
      onSubmit={onLogin}
      toggleText="Don't have an account? Register"
      onToggle={onToggleForm}
      error={error}
    />
  );
};

export default AuthForm;
