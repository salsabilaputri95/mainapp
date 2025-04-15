import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

const galleryData = [
  {
    image: '/images/gallery/1.jpg',
    title: 'Senam Rutin',
    description: 'Kegiatan Mingguan',
    quote: 'Senam rutin membuat kami lebih sehat dan semakin akrab.',
    author: 'Ibu Rina'
  },
  {
    image: '/images/gallery/3.jpg',
    title: 'Pengajian Rutin',
    description: 'Kegiatan Mingguan',
    quote: 'Pengajian rutin di desa ini menambah ilmu dan mempererat silaturahmi.',
    author: 'Bu Siti'
  },
  {
    image: '/images/gallery/5.jpg',
    title: 'Musyawarah',
    description: 'Kegiatan bulanan',
    quote: 'Musyawarah desa sangat bermanfaat untuk mengambil keputusan bersama.',
    author: 'Pak Ahmad'
  }
];

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

export default function Gallery() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      className="w-full flex flex-col items-center justify-center bg-[#FFFFFF] text-[#3E3F43] py-10 px-8 bg-opacity-80 rounded-3xl"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="w-full max-w-4xl">
        <motion.h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-center mb-3 text-[#1A73E8]" variants={itemVariants}>
          Album Kegiatan
        </motion.h1>

        <motion.p className="text-xs sm:text-sm font-normal text-center mb-6 text-[#3E3F43]" variants={itemVariants}>
          Kegiatan yang ada di desa kami!
        </motion.p>

        {/* Container untuk Swiper dan Pagination */}
        <div className="relative w-full">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={!isMobile}
            pagination={{ clickable: true, el: '.custom-pagination' }} 
            loop
            spaceBetween={20}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="rounded-3xl overflow-hidden"
          >
            {galleryData.map((item, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="flex flex-col lg:flex-row items-center bg-white rounded-3xl p-4 sm:p-5 lg:p-10 w-full lg:w-3/4 mx-auto border border-gray-300"
                  variants={itemVariants}
                >
                  <div className="w-full lg:w-1/2 h-48 sm:h-64 overflow-hidden rounded-2xl">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-full lg:w-1/2 p-3 sm:p-5 text-center lg:text-left">
                    <span className="text-2xl sm:text-3xl font-bold text-[#1A73E8]">{item.title}</span>
                    <p className="text-sm sm:text-lg text-gray-600">{item.description}</p>
                    <blockquote className="mt-4 italic text-sm sm:text-lg">“{item.quote}”</blockquote>
                    <p className="mt-2 font-semibold text-sm sm:text-base">{item.author}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination Diletakkan di Bawah Frame */}
          <div className="custom-pagination mt-6 flex justify-center"></div>
        </div>
      </div>
    </motion.div>
  );
}