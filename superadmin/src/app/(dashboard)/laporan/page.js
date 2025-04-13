"use client";

import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';

const WebsiteContentPage = () => {
  const [formData, setFormData] = useState({
    logo: '',
    title: '',
    description: '',
    address: '',
    email: '',
    phone: ''
  });

  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [imgError, setImgError] = useState(false);

  // Fetch data on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/content');
        const result = res.data?.data ?? res.data;
        setFormData(result);
      } catch (error) {
        setAlert({ open: true, message: 'Gagal memuat konten', severity: 'error' });
      }
    };
    fetchData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'logo') setImgError(false); // Reset image error
  };

  // Submit content changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8080/api/content', formData);
      setAlert({ open: true, message: 'Konten berhasil diperbarui', severity: 'success' });
    } catch (error) {
      setAlert({ open: true, message: 'Gagal menyimpan konten', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 3 }}>
        {/* Logo Display */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          {formData.logo && !imgError ? (
            <img
              src={formData.logo}
              alt="Logo Website"
              style={{ maxHeight: 100, objectFit: 'contain' }}
              onError={() => setImgError(true)}
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              {imgError ? 'Gagal memuat logo. Periksa URL.' : 'Masukkan URL logo untuk melihat pratinjau.'}
            </Typography>
          )}
        </Box>

        {/* Title */}
        <Typography variant="h5" gutterBottom align="center">
          Kelola Konten Website
        </Typography>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Logo (URL)"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'grey.500',
                },
                '&:hover fieldset': {
                  borderColor: 'grey.700',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Judul"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'grey.500',
                },
                '&:hover fieldset': {
                  borderColor: 'grey.700',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Deskripsi"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'grey.500',
                },
                '&:hover fieldset': {
                  borderColor: 'grey.700',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Alamat"
            name="address"
            value={formData.address}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'grey.500',
                },
                '&:hover fieldset': {
                  borderColor: 'grey.700',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'grey.500',
                },
                '&:hover fieldset': {
                  borderColor: 'grey.700',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="No. HP"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'grey.500',
                },
                '&:hover fieldset': {
                  borderColor: 'grey.700',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2, width: '100%' }}
          >
            SIMPAN
          </Button>
        </Box>

        <Snackbar
          open={alert.open}
          autoHideDuration={3000}
          onClose={() => setAlert({ ...alert, open: false })}
        >
          <Alert severity={alert.severity}>{alert.message}</Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default WebsiteContentPage;