import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

// Data galeri
const galleryData = [
  { image: '/images/gallery/1.jpg', title: 'Senam Bersama', description: 'Warga desa dengan semangat mengikuti senam pagi bersama di lapangan, menciptakan suasana yang sehat dan penuh kebersamaan.' },
  { image: '/images/gallery/5.jpg', title: 'Musyawarah', description: 'Para warga dan perangkat desa duduk bersama dalam musyawarah, berdiskusi untuk mengambil keputusan terbaik demi kemajuan desa.' },
  { image: '/images/gallery/3.jpg', title: 'Pengajian', description: 'Suasana khidmat saat warga berkumpul dalam pengajian rutin, mendengarkan ceramah agama yang memberikan ilmu dan ketenangan batin.' },
  { image: '/images/gallery/4.jpg', title: 'Imunisasi', description: 'Petugas kesehatan dengan teliti memberikan imunisasi kepada anak-anak, memastikan mereka tumbuh sehat dan terlindungi dari penyakit.' },
  { image: '/images/gallery/2.jpg', title: 'Pemilu', description: 'Warga desa dengan antusias datang ke TPS untuk memberikan hak suara mereka, mencerminkan partisipasi aktif dalam demokrasi.' },
];

// Variants untuk animasi
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

// Tipe data untuk selectedPhoto
interface Photo {
  image: string;
  title?: string;
  description?: string;
}

// Komponen Gallery
export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Cek ukuran layar untuk menentukan mode mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Cek saat komponen pertama kali di-render
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      className="w-full flex flex-col items-center bg-white text-gray-800 py-10 px-8 rounded-3xl shadow-lg bg-opacity-80"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-center mb-3 text-[#1A73E8]" variants={itemVariants}>
        Gallery Foto
      </motion.h1>
      <motion.p className="text-xs sm:text-sm font-normal text-center mb-6 text-[#3E3F43]" variants={itemVariants}>
        Kumpulan foto menarik dalam satu tempat!
      </motion.p>

      {/* Swiper dengan tombol navigasi dan pagination */}
      <div className="w-full max-w-4xl relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={isMobile ? 1 : 3} // 1 slide di mobile, 3 slide di desktop
          loop={true}
          navigation={!isMobile ? { // Tombol navigasi hanya di desktop
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          } : false}
          pagination={{ clickable: true, el: '.custom-pagination' }} // Pagination di luar Swiper
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="w-full h-80"
        >
          {galleryData.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="w-full h-full flex-shrink-0 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedPhoto(item)}
                variants={itemVariants}
              >
                <img
                  src={item.image}
                  alt={item.title || 'Gambar'}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </SwiperSlide>
          ))}

          {/* Tombol navigasi kustom */}
          {!isMobile && (
            <>
              <div className="swiper-button-next after:text-white"></div>
              <div className="swiper-button-prev after:text-white"></div>
            </>
          )}
        </Swiper>

        {/* Pagination di luar Swiper */}
        <div className="custom-pagination mt-4 flex justify-center"></div>
      </div>

      {/* Modal untuk menampilkan foto yang dipilih */}
      {selectedPhoto && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Container untuk foto dan deskripsi */}
          <div className="relative w-full max-w-[80%] max-h-[80%] flex flex-col items-center">
            {/* Gambar di tengah */}
            <img
              src={selectedPhoto.image}
              alt={selectedPhoto?.title || 'Gambar'}
              className="w-full h-full max-w-full max-h-[60vh] object-contain"
            />

            {/* Deskripsi foto */}
            <div className="mt-4 text-center">
              <h2 className="text-xl font-bold text-[#1A73E8]">
                {selectedPhoto?.title || 'Judul Foto'}
              </h2>
              <p className="text-sm text-gray-700">
                {selectedPhoto?.description || 'Deskripsi foto'}
              </p>
            </div>

            {/* Tombol close (X) di bawah deskripsi */}
            <button
              className="mt-4 px-4 py-2 bg-[#1A73E8] text-white rounded-full hover:bg-[#1557B0] active:bg-[#10408C] transition-all flex items-center justify-center text-2xl"
              onClick={() => setSelectedPhoto(null)}
            >
              &times;
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}