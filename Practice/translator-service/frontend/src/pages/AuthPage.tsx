import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/auth/AuthForm';
import RegisterForm from '../components/auth/RegisterForm';
import { Box, CircularProgress } from '@mui/material';

const AuthPage: React.FC = () => {
  const { isAuthenticated, loading, login, register, error, clearError } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#0f172a',
        }}
      >
        <CircularProgress color="primary" size={60} />
      </Box>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleToggleForm = () => {
    clearError();
    setIsLogin((prev) => !prev);
  };

  return isLogin ? (
    <AuthForm
      onLogin={login}
      onToggleForm={handleToggleForm}
      error={error}
    />
  ) : (
    <RegisterForm
      onRegister={register}
      onToggleForm={handleToggleForm}
      error={error}
    />
  );
};

export default AuthPage;
