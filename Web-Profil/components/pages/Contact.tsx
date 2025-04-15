import { motion } from 'framer-motion'; // Impor Framer Motion

// Variabel animasi
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5, // Delay animasi untuk children
      staggerChildren: 0.3, // Jarak antar animasi children
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Contact() {
  return (
    <motion.div
      className="w-full flex items-center justify-center bg-[#FFFFFF] text-[#3E3F43] py-4 px-5 bg-opacity-80 rounded-3xl"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible" // Animasi dipicu saat di-scroll ke viewport
      viewport={{ once: true, amount: 0.2 }} // Hanya dipicu sekali dan saat 20% elemen terlihat
    >
      <div className="w-full max-w-4xl px-3 sm:px-5 py-8 sm:py-10">
        {/* Animasi untuk judul */}
        <motion.h1
          className="text-lg sm:text-2xl lg:text-3xl font-bold text-center mb-3 text-[#1A73E9]"
          variants={itemVariants}
        >
          Lebih dekat dengan kami
        </motion.h1>

        {/* Animasi untuk deskripsi */}
        <motion.p
          className="text-xs sm:text-sm font-normal text-center mb-6 text-[#3E3F43]"
          variants={itemVariants}
        >
          Jika Anda memiliki pertanyaan, saran, atau ingin mengetahui lebih lanjut tentang Desa Kalukuang, 
          silakan hubungi kami melalui informasi di bawah ini.
        </motion.p>

        <div className="flex flex-col space-y-6 lg:flex-row lg:space-x-10 lg:space-y-0">
          {/* Kolom Kiri */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col gap-5 sm:gap-7"
            variants={itemVariants}
          >
            {/* Kotak Informasi Kontak */}
            <motion.div
              className="border border-gray-300 p-5 sm:p-6 rounded-lg bg-white"
              variants={itemVariants}
            >
              <table className="w-full text-xs sm:text-sm">
                <tbody>
                  <tr>
                    <td className="text-sm font-semibold mb-3 text-[#1A73E9]">Alamat</td>
                  </tr>
                  <tr>
                    <td className="break-words">Jl. Raya Kalukuang No. 12, Kecamatan Tallo, Indonesia</td>
                  </tr>
                  <tr>
                    <td className="text-sm font-semibold mb-3 text-[#1A73E9]">Email</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="mailto:kontak@desKalukuang.go.id" className="text-blue-600 hover:underline">
                        kontak@desakalukuang.go.id
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm font-semibold mb-3 text-[#1A73E9]">Telepon</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="tel:+6281234567890" className="text-blue-600 hover:underline">
                        +62 812-3456-7890
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </motion.div>

            {/* Kotak Formulir Pesan */}
            <motion.div
              className="border border-gray-300 p-4 sm:p-5 rounded-lg bg-white"
              variants={itemVariants}
            >
              <h2 className="text-sm font-semibold mb-3 text-[#1A73E9]">Kirim Pesan</h2>
              <form
                action="https://formspree.io/f/{your-formspree-endpoint}" // Ganti dengan endpoint Formspree Anda
                method="POST"
                className="flex flex-col gap-3 sm:gap-4"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Anda"
                  className="border border-gray-300 p-2 rounded w-full text-xs sm:text-sm"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Anda"
                  className="border border-gray-300 p-2 rounded w-full text-xs sm:text-sm"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Pesan Anda"
                  className="border border-gray-300 p-2 rounded w-full h-20 sm:h-24 text-xs sm:text-sm"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-[#1A73E9] text-white p-2 sm:p-3 rounded hover:bg-blue-700 transition text-xs sm:text-sm"
                >
                  Kirim Pesan
                </button>
              </form>
            </motion.div>
          </motion.div>

          {/* Kolom Kanan (Peta Lokasi) */}
          <motion.div
            className="w-full lg:w-1/2"
            variants={itemVariants}
          >
            <div className="border border-gray-300 p-3 sm:p-4 rounded-lg bg-white h-full flex flex-col">
              <h2 className="text-sm font-semibold mb-2 text-[#1A73E9]">Lokasi Desa</h2>
              <div className="w-full h-48 sm:h-64 lg:h-[500px] rounded-md overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126605.00270009889!2d111.36060501874806!3d-7.420202511579864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79e7d772805c33%3A0x64380d453b074ed2!2sNgawi%2C%20Kec.%20Ngawi%2C%20Kabupaten%20Ngawi%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1740659305039!5m2!1sid!2sid"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}