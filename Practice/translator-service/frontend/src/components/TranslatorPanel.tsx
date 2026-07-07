import React from 'react';
import { Paper, Box, Tooltip, IconButton, CircularProgress } from '@mui/material';
import LanguageDropdown from './LanguageDropdown';
import InputField from './InputField';

interface TranslatorPanelProps {
  langValue: string;
  onLangChange: (lang: string) => void;
  langLabel: string;
  includeAuto?: boolean;
  value: string;
  onChange?: (val: string) => void;
  placeholder: string;
  readOnly?: boolean;
  loading?: boolean;
  actionIcon?: React.ReactNode;
  actionTooltip?: string;
  onActionClick?: () => void;
}

const TranslatorPanel: React.FC<TranslatorPanelProps> = ({
  langValue,
  onLangChange,
  langLabel,
  includeAuto = false,
  value,
  onChange,
  placeholder,
  readOnly = false,
  loading = false,
  actionIcon,
  actionTooltip,
  onActionClick,
}) => {
  return (
    <Paper
      elevation={6}
      sx={{
        p: 3,
        height: '100%',
        borderRadius: 4,
        bgcolor: 'rgba(30, 41, 59, 0.5)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
      }}
    >
      <LanguageDropdown
        value={langValue}
        onChange={onLangChange}
        label={langLabel}
        includeAuto={includeAuto}
      />

      <Box sx={{ position: 'relative', width: '100%', flexGrow: 1 }}>
        <InputField
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
        />
        
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CircularProgress size={40} sx={{ color: '#a855f7' }} />
          </Box>
        )}

        {value && !loading && actionIcon && onActionClick && (
          <Tooltip title={actionTooltip || ''}>
            <IconButton
              onClick={onActionClick}
              size="small"
              sx={{
                position: 'absolute',
                right: 12,
                bottom: 12,
                color: 'rgba(255, 255, 255, 0.5)',
                bgcolor: 'rgba(15, 23, 42, 0.5)',
                '&:hover': {
                  bgcolor: 'rgba(15, 23, 42, 0.8)',
                  color: '#ffffff',
                },
              }}
            >
              {actionIcon}
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Paper>
  );
};

export default TranslatorPanel;
