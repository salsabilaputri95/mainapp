import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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

export default function About() {
  const dataAbout = [
    {
      id: 1,
      title: "Profil Desa",
      content: "Desa Kalukuang adalah desa yang kaya akan budaya dan tradisi, terletak di wilayah yang strategis dengan pemandangan alam yang indah. Desa ini telah berkembang pesat dari waktu ke waktu, menjadi tempat yang nyaman bagi masyarakat untuk tinggal dan bekerja. Desa ini memiliki jumlah penduduk yang terus bertambah dengan beragam profesi, mulai dari petani, nelayan, pengrajin, hingga pelaku usaha kreatif. Mayoritas warga mengandalkan sektor pertanian dan perkebunan sebagai sumber mata pencaharian utama, didukung oleh pertumbuhan sektor UMKM dan pariwisata desa."
    },
    {
      id: 2,
      title: "Visi & Misi",
      content: "Visi: \"Menjadikan Desa Kalukuang sebagai desa mandiri, inovatif, dan berdaya saing berbasis kearifan lokal serta teknologi.\"\n\nMisi:\n- Meningkatkan kualitas infrastruktur dan fasilitas umum demi kesejahteraan masyarakat.\n- Mendorong pertumbuhan ekonomi berbasis pertanian, UMKM, dan pariwisata.\n- Memanfaatkan teknologi untuk meningkatkan pelayanan administrasi desa.\n- Mengembangkan program sosial dan pendidikan untuk meningkatkan kualitas SDM.\n- Melestarikan budaya dan tradisi lokal sebagai bagian dari identitas desa."
    },
    {
      id: 3,
      title: "Potensi & Program Unggulan",
      content: "Potensi Desa:\n- Pertanian dan Perkebunan: Produksi hasil tani berkualitas tinggi, termasuk padi, sayuran, dan buah-buahan.\n- Pariwisata Alam dan Budaya: Keindahan alam dan tradisi budaya yang menarik wisatawan.\n- UMKM dan Ekonomi Kreatif: Kerajinan tangan dan kuliner khas desa yang memiliki daya saing tinggi.\n\nProgram Unggulan:\n- Digitalisasi Pelayanan Desa: Sistem administrasi berbasis teknologi untuk kemudahan warga.\n- Pengembangan Wisata Desa: Promosi tempat wisata dan festival budaya tahunan.\n- Pemberdayaan UMKM: Pelatihan dan dukungan bagi pelaku usaha lokal.\n- Program Hijau Desa: Penghijauan dan pengelolaan lingkungan yang berkelanjutan."
    },
    {
      id: 4,
      title: "Data Penduduk",
      content: "Desa Kalukuang memiliki jumlah penduduk sebesar 5.000 jiwa dengan komposisi usia yang beragam. Mayoritas penduduk bekerja di sektor pertanian dan perkebunan, sementara sisanya bekerja di sektor UMKM, jasa, dan pariwisata. Desa ini juga memiliki tingkat pendidikan yang terus meningkat, dengan banyak pemuda yang melanjutkan pendidikan ke jenjang yang lebih tinggi."
    },
    {
      id: 5,
      title: "Struktur Desa",
      content: "Struktur pemerintahan Desa Kalukuang terdiri dari:\n- Kepala Desa: Bapak Ahmad Sudirman\n- Sekretaris Desa: Ibu Siti Aminah\n- Bendahara Desa: Bapak Joko Susilo\n- Lembaga Desa: Badan Permusyawaratan Desa (BPD), Lembaga Pemberdayaan Masyarakat (LPM), dan Karang Taruna."
    }
  ];

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <motion.div
      className="w-full flex items-center justify-center bg-[#FFFFFF] text-[#3E3F43] py-10 px-5 bg-opacity-80 rounded-3xl"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="w-full max-w-4xl px-5">
        {/* Bagian Lingkaran dan Teks */}
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-center gap-10"
          variants={itemVariants}
        >
          {/* Lingkaran Biru dengan Logo */}
          <div className="relative flex justify-center">
          <div className="h-[150px] w-[150px] sm:h-[200px] sm:w-[200px] lg:h-[280px] lg:w-[280px] xl:h-[350px] xl:w-[350px] aspect-square rounded-full bg-[#ffffff] flex items-center justify-center shadow-xl">
              <div className="relative h-[80%] w-[80%]">
                <Image
                  src="/images/logo desa update.png"
                  alt="profile-image"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>

          {/* Teks di Samping Lingkaran */}
          <div className="w-full lg:w-2/3 text-center lg:text-left">
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold leading-tight text-[#3E3F43] lg:text-4xl lg:leading-snug">
              Perkenalkan desa kami {" "}
              <span className="text-[#1A73E9]">Desa Kalukuang</span>
            </h1>
          </div>
        </motion.div>

        {/* Konten Tentang Desa */}
        <motion.div className="flex flex-col gap-5 mt-10" variants={itemVariants}>
          {dataAbout.map((data) => (
            <motion.div
              key={data.id}
              className="border border-gray-300 p-5 sm:p-6 rounded-lg bg-white"
              variants={itemVariants}
            >
              <button
                className="w-full text-center"
                onClick={() => toggleExpand(data.id)}
              >
                <p className="pb-2 text-base font-bold text-[#1A73E9] sm:text-lg lg:text-xl">
                  {data.title}
                </p>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedId === data.id ? 'max-h-[1000px]' : 'max-h-0'
                }`}
              >
                <p className="pb-1 text-xs text-[#3E3F43] sm:text-sm lg:text-base">
                  {data.content}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}