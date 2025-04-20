'use client'

import { useState, useEffect } from 'react'
import { 
  Box, Typography, Grid, Card, CardContent, CircularProgress, Fade, Chip, Button
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/navigation';
import PeopleIcon from '@mui/icons-material/People'
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import PieChartIcon from '@mui/icons-material/PieChart'
import { PieChart } from '@mui/x-charts'

// Styled Components
const DashboardCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
}))

const TotalPendudukCard = styled(DashboardCard)({
  height: '240px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

const HeaderBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
  padding: '20px',
  color: 'white',
  borderRadius: '20px',
  marginBottom: '20px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
    transform: 'rotate(30deg)',
  },
}))

const StatIcon = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
}))

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1a237e',
  color: 'white',
  borderRadius: '12px',
  padding: '10px 20px',
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#0d47a1',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
}))

const TextNoCursor = styled(Typography)({
  cursor: 'default',
})

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPenduduk: 0,
    lakiLaki: 0,
    perempuan: 0,
  })
  const [loading, setLoading] = useState(true)
  const router = useRouter();

  useEffect(() => {
    // Cek token
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    if (!token) {
      router.push('/');
      return;
    }

    fetchStats(token);
  }, [router]);

  const fetchStats = async (token) => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:8080/api/dashboard/stats", {
        headers: { 
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      })

      if (!response.ok) throw new Error('Gagal mengambil data statistik');

      const data = await response.json()
      console.log("RESPON API:", data) // Debug log

      setStats({
        totalPenduduk: data.total || 0,
        lakiLaki: data.laki || 0,
        perempuan: data.perempuan || 0,
      })
    } catch (error) {
      console.error("Gagal mengambil data statistik:", error)
      router.push('/');
    } finally {
      setLoading(false)
    }
  }

  const genderChartData = [
    { label: 'Laki-laki', value: stats.lakiLaki, color: '#1976d2' },
    { label: 'Perempuan', value: stats.perempuan, color: '#f06292' },
  ]

  return (
    <Box sx={{ padding: '20px', mt: '-15px', bgcolor: '#f4f6f8', minHeight: 'calc(100vh - 30px)' }}>
      <Fade in={!loading}>
        <Box>
          {/* Header */}
          <HeaderBox>
            <TextNoCursor variant="h3" sx={{ fontWeight: 700, mb: 1, zIndex: 1 }}>
              Dashboard Superadmin
            </TextNoCursor>
            <TextNoCursor variant="subtitle1" sx={{ opacity: 0.8, mb: 2, zIndex: 1 }}>
              Sistem Informasi Desa Bonto Ujung - Kec. Tarowang, Kab. Jeneponto
            </TextNoCursor>
            <ActionButton 
              startIcon={<AdminPanelSettingsIcon />}
              onClick={() => router.push('/data-penduduk')}
            >
              Kelola Data Penduduk
            </ActionButton>
          </HeaderBox>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
              <CircularProgress size={60} />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {/* Statistik Utama */}
              <Grid item xs={12} sm={4}>
                <TotalPendudukCard>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <StatIcon>
                      <PeopleIcon sx={{ fontSize: 36, color: '#1a237e' }} />
                    </StatIcon>
                    <TextNoCursor variant="h6" color="textSecondary">
                      Total Penduduk
                    </TextNoCursor>
                    <TextNoCursor variant="h4" sx={{ fontWeight: 700, color: '#1a237e' }}>
                      {stats.totalPenduduk}
                    </TextNoCursor>
                  </CardContent>
                </TotalPendudukCard>
              </Grid>

              <Grid item xs={12} sm={4}>
                <DashboardCard>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <StatIcon>
                      <MaleIcon sx={{ fontSize: 36, color: '#1976d2' }} />
                    </StatIcon>
                    <TextNoCursor variant="h6" color="textSecondary">
                      Laki-laki
                    </TextNoCursor>
                    <TextNoCursor variant="h4" sx={{ fontWeight: 700, color: '#1976d2' }}>
                      {stats.lakiLaki}
                    </TextNoCursor>
                    <Chip label={`${((stats.lakiLaki / stats.totalPenduduk) * 100 || 0).toFixed(1)}%`} color="primary" sx={{ mt: 2 }} />
                  </CardContent>
                </DashboardCard>
              </Grid>

              <Grid item xs={12} sm={4}>
                <DashboardCard>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <StatIcon>
                      <FemaleIcon sx={{ fontSize: 36, color: '#f06292' }} />
                    </StatIcon>
                    <TextNoCursor variant="h6" color="textSecondary">
                      Perempuan
                    </TextNoCursor>
                    <TextNoCursor variant="h4" sx={{ fontWeight: 700, color: '#f06292' }}>
                      {stats.perempuan}
                    </TextNoCursor>
                    <Chip label={`${((stats.perempuan / stats.totalPenduduk) * 100 || 0).toFixed(1)}%`} sx={{ mt: 2, bgcolor: '#f06292', color: 'white' }} />
                  </CardContent>
                </DashboardCard>
              </Grid>

              {/* Chart Section */}
              <Grid item xs={12} md={6}>
                <DashboardCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <PieChartIcon sx={{ fontSize: 28, color: '#1a237e', mr: 1 }} />
                      <TextNoCursor variant="h6" sx={{ fontWeight: 600, color: '#1a237e' }}>
                        Distribusi Jenis Kelamin
                      </TextNoCursor>
                    </Box>
                    <PieChart
                      series={[{ 
                        data: genderChartData, 
                        innerRadius: 30, 
                        outerRadius: 100, 
                        paddingAngle: 5, 
                        cornerRadius: 5 
                      }]}
                      width={400}
                      height={200}
                    />
                  </CardContent>
                </DashboardCard>
              </Grid>
            </Grid>
          )}
        </Box>
      </Fade>
    </Box>
  )
}