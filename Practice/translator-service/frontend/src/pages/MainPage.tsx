import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LanguageDropdown from '../components/LanguageDropdown';
import InputField from '../components/InputField';
import Layout from '../components/layout/Layout';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Tooltip,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ClearIcon from '@mui/icons-material/Clear';
import TranslateIcon from '@mui/icons-material/Translate';

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

  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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
          source: sourceLang || undefined, // undefined will let backend auto-detect
          target: targetLang,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Translation failed');
      }

      setTranslatedText(data.translatedText);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to translate text';
      setErrorMsg(errorMessage);
    } finally {
      setTranslating(false);
    }
  }, [sourceText, sourceLang, targetLang]);

  // Auto-translation effect when text or languages change
  useEffect(() => {
    if (!sourceText.trim()) {
      return;
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      performTranslation();
    }, 800); // 800ms debounce

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [sourceText, performTranslation]);

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
    // If source language is Auto-detect, we cannot swap directly unless we default it
    const newSource = targetLang;
    const newTarget = sourceLang || 'ru'; // fallback target to Russian if source was auto
    setSourceLang(newSource);
    setTargetLang(newTarget);
    
    // Swap texts as well if translation exists
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
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, py: 6, px: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 1100 }}>
          {errorMsg && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
              {errorMsg}
            </Alert>
          )}

          <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
            {/* Source text section */}
            <Grid size={{ xs: 12, md: 5.5 }}>
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
                  value={sourceLang}
                  onChange={setSourceLang}
                  label="Source Language"
                  includeAuto
                />
                
                <Box sx={{ position: 'relative', width: '100%', flexGrow: 1 }}>
                  <InputField
                    value={sourceText}
                    onChange={handleSourceTextChange}
                    placeholder="Type text to translate..."
                  />
                  {sourceText && (
                    <Tooltip title="Clear">
                      <IconButton
                        onClick={handleClear}
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
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Paper>
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

              <Button
                variant="contained"
                onClick={performTranslation}
                disabled={translating || !sourceText.trim()}
                sx={{
                  display: { xs: 'inline-flex', md: 'none' },
                  borderRadius: 2.5,
                  px: 3,
                  py: 1,
                  background: 'linear-gradient(45deg, #6366f1, #a855f7)',
                }}
              >
                Translate
              </Button>
            </Grid>

            {/* Target text section */}
            <Grid size={{ xs: 12, md: 5.5 }}>
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
                  value={targetLang}
                  onChange={setTargetLang}
                  label="Target Language"
                />

                <Box sx={{ position: 'relative', width: '100%', flexGrow: 1 }}>
                  <InputField
                    value={translatedText}
                    readOnly
                    placeholder={translating ? 'Translating...' : 'Translation will appear here...'}
                  />
                  {translating && (
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
                  {translatedText && !translating && (
                    <Tooltip title="Copy">
                      <IconButton
                        onClick={handleCopy}
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
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Manual translate button for desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              onClick={performTranslation}
              disabled={translating || !sourceText.trim()}
              startIcon={<TranslateIcon />}
              sx={{
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
              {translating ? 'Translating...' : 'Translate'}
            </Button>
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
    </Layout>
  );
};

export default MainPage;