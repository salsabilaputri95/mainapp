import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const notificationVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } },
  exit: { y: -100, opacity: 0 },
};

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification = ({ message, type, onClose }: NotificationProps) => {
  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white py-4 text-center`}
      variants={notificationVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {message}
    </motion.div>
  );
};

export default function FormWarga() {
  const [formData, setFormData] = useState({
    nik: '',
    nama_lengkap: '',
    alamat: '',
    jenis_surat: '',
    keterangan: '',
    file_upload: null as File | null,
    no_hp: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === 'file_upload' && files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validatePhoneNumber = (phone: string) => {
    return phone.startsWith('08') || phone.startsWith('+62');
  };

  const validateName = (name: string) => {
    return !/\d/.test(name); // Mengembalikan false jika ada angka
  };

  const validateSpecialCharacters = (input: string) => {
    // Regex untuk memeriksa karakter khusus (selain huruf, angka, spasi, dan tanda hubung)
    const regex = /^[a-zA-Z0-9\s-]*$/;
    return regex.test(input);
  };

  const validateNIK = (nik: string) => {
    // Regex untuk memeriksa apakah NIK hanya mengandung angka
    const regex = /^\d+$/;
    return regex.test(nik);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setNotification(null);

    // Validasi NIK hanya boleh mengandung angka
    if (!validateNIK(formData.nik)) {
      setNotification({
        message: 'NIK hanya boleh mengandung angka',
        type: 'error',
      });
      setIsLoading(false);
      return;
    }

    // Validasi NIK tidak boleh mengandung karakter khusus
    if (!validateSpecialCharacters(formData.nik)) {
      setNotification({
        message: 'NIK tidak boleh mengandung karakter khusus',
        type: 'error',
      });
      setIsLoading(false);
      return;
    }

    // Validasi nama tidak boleh mengandung angka atau karakter khusus
    if (!validateName(formData.nama_lengkap)) {
      setNotification({
        message: 'Nama tidak boleh mengandung angka',
        type: 'error',
      });
      setIsLoading(false);
      return;
    }

    if (!validateSpecialCharacters(formData.nama_lengkap)) {
      setNotification({
        message: 'Nama tidak boleh mengandung karakter khusus',
        type: 'error',
      });
      setIsLoading(false);
      return;
    }

    // Validasi nomor telepon
    if (!validatePhoneNumber(formData.no_hp)) {
      setNotification({
        message: 'Nomor telepon harus dimulai dengan 08 atau +62',
        type: 'error',
      });
      setIsLoading(false);
      return;
    }

    // Validasi file
    if (formData.file_upload && formData.file_upload.size > 10 * 1024 * 1024) {
      setNotification({
        message: 'Ukuran file tidak boleh lebih dari 10MB',
        type: 'error',
      });
      setIsLoading(false);
      return;
    }

    const allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (formData.file_upload && !allowedFileTypes.includes(formData.file_upload.type)) {
      setNotification({
        message: 'Format file tidak didukung. Harap unggah file PDF, JPG, atau PNG.',
        type: 'error',
      });
      setIsLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('nik', formData.nik);
    formDataToSend.append('nama_lengkap', formData.nama_lengkap);
    formDataToSend.append('alamat', formData.alamat);
    formDataToSend.append('jenis_surat', formData.jenis_surat);
    formDataToSend.append('keterangan', formData.keterangan);
    formDataToSend.append('no_hp', formData.no_hp);

    if (formData.file_upload) {
      formDataToSend.append('file_upload', formData.file_upload);
    }

    try {
      const response = await fetch('http://localhost:8080/api/warga/register', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        const textResponse = await response.text();
        console.error('Error response:', textResponse);

        let errorMessage = 'Terjadi kesalahan pada server';
        try {
          const errorResponse = JSON.parse(textResponse);
          errorMessage = errorResponse.message || errorMessage;
        } catch (jsonError) {
          errorMessage = textResponse || errorMessage;
        }

        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('Success:', result);
      setNotification({
        message: 'Pengajuan surat berhasil dikirim!',
        type: 'success',
      });
    } catch (error) {
      console.error('Error:', error);
      setNotification({
        message: error instanceof Error ? error.message : 'Terjadi kesalahan saat mengirim pengajuan surat.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setNotification(null), 3000); // Sembunyikan notifikasi setelah 3 detik
    }
  };

  const handleConfirmation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Mencegah form submit langsung
    setShowConfirmation(true); // Tampilkan popup konfirmasi
  };

  return (
    <motion.div
      className="w-full flex flex-col items-center bg-white text-gray-800 py-10 px-8 shadow-lg bg-opacity-80"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <AnimatePresence>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>

      {/* Popup Konfirmasi */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
            >
              <h2 className="text-lg font-semibold mb-4">Konfirmasi Pengajuan</h2>
              <p className="mb-4">Apakah Anda yakin ingin mengajukan surat ini?</p>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                  onClick={() => setShowConfirmation(false)}
                >
                  Batal
                </button>
                <button
                  className="px-4 py-2 bg-[#1A73E9] text-white rounded-lg hover:bg-[#1557B0] transition duration-300"
                  onClick={() => {
                    setShowConfirmation(false);
                    handleSubmit();
                  }}
                >
                  Ya, Ajukan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.h1 className="text-3xl font-bold text-[#1A73E9] mb-4" variants={itemVariants}>
        Form Pengajuan Surat
      </motion.h1>
      <motion.p className="text-sm text-gray-600 mb-6" variants={itemVariants}>
        Silakan isi form berikut untuk mengajukan surat di kantor desa.
      </motion.p>

      <form onSubmit={handleConfirmation} className="w-full max-w-screen-md mx-auto space-y-6">
        {/* Input NIK */}
        <motion.div className="space-y-2" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700">
            NIK (Nomor Induk Kependudukan)
          </label>
          <input
            type="text"
            name="nik"
            value={formData.nik}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E9]"
            placeholder="Masukkan NIK Anda"
            required
          />
          <p className="text-xs text-gray-500">Contoh: 1234567890123456</p>
          <p className="text-xs text-red-500">NIK hanya boleh mengandung angka.</p>
        </motion.div>

        {/* Input Nama Lengkap */}
        <motion.div className="space-y-2" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="nama_lengkap"
            value={formData.nama_lengkap}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E9]"
            placeholder="Masukkan nama lengkap Anda"
            required
          />
          <p className="text-xs text-gray-500">Contoh: Musdalipa Rusdi</p>
          <p className="text-xs text-red-500">Nama tidak boleh mengandung angka atau karakter khusus.</p>
        </motion.div>

        {/* Input Alamat Lengkap */}
        <motion.div className="space-y-2" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700">
            Alamat Lengkap
          </label>
          <input
            type="text"
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E9]"
            placeholder="RT/RW, Dusun, dan detail alamat"
            required
          />
          <p className="text-xs text-gray-500">Contoh: RT 01/RW 02, Dusun Sari, Jl. Merdeka No. 10</p>
        </motion.div>

        {/* Dropdown Jenis Surat */}
        <motion.div className="space-y-2" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700">
            Jenis Pengurusan Surat
          </label>
          <select
            name="jenis_surat"
            value={formData.jenis_surat}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E9]"
            required
          >
            <option value="">Pilih jenis surat</option>
            <option value="Surat Keterangan Domisili">Surat Keterangan Domisili</option>
            <option value="Surat Keterangan Tidak Mampu (SKTM)">Surat Keterangan Tidak Mampu (SKTM)</option>
            <option value="Surat Keterangan Usaha">Surat Keterangan Usaha</option>
            <option value="Surat Keterangan Pindah">Surat Keterangan Pindah</option>
            <option value="Surat Pengantar">Surat Pengantar</option>
            <option value="Surat Keterangan Kelahiran/Kematian">Surat Keterangan Kelahiran/Kematian</option>
          </select>
          <p className="text-xs text-gray-500">Pilih jenis surat yang ingin diajukan.</p>
        </motion.div>

        {/* Keterangan/Alasan Pengajuan Surat */}
        <motion.div className="space-y-2" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700">
            Keterangan/Alasan Pengajuan Surat
          </label>
          <textarea
            name="keterangan"
            value={formData.keterangan}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E9]"
            placeholder="Jelaskan alasan pengajuan surat"
            rows={4}
            required
          />
          <p className="text-xs text-gray-500">Contoh: Untuk pengajuan beasiswa.</p>
        </motion.div>

        {/* Upload File/Dokumen */}
        <motion.div className="space-y-2" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700">
            Upload Dokumen Pendukung
          </label>
          <input
            type="file"
            name="file_upload"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E9]"
            required
          />
          <p className="text-xs text-gray-500">Format: PDF, JPG, atau PNG (maks. 10MB)</p>
        </motion.div>

        {/* Input Nomor Telepon/HP */}
        <motion.div className="space-y-2" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700">
            Nomor Telepon/HP
          </label>
          <input
            type="text"
            name="no_hp"
            value={formData.no_hp}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E9]"
            placeholder="Masukkan nomor telepon aktif"
            required
          />
          <p className="text-xs text-gray-500">Contoh: 081234567890 atau +6281234567890</p>
        </motion.div>

        {/* Tombol Submit dan Kembali */}
        <motion.div className="flex justify-center space-x-4" variants={itemVariants}>
          <button
            type="submit"
            className="px-6 py-2 bg-[#1A73E9] text-white rounded-lg hover:bg-[#1557B0] transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Mengirim...' : 'Ajukan Surat'}
          </button>
          <Link href="/" passHref>
            <button
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Kembali
            </button>
          </Link>
        </motion.div>
      </form>
    </motion.div>
  );
}