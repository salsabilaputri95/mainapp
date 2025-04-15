import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

// Definisikan tipe data untuk kepala desa
interface KepalaDesa {
  id: number;
  name: string;
  jabatan: string;
  tahun: string;
  foto: string;
  biodata: string;
}

// Data Riwayat Kepala Desa (6 entri dengan gambar yang sama)
const kepalaDesaData: KepalaDesa[] = [
  {
    id: 1,
    name: "Muhammad Azril Wijaya",
    jabatan: "Kepala Desa",
    tahun: "2000 - 2005",
    foto: "/images/kepala desa/azril.png",
    biodata: "Muhammad Azril Wijaya adalah kepala desa yang visioner. Selama masa jabatannya, ia fokus pada pembangunan infrastruktur dan peningkatan kesejahteraan masyarakat.",
  },
  {
    id: 2,
    name: "Khairul Kuznah Bin Marwan",
    jabatan: "Kepala Desa",
    tahun: "2005 - 2010",
    foto: "/images/kepala desa/mrwn.png",
    biodata: "Khairul Kuznah Bin Marwan melanjutkan program pembangunan dan memperkuat sektor pendidikan dan kesehatan.",
  },
  {
    id: 3,
    name: "Muhammad Razi Nur Dzakwan",
    jabatan: "Kepala Desa",
    tahun: "2010 - Sekarang",
    foto: "/images/kepala desa/razi.png",
    biodata: "Muhammad Razi Nur Dzakwan menginisiasi program ekonomi kreatif untuk memberdayakan pemuda dan perempuan di desa.",
  },
];

// Variabel animasi
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function HistoryKepalaDesa() {
  const [selectedKepalaDesa, setSelectedKepalaDesa] = useState<KepalaDesa | null>(null);

  return (
    <motion.div
      className="w-full flex items-center justify-center bg-[#FFFFFF] text-[#3E3F43] py-10 px-5 bg-opacity-80 rounded-3xl"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="w-full max-w-4xl px-5">
        {/* Judul Halaman */}
        <motion.h1
          className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-8 text-[#1A73E8]"
          variants={itemVariants}
        >
          Riwayat Kepala Desa
        </motion.h1>

        {/* Swiper untuk Riwayat Kepala Desa */}
        <motion.div variants={itemVariants}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: '.custom-pagination',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {kepalaDesaData.map((kepalaDesa) => (
              <SwiperSlide key={kepalaDesa.id}>
                <div
                  className="border border-gray-300 p-5 sm:p-6 rounded-lg bg-white flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedKepalaDesa(kepalaDesa)}
                >
                  {/* Foto Kepala Desa */}
                  <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden mb-4">
                    <Image
                      src={kepalaDesa.foto}
                      alt={kepalaDesa.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Nama Kepala Desa */}
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#1A73E8]">
                    {kepalaDesa.name}
                  </h2>

                  {/* Jabatan */}
                  <p className="text-xs sm:text-sm lg:text-base text-[#3E3F43]">
                    {kepalaDesa.jabatan}
                  </p>

                  {/* Tahun Menjabat */}
                  <p className="text-xs sm:text-xs lg:text-sm text-gray-600 mt-2">
                    {kepalaDesa.tahun}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination (Bulatan Swiper) */}
          <div className="custom-pagination mt-6 flex justify-center"></div>
        </motion.div>
      </div>

      {/* Popup Biodata Kepala Desa */}
      {selectedKepalaDesa && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative w-full max-w-[80%] max-h-[80%] flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
            {/* Foto Kepala Desa */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden mb-4">
              <Image
                src={selectedKepalaDesa.foto}
                alt={selectedKepalaDesa.name}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Nama Kepala Desa */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1A73E8]">
              {selectedKepalaDesa.name}
            </h2>

            {/* Jabatan */}
            <p className="text-sm sm:text-base lg:text-lg text-[#3E3F43]">
              {selectedKepalaDesa.jabatan}
            </p>

            {/* Tahun Menjabat */}
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-2">
              {selectedKepalaDesa.tahun}
            </p>

            {/* Biodata */}
            <p className="text-xs sm:text-sm lg:text-base text-gray-700 mt-4 text-center">
              {selectedKepalaDesa.biodata}
            </p>

            {/* Tombol Close Bulat (X) */}
            <button
              className="mt-6 w-10 h-10 bg-[#1A73E8] text-white rounded-full hover:bg-[#1557B0] active:bg-[#10408C] transition-all flex items-center justify-center text-2xl"
              onClick={() => setSelectedKepalaDesa(null)}
            >
              &times;
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}