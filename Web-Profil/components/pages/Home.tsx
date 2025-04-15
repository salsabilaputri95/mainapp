import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

export default function Home() {
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

  return (
    <motion.div
      className="container relative m-auto flex h-screen flex-col flex-wrap items-center justify-center gap-5 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="font-poppins font-bold leading-snug text-[#3E3F43] hero-text"
        variants={itemVariants}
      >
        Selamat Datang di Website
        <div className="bg-gradient-to-r from-[#1A73E9] to-[#1A73E9] bg-clip-text text-transparent">
          <TypeAnimation
            className="inline-block min-w-[200px]"
            sequence={[
              "Desa Kalukuang",
              5000,
              "",
              500,
              "Kecamatan Tallo",
              5000,
              "",
              500,
            ]}
            speed={5}
            repeat={Infinity}
          />
        </div>
      </motion.h1>

      <motion.p
        className="w-3/4 md:w-1/2 text-[#3E3F43] font-medium text-xs sm:text-base lg:text-lg hero-subtext"
        variants={itemVariants}
      >
        Selamat datang di website resmi Kecamatan Tallo, pusat informasi dan layanan bagi masyarakat. Kami berkomitmen untuk memberikan pelayanan terbaik serta menghadirkan informasi terkini seputar pemerintahan, pembangunan, dan kehidupan sosial di Kecamatan Tallo.
        <br />
      </motion.p>

      <motion.div className="flex flex-col gap-5 md:flex-row" variants={itemVariants}>
        <Link href="/form-warga" className="custom-button-2">
          Ajukan masalahmu disini!
        </Link>
      </motion.div>
    </motion.div>
  );
}