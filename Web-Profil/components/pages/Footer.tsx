export default function Footer() {
  return (
    <footer className="bg-white text-[#3E3F43] py-10 rounded-t-2xl">
      {/* Tambahkan padding horizontal lebih tebal di sini */}
      <div className="container mx-auto px-10 sm:px-14 lg:px-22">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
          {/* Logo dan Deskripsi */}
          <div className="col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left">
            <img src="/images/coconut.png" alt="Logo Desa" className="w-auto h-12 sm:h-16 mb-3" />
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold">Website Desa Kalukuang</h2>
            <p className="text-xs sm:text-sm lg:text-base text-gray-500 mt-2">
              Desa Kalukuang yang maju, sejahtera, berbudaya, serta handal di bidang pertanian.
            </p>
          </div>

          {/* Pelayanan Desa */}
          <div className="text-left">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-2">Pelayanan Desa</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm lg:text-base text-gray-500">
              <li><a href="#" className="hover:text-[#1A73E9]">Administrasi</a></li>
              <li><a href="#" className="hover:text-[#1A73E9]">Pembendaharaan</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm lg:text-base text-gray-500">
              <li><a href="#" className="hover:text-[#1A73E9]">Berita Desa</a></li>
              <li><a href="#" className="hover:text-[#1A73E9]">Informasi</a></li>
              <li><a href="#" className="hover:text-[#1A73E9]">Informasi Publik</a></li>
              <li><a href="#" className="hover:text-[#1A73E9]">Kegiatan Desa</a></li>
              <li><a href="#" className="hover:text-[#1A73E9]">Sitemap</a></li>
            </ul>
          </div>

          {/* Contact Developer */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 mt-4 sm:mt-0">Contact</h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-500">
              <i className="las la-map-marker-alt hover:text-[#1A73E9]"></i> Jl. Raya Kalukuang No. 12, Kecamatan Kalukuang, Indonesia
            </p>
            <p className="text-xs sm:text-sm lg:text-base text-gray-500 mt-2">
              <i className="las la-envelope hover:text-[#1A73E9]"></i> kalukuang@gmail.com
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-300 mt-6 pt-4 text-center text-xs sm:text-sm">
          <p className="text-xs sm:text-sm text-gray-500">© 2025 COCONUT Computer Club. All rights reserved.</p>
          <div className="flex justify-center flex-wrap mt-3 space-x-4">
            <a href="https://www.instagram.com/coconutdotorg/" target="_blank" className="text-[#3E3F43] hover:text-[#1A73E9]">
              <i className="lab la-instagram text-lg sm:text-xl lg:text-2xl"></i>
            </a>
            <a href="https://www.facebook.com/coconutcomputer" target="_blank" className="text-[#3E3F43] hover:text-[#1A73E9]">
              <i className="lab la-facebook text-lg sm:text-xl lg:text-2xl"></i>
            </a>
            <a href="https://www.youtube.com/@coconutcomputerclub3982" target="_blank" className="text-[#3E3F43] hover:text-[#1A73E9]">
              <i className="lab la-youtube text-lg sm:text-xl lg:text-2xl"></i>
            </a>
            <a href="https://coconut.or.id/" target="_blank" className="text-[#3E3F43] hover:text-[#1A73E9]">
              <i className="la la-globe text-lg sm:text-xl lg:text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}