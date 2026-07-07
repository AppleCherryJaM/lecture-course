import React from 'react';
import { Box, Typography, IconButton, Divider, Paper, Button, CircularProgress, Drawer } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import CloseIcon from '@mui/icons-material/Close';

export interface HistoryItem {
  id: number;
  from_lang: string;
  to_lang: string;
  input_text: string;
  translated_text: string;
  user_id: number;
}

interface HistoryDrawerProps {
  open: boolean;
  onClose: () => void;
  history: HistoryItem[];
  loading: boolean;
  total: number;
  offset: number;
  onLoadMore: () => void;
  onSelectHistoryItem: (item: HistoryItem) => void;
}

const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  open,
  onClose,
  history,
  loading,
  total,
  onLoadMore,
  onSelectHistoryItem,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '100%', sm: 400 },
            bgcolor: '#1e293b',
            backgroundImage: 'none',
            color: '#e2e8f0',
            borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
          },
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <HistoryIcon sx={{ color: '#818cf8' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Translation History</Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', mb: 3 }} />

      {/* History List */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2, pr: 1 }}>
        {history.length === 0 && !loading ? (
          <Box sx={{ textAlign: 'center', py: 8, color: 'rgba(255, 255, 255, 0.4)' }}>
            <HistoryIcon sx={{ fontSize: 48, mb: 1, opacity: 0.3 }} />
            <Typography variant="body2">No translations yet.</Typography>
          </Box>
        ) : (
          history.map((item) => (
            <Paper
              key={item.id}
              onClick={() => onSelectHistoryItem(item)}
              sx={{
                p: 2,
                bgcolor: 'rgba(15, 23, 42, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'rgba(99, 102, 241, 0.08)',
                  borderColor: 'rgba(99, 102, 241, 0.3)',
                },
                transition: 'all 0.2s',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#818cf8', textTransform: 'uppercase' }}>
                  {item.from_lang || 'Auto'} ➔ {item.to_lang}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {item.input_text}
              </Typography>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.6)" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {item.translated_text}
              </Typography>
            </Paper>
          ))
        )}

        {/* Load More Button */}
        {history.length < total && (
          <Button
            variant="text"
            onClick={onLoadMore}
            disabled={loading}
            sx={{
              color: '#818cf8',
              mt: 1,
              py: 1,
              borderRadius: 2,
              '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.08)' }
            }}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Load More'}
          </Button>
        )}

        {loading && history.length === 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={30} sx={{ color: '#818cf8' }} />
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default HistoryDrawer;
