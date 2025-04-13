'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Image from 'next/image';

export default function SignIn() {
  const [formData, setFormData] = useState({ nikadmin: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [contentLoading, setContentLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/content');
        const result = await res.json();
        const data = result.data ? result.data : result;

        // Validasi logoUrl
        if (data.logo && /\.(png|jpg|jpeg|svg|webp)$/i.test(data.logo)) {
          setLogoUrl(data.logo);
        } else {
          console.warn('URL logo tidak valid:', data.logo);
        }
        if (data.title) setTitle(data.title);
      } catch (err) {
        console.error('Gagal fetch konten:', err.message);
      } finally {
        setContentLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { nikadmin, password } = formData;

    console.log('Mengirim payload:', { nikadmin, password });

    // Validasi NIK
    if (!nikadmin || nikadmin.length !== 16) {
      setError('NIK harus 16 digit.');
      setLoading(false);
      return;
    }

    // Validasi password
    if (!password) {
      setError('Password harus diisi.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nikadmin, password }),
        credentials: 'include',
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        throw new Error('Respons bukan JSON: ' + text);
      }

      console.log('Respons JSON:', data);

      if (response.ok && data.code === 200 && data.data) {
        document.cookie = `token=${data.data}; path=/; max-age=3600; SameSite=Strict`;
        console.log('Login berhasil, redirect ke /dashboard');
        router.push('/dashboard');
      } else {
        setError(data.message || 'Login gagal');
      }
    } catch (err) {
      console.error('Error:', err.message);
      setError('Gagal terhubung ke server: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            {contentLoading ? (
              <CircularProgress size={24} />
            ) : logoUrl ? (
              <Image
                src={logoUrl}
                alt="Logo"
                width={80}
                height={80}
                style={{ marginBottom: '16px', borderRadius: '50%' }}
                priority
              />
            ) : (
              <Image
                src="/image.png"
                alt="Logo"
                width={80}
                height={80}
                style={{ marginBottom: '16px', borderRadius: '50%' }}
                priority
              />
            )}
            <Typography component="h1" variant="h5" sx={{ fontWeight: 600, color: '#1a237e', textAlign: 'center' }}>
              {title || 'Masuk'}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1, textAlign: 'center' }}>
              Masukkan NIK dan kata sandi Anda
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              name="nikadmin"
              label="NIK Admin"
              type="text"
              id="nikadmin"
              value={formData.nikadmin}
              onChange={handleChange}
              disabled={loading}
              error={!!error}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Kata Sandi"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              error={!!error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      disabled={loading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 2, mb: 2, py: 1.5, backgroundColor: '#1a237e', '&:hover': { backgroundColor: '#0d47a1' } }}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                  Memproses...
                </>
              ) : (
                'Masuk'
              )}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}