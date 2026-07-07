import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';

interface TranslateButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
  desktop?: boolean;
}

const TranslateButton: React.FC<TranslateButtonProps> = ({
  onClick,
  disabled,
  loading,
  desktop = false,
}) => {
  if (desktop) {
    return (
      <Button
        variant="contained"
        onClick={onClick}
        disabled={disabled || loading}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <TranslateIcon />}
        sx={{
          display: { xs: 'none', md: 'flex' },
          borderRadius: 3,
          px: 5,
          py: 1.8,
          fontSize: '1.05rem',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #6366f1 30%, #a855f7 90%)',
          boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
          '&:hover': {
            background: 'linear-gradient(45deg, #4f46e5 30%, #9333ea 90%)',
            transform: 'translateY(-1px)',
          },
          transition: 'transform 0.2s',
        }}
      >
        {loading ? 'Translating...' : 'Translate'}
      </Button>
    );
  }

  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled || loading}
      sx={{
        display: { xs: 'inline-flex', md: 'none' },
        borderRadius: 2.5,
        px: 3,
        py: 1,
        background: 'linear-gradient(45deg, #6366f1, #a855f7)',
      }}
    >
      {loading ? '...' : 'Translate'}
    </Button>
  );
};

export default TranslateButton;
