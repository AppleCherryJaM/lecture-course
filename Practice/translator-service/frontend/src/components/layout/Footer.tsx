import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        py: 3,
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        mt: 'auto',
      }}
    >
      <Typography variant="caption" color="rgba(255, 255, 255, 0.4)">
        CosmoTranslator © 2026 • Powered by Google Translate & Material UI
      </Typography>
    </Box>
  );
};

export default Footer;
