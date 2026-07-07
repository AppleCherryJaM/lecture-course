import React, { useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import TranslatorPanel from '../components/TranslatorPanel';
import HistoryDrawer, { type HistoryItem } from '../components/HistoryDrawer';
import {
  Box,
  Button,
  IconButton,
  Snackbar,
  Alert,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import HistoryIcon from '@mui/icons-material/History';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ClearIcon from '@mui/icons-material/Clear';
import TranslateButton from '../components/TranslateButton';

const MainPage: React.FC = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState(''); // Empty string means Auto-detect
  const [targetLang, setTargetLang] = useState('en');
  const [translating, setTranslating] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyTotal, setHistoryTotal] = useState(0);
  const [historyOffset, setHistoryOffset] = useState(0);

  const fetchHistory = useCallback(async (offset = 0, append = false) => {
    setHistoryLoading(true);
    try {
      const response = await fetch(`/api/translate/history?limit=10&offset=${offset}`);
      if (response.ok) {
        const data = await response.json();
        if (append) {
          setHistory(prev => [...prev, ...data.records]);
        } else {
          setHistory(data.records);
        }
        setHistoryTotal(data.total);
        setHistoryOffset(offset);
      }
    } catch (err) {
      console.error('Failed to fetch history:', err);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  const handleOpenHistory = () => {
    setHistoryOpen(true);
    fetchHistory(0, false);
  };

  const performTranslation = useCallback(async () => {
    if (!sourceText.trim()) return;

    setTranslating(true);
    setErrorMsg(null);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: sourceText,
          source: sourceLang || undefined,
          target: targetLang,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Translation failed');
      }

      setTranslatedText(data.translatedText);
      fetchHistory(0, false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to translate text';
      setErrorMsg(errorMessage);
    } finally {
      setTranslating(false);
    }
  }, [sourceText, sourceLang, targetLang, fetchHistory]);

  const handleSourceTextChange = (text: string) => {
    setSourceText(text);
    if (!text.trim()) {
      setTranslatedText('');
      setErrorMsg(null);
    }
  };

  if (authLoading) {
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

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const handleSwapLanguages = () => {
    const newSource = targetLang;
    const newTarget = sourceLang || 'ru';
    setSourceLang(newSource);
    setTargetLang(newTarget);
    
    if (translatedText) {
      setSourceText(translatedText);
      setTranslatedText(sourceText);
    }
  };

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setToastMessage('Translation copied to clipboard!');
    setToastOpen(true);
  };

  const handleClear = () => {
    setSourceText('');
    setTranslatedText('');
    setErrorMsg(null);
  };

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, py: 6, px: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 1100 }}>
          {errorMsg && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
              {errorMsg}
            </Alert>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button
              variant="outlined"
              onClick={handleOpenHistory}
              startIcon={<HistoryIcon />}
              sx={{
                color: '#818cf8',
                borderColor: 'rgba(99, 102, 241, 0.3)',
                borderRadius: 2.5,
                textTransform: 'none',
                px: 3,
                py: 1,
                '&:hover': {
                  borderColor: '#818cf8',
                  bgcolor: 'rgba(99, 102, 241, 0.08)',
                },
                transition: 'all 0.2s',
              }}
            >
              History
            </Button>
          </Box>

          <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
            {/* Source text section */}
            <Grid size={{ xs: 12, md: 5.5 }}>
              <TranslatorPanel
                langValue={sourceLang}
                onLangChange={setSourceLang}
                langLabel="Source Language"
                includeAuto
                value={sourceText}
                onChange={handleSourceTextChange}
                placeholder="Type text to translate..."
                actionIcon={<ClearIcon fontSize="small" />}
                actionTooltip="Clear"
                onActionClick={handleClear}
              />
            </Grid>

            {/* Central Controls */}
            <Grid
              size={{ xs: 12, md: 1 }}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'row', md: 'column' },
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <Tooltip title="Swap languages">
                <IconButton
                  onClick={handleSwapLanguages}
                  sx={{
                    bgcolor: 'rgba(99, 102, 241, 0.1)',
                    color: '#818cf8',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    width: 50,
                    height: 50,
                    '&:hover': {
                      bgcolor: 'rgba(99, 102, 241, 0.2)',
                      transform: 'scale(1.08)',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  <SwapHorizIcon sx={{ fontSize: 28 }} />
                </IconButton>
              </Tooltip>

              <TranslateButton
                onClick={performTranslation}
                disabled={!sourceText.trim()}
                loading={translating}
              />
            </Grid>

            {/* Target text section */}
            <Grid size={{ xs: 12, md: 5.5 }}>
              <TranslatorPanel
                langValue={targetLang}
                onLangChange={setTargetLang}
                langLabel="Target Language"
                value={translatedText}
                placeholder="Translation will appear here..."
                readOnly
                loading={translating}
                actionIcon={<ContentCopyIcon fontSize="small" />}
                actionTooltip="Copy"
                onActionClick={handleCopy}
              />
            </Grid>
          </Grid>

          {/* Manual translate button for desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', mt: 4 }}>
            <TranslateButton
              onClick={performTranslation}
              disabled={!sourceText.trim()}
              loading={translating}
              desktop
            />
          </Box>
        </Box>
      </Box>

      {/* Feedback Toast */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ width: '100%', borderRadius: 2 }}>
          {toastMessage}
        </Alert>
      </Snackbar>

      {/* History Drawer */}
      <HistoryDrawer
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
        loading={historyLoading}
        total={historyTotal}
        offset={historyOffset}
        onLoadMore={() => fetchHistory(historyOffset + 10, true)}
        onSelectHistoryItem={(item) => {
          setSourceText(item.input_text);
          setSourceLang(item.from_lang || '');
          setTargetLang(item.to_lang);
          setTranslatedText(item.translated_text);
          setHistoryOpen(false);
        }}
      />
    </Layout>
  );
};

export default MainPage;