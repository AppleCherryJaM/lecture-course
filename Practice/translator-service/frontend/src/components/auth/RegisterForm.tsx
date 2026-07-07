import React, { useState } from 'react';
import { TextField } from '@mui/material';
import BaseAuth from './BaseAuth';

interface RegisterFormProps {
  onRegister: (email: string, password: string) => Promise<void>;
  onToggleForm: () => void;
  error: string | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, onToggleForm, error }) => {
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleBeforeSubmit = (_email: string, password: string) => {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
  };

  const extraFields = (
    <TextField
      margin="normal"
      required
      fullWidth
      name="confirmPassword"
      label="Confirm Password"
      type="password"
      id="confirmPassword"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          backgroundColor: 'rgba(15, 23, 42, 0.3)',
        },
      }}
    />
  );

  return (
    <BaseAuth
      title="Register"
      submitText="Register"
      onSubmit={onRegister}
      toggleText="Already have an account? Login"
      onToggle={onToggleForm}
      error={error}
      extraFields={extraFields}
      onBeforeSubmit={handleBeforeSubmit}
    />
  );
};

export default RegisterForm;
