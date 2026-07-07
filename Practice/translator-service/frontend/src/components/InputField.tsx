import React from 'react';
import { TextField, Box } from '@mui/material';

interface InputFieldProps {
  value: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  label?: string;
  rows?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  placeholder = 'Enter text...',
  readOnly = false,
  label,
  rows = 6,
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        label={label}
        placeholder={placeholder}
        multiline
        rows={rows}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        fullWidth
        slotProps={{
          input: {
            readOnly: readOnly,
            sx: {
              fontFamily: '"Fira Code", monospace, "Roboto"',
              fontSize: '1.05rem',
              lineHeight: 1.6,
              color: readOnly ? '#e2e8f0' : '#ffffff',
              backgroundColor: readOnly ? 'rgba(30, 41, 59, 0.4)' : 'rgba(15, 23, 42, 0.3)',
              borderRadius: 3,
              transition: 'background-color 0.2s, border-color 0.2s',
              '&:hover': {
                backgroundColor: readOnly ? 'rgba(30, 41, 59, 0.5)' : 'rgba(15, 23, 42, 0.4)',
              },
              '&.Mui-focused': {
                backgroundColor: 'rgba(15, 23, 42, 0.5)',
              },
            },
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.12)',
              transition: 'border-color 0.2s',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.25)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
              borderWidth: '1px',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.6)',
            '&.Mui-focused': {
              color: 'primary.main',
            },
          },
        }}
      />
    </Box>
  );
};

export default InputField;
