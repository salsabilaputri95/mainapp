'use client'

import { useState, useEffect } from 'react'
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box,
  Typography, Card, CardContent, IconButton, Tooltip, Divider, Alert, Fade,
  CircularProgress, MenuItem
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import PeopleIcon from '@mui/icons-material/People'
import { styled } from '@mui/material/styles'

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
  overflow: 'hidden'
}))

const HeaderBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
  padding: '24px',
  color: 'white',
  borderRadius: '16px',
  marginBottom: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)'
}))

const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'white',
  color: '#1a237e',
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 600,
  padding: '12px 24px',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.9)',
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.1)'
  }
}))

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: 'none',
  '& .MuiTableCell-head': {
    backgroundColor: '#f8f9fa',
    fontWeight: 600,
    color: '#1a237e'
  }
}))

export default function DataPenduduk() {
  const [rows, setRows] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    nik: '',
    nama_lengkap: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    pendidikan: '',
    pekerjaan: ''
  })
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('success')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchUserData()
  }, [])

  const getCookie = (name) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
  }

  const fetchUserData = async () => {
    try {
      const token = getCookie('token')
      if (!token) {
        showAlertMessage('Token tidak ditemukan, silakan login kembali', 'error')
        return
      }

      setLoading(true)
      const res = await fetch('http://localhost:8080/api/warga', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!res.ok) {
        throw new Error('Gagal mengambil data warga')
      }

      const data = await res.json()
      const warga = Array.isArray(data.data) ? data.data : []
      setRows(warga)
    } catch (err) {
      console.error('Fetch error:', err)
      showAlertMessage('Gagal memuat data warga', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAdd = () => {
    setEditingId(null)
    setFormData({
      nik: '',
      nama_lengkap: '',
      tempat_lahir: '',
      tanggal_lahir: '',
      jenis_kelamin: '',
      pendidikan: '',
      pekerjaan: ''
    })
    setShowModal(true)
  }

  const handleEdit = (row) => {
    setEditingId(row.id)
    setFormData({
      nik: row.nik,
      nama_lengkap: row.nama_lengkap,
      tempat_lahir: row.tempat_lahir,
      tanggal_lahir: row.tanggal_lahir,
      jenis_kelamin: row.jenis_kelamin,
      pendidikan: row.pendidikan,
      pekerjaan: row.pekerjaan
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus data penduduk dengan ID ${id}?`)) {
      return
    }
    try {
      const token = getCookie('token')
      if (!token) {
        showAlertMessage('Token tidak ditemukan, silakan login kembali', 'error')
        return
      }

      setLoading(true)
      const res = await fetch(`http://localhost:8080/api/warga/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!res.ok) {
        throw new Error('Gagal menghapus data')
      }

      const data = await res.json()
      showAlertMessage(data.message || 'Data berhasil dihapus', 'success')
      fetchUserData()
    } catch (err) {
      console.error('Delete error:', err)
      showAlertMessage('Gagal menghapus data', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    const { nik, nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, pendidikan, pekerjaan } = formData

    if (!nik || !nama_lengkap || !tempat_lahir || !tanggal_lahir || !jenis_kelamin || !pendidikan || !pekerjaan) {
      showAlertMessage('Semua field harus diisi', 'error')
      return
    }

    if (!/^\d{16}$/.test(nik)) {
      showAlertMessage('NIK harus 16 digit angka', 'error')
      return
    }

    try {
      const token = getCookie('token')
      if (!token) {
        showAlertMessage('Token tidak ditemukan, silakan login kembali', 'error')
        return
      }

      setLoading(true)
      const endpoint = editingId
        ? `http://localhost:8080/api/warga/${editingId}`
        : 'http://localhost:8080/api/warga'
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        throw new Error('Gagal menyimpan data')
      }

      const data = await res.json()
      showAlertMessage(data.message || 'Data berhasil disimpan', 'success')
      setShowModal(false)
      fetchUserData()
    } catch (err) {
      console.error('Save error:', err)
      showAlertMessage('Gagal menyimpan data', 'error')
    } finally {
      setLoading(false)
    }
  }

  const showAlertMessage = (message, type) => {
    setAlertMessage(message)
    setAlertType(type)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  const calculateAge = (tanggalLahir) => {
    const birthDate = new Date(tanggalLahir)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <Box sx={{ padding: '24px', mt: '-20px' }}>
      <Fade in={showAlert}>
        <Alert 
          severity={alertType}
          sx={{ position: 'fixed', top: 24, right: 24, zIndex: 9999 }}
        >
          {alertMessage}
        </Alert>
      </Fade>

      <HeaderBox>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Data Penduduk
        </Typography>
        <AddButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Tambah Data Penduduk
        </AddButton>
      </HeaderBox>

      <StyledCard>
        <CardContent>
          <StyledTableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>NIK</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>Tempat Lahir</TableCell>
                  <TableCell>Tgl Lahir (Umur)</TableCell>
                  <TableCell>Jenis Kelamin</TableCell>
                  <TableCell>Pendidikan</TableCell>
                  <TableCell>Pekerjaan</TableCell>
                  <TableCell align="center">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      <PeopleIcon sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
                      <Typography variant="body1" color="textSecondary">
                        Belum ada data penduduk
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((row) => (
                    <TableRow key={row.nik}>
                      <TableCell>{row.nik}</TableCell>
                      <TableCell>{row.nama_lengkap}</TableCell>
                      <TableCell>{row.tempat_lahir}</TableCell>
                      <TableCell>{row.tanggal_lahir} ({calculateAge(row.tanggal_lahir)})</TableCell>
                      <TableCell>{row.jenis_kelamin}</TableCell>
                      <TableCell>{row.pendidikan}</TableCell>
                      <TableCell>{row.pekerjaan}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Edit">
                          <IconButton onClick={() => handleEdit(row)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Hapus">
                          <IconButton onClick={() => handleDelete(row.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </CardContent>
      </StyledCard>

      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Data Penduduk' : 'Tambah Data Penduduk'}</DialogTitle>
        <DialogContent>
          <TextField
            label="NIK"
            name="nik"
            value={formData.nik}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            inputProps={{ maxLength: 16, pattern: '[0-9]*' }}
          />
          <TextField
            label="Nama Lengkap"
            name="nama_lengkap"
            value={formData.nama_lengkap}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Tempat Lahir"
            name="tempat_lahir"
            value={formData.tempat_lahir}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Tanggal Lahir"
            name="tanggal_lahir"
            type="date"
            value={formData.tanggal_lahir}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Jenis Kelamin"
            name="jenis_kelamin"
            select
            value={formData.jenis_kelamin}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          >
            <MenuItem value="Laki-laki">Laki-laki</MenuItem>
            <MenuItem value="Perempuan">Perempuan</MenuItem>
          </TextField>
          <TextField
            label="Pendidikan"
            name="pendidikan"
            value={formData.pendidikan}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Pekerjaan"
            name="pekerjaan"
            value={formData.pekerjaan}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>Batal</Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Simpan'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}