import { API_ENDPOINTS, getHeaders } from '@/config/api';
import Cookies from 'js-cookie';

export const laporanService = {
  getAllLaporan: async () => {
    try {
      const token = Cookies.get('authToken');
      if (!token) throw new Error('Token tidak ditemukan');

      const [pemasukanResponse, pengeluaranResponse] = await Promise.all([
        fetch(API_ENDPOINTS.PEMASUKAN_GET_ALL, {
          method: 'GET',
          headers: getHeaders(token),
        }),
        fetch(API_ENDPOINTS.PENGELUARAN_GET_ALL, {
          method: 'GET',
          headers: getHeaders(token),
        }),
      ]);

      const pemasukanData = await pemasukanResponse.json();
      const pengeluaranData = await pengeluaranResponse.json();

      if (!pemasukanResponse.ok || pemasukanData.status !== 'OK') {
        throw new Error(pemasukanData.message || 'Gagal mengambil data pemasukan');
      }
      if (!pengeluaranResponse.ok || pengeluaranData.status !== 'OK') {
        throw new Error(pengeluaranData.message || 'Gagal mengambil data pengeluaran');
      }

      const combinedData = [
        ...(pemasukanData.data || []).map(item => ({
          id: item.id_pemasukan,
          tanggal: item.tanggal,
          kategori: 'Pemasukan',
          keterangan: item.keterangan,
          pemasukan: parseInt(item.nominal),
          pengeluaran: 0,
          jenis: 'pemasukan',
          total_saldo: 0,
        })),
        ...(pengeluaranData.data || []).map(item => ({
          id: item.id_pengeluaran,
          tanggal: item.tanggal,
          kategori: 'Pengeluaran',
          keterangan: item.keterangan,
          pemasukan: 0,
          pengeluaran: parseInt(item.nominal),
          jenis: 'pengeluaran',
          nota: item.nota,
          total_saldo: 0,
        })),
      ].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

      let saldo = 0;
      const dataWithSaldo = combinedData.map(item => {
        saldo += (item.pemasukan - item.pengeluaran);
        return { ...item, total_saldo: saldo };
      });

      return dataWithSaldo;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  addPemasukan: async (data) => {
    try {
      if (!data.tanggal || isNaN(Date.parse(data.tanggal))) {
        throw new Error('Format tanggal tidak valid');
      }

      const nominal = parseInt(data.nominal);
      if (isNaN(nominal) || nominal <= 0) {
        throw new Error('Nominal harus berupa angka positif');
      }

      if (!data.kategori || data.kategori.trim() === '') {
        throw new Error('Kategori tidak boleh kosong');
      }

      if (!data.keterangan || data.keterangan.trim() === '') {
        throw new Error('Keterangan tidak boleh kosong');
      }

      const jsonData = {
        tanggal: data.tanggal,
        nominal,
        kategori: data.kategori.trim(),
        keterangan: data.keterangan.trim(),
      };

      const token = Cookies.get('authToken');
      if (!token) throw new Error('Token tidak ditemukan');

      const response = await fetch(API_ENDPOINTS.PEMASUKAN_ADD, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(jsonData),
      });

      const responseData = await response.json();
      if (!response.ok || responseData.status !== 'OK') {
        throw new Error(responseData.message || 'Gagal menambah pemasukan');
      }

      return responseData;
    } catch (error) {
      console.error('Error in addPemasukan:', error);
      throw error;
    }
  },

  addPengeluaran: async (data) => {
    try {
      const token = Cookies.get('authToken');
      if (!token) throw new Error('Token tidak ditemukan');

      const formData = new FormData();
      formData.append('tanggal', data.tanggal);
      formData.append('nominal', data.nominal);
      formData.append('keterangan', data.keterangan);
      if (!data.nota) throw new Error('Nota harus diupload');
      formData.append('nota', data.nota);

      const response = await fetch(API_ENDPOINTS.PENGELUARAN_ADD, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
        body: formData,
      });

      const responseData = await response.json();
      if (!response.ok || responseData.status !== 'OK') {
        throw new Error(responseData.message || 'Gagal menambah pengeluaran');
      }

      return responseData;
    } catch (error) {
      console.error('Error adding pengeluaran:', error);
      throw error;
    }
  },
};