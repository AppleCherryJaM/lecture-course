import React, { useState } from 'react';
import { Container, Paper, Box, Typography, Avatar, TextField, Button, Alert, Link, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface BaseAuthProps {
  title: string;
  submitText: string;
  onSubmit: (email: string, password: string) => Promise<void>;
  toggleText: string;
  onToggle: () => void;
  error: string | null;
  extraFields?: React.ReactNode;
  onBeforeSubmit?: (email: string, password: string) => void;
}

const BaseAuth: React.FC<BaseAuthProps> = ({
  title,
  submitText,
  onSubmit,
  toggleText,
  onToggle,
  error,
  extraFields,
  onBeforeSubmit,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      if (onBeforeSubmit) {
        onBeforeSubmit(email, password);
      }
      await onSubmit(email, password);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while performing the operation';
      setFormError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)',
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 4,
            backdropFilter: 'blur(20px)',
            background: 'rgba(30, 41, 59, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: 'secondary.main',
              background: 'linear-gradient(45deg, #c084fc 30%, #6366f1 90%)',
              width: 56,
              height: 56,
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 28 }} />
          </Avatar>
          
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mt: 2,
              mb: 3,
              fontWeight: 800,
              background: 'linear-gradient(45deg, #fff 30%, #cbd5e1 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
            }}
          >
            {title}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            {(error || formError) && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {formError || error}
              </Alert>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'rgba(15, 23, 42, 0.3)',
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'rgba(15, 23, 42, 0.3)',
                },
              }}
            />

            {/* Custom/extra fields placeholder (e.g., Confirm Password) */}
            {extraFields}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #6366f1 30%, #a855f7 90%)',
                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
                transition: 'transform 0.2s',
                '&:hover': {
                  background: 'linear-gradient(45deg, #4f46e5 30%, #9333ea 90%)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : submitText}
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Link
                component="button"
                type="button"
                variant="body2"
                onClick={onToggle}
                sx={{
                  color: '#a855f7',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline',
                    color: '#c084fc',
                  },
                }}
              >
                {toggleText}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default BaseAuth;
