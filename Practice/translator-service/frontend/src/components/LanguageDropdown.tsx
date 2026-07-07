import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export interface Language {
  code: string;
  name: string;
  flag?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
];

interface LanguageDropdownProps {
  value: string;
  onChange: (langCode: string) => void;
  label: string;
  includeAuto?: boolean;
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  value,
  onChange,
  label,
  includeAuto = false,
}) => {
  return (
    <FormControl
      fullWidth
      size="medium"
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          backgroundColor: 'rgba(15, 23, 42, 0.2)',
          '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.12)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.25)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'primary.main',
          },
        },
        '& .MuiInputLabel-root': {
          color: 'rgba(255, 255, 255, 0.6)',
          '&.Mui-focused': {
            color: 'primary.main',
          },
        },
      }}
    >
      <InputLabel id={`lang-select-label-${label}`}>{label}</InputLabel>
      <Select
        labelId={`lang-select-label-${label}`}
        id={`lang-select-${label}`}
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          color: '#ffffff',
          '& .MuiSvgIcon-root': {
            color: 'rgba(255, 255, 255, 0.5)',
          },
        }}
        MenuProps={{
          slotProps: {
            paper: {
              sx: {
                bgcolor: '#1e293b',
                backgroundImage: 'none',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 2,
                '& .MuiMenuItem-root': {
                  color: '#e2e8f0',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.08)',
                  },
                  '&.Mui-selected': {
                    bgcolor: 'primary.dark',
                    color: '#ffffff',
                    '&:hover': {
                      bgcolor: 'primary.main',
                    },
                  },
                },
              },
            },
          },
        }}
      >
        {includeAuto && (
          <MenuItem value="">
            <span style={{ marginRight: '8px' }}>🔍</span> Auto-detect
          </MenuItem>
        )}
        {LANGUAGES.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            <span style={{ marginRight: '8px' }}>{lang.flag}</span> {lang.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageDropdown;
