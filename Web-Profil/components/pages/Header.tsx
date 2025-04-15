import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed bottom-0 z-50 block w-screen bg-white shadow-lg md:top-0 md:hidden">
        <div className="container mx-auto flex flex-row justify-center gap-4 p-3">
          {[
            { href: "#home-section", icon: "las la-home" },
            { href: "#about-section", icon: "las la-info-circle" },
            { href: "#contact-section", icon: "las la-phone" },
            { href: "#gallery-section", icon: "las la-image" },
          ].map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 p-2 text-white transition-all hover:bg-blue-700 hover:scale-110 shadow-md"
            >
              <i className={`${item.icon} text-2xl`}></i>
            </a>
          ))}
        </div>
      </header>

      {/* Desktop Header */}
      <header
        className={`fixed top-0 z-50 hidden w-screen h-16 transition-all duration-300 md:flex items-center px-10 ${
          isScrolled ? "bg-white shadow-lg border-b-2 border-gray-300" : "bg-transparent border-none"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between w-full">
          
          {/* Logo di kiri penuh */}
          <div className="flex items-center flex-1">
            <Image 
              src="/images/logo desa update.png" 
              alt="Logo" 
              width={40} 
              height={0} 
              className="h-12 w-auto"
              quality={100}
              priority={true} 
              unoptimized={true}
            />
          </div>

          {/* Navigasi di kanan penuh */}
          <nav className="flex items-center justify-end flex-1 gap-10 text-[#202125] font-medium">
            <a href="#home-section" className="transition transform hover:scale-110 hover:text-blue-600">Home</a>
            <a href="#about-section" className="transition transform hover:scale-110 hover:text-blue-600">About</a>
            <a href="#gallery-section" className="transition transform hover:scale-110 hover:text-blue-600">Gallery</a>
            <a href="#contact-section" className="transition transform hover:scale-110 hover:text-blue-600">Contact</a>
            <Link 
              href="http://192.168.1.85:5001" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md transition transform hover:scale-105 hover:bg-blue-700"
            >
              Login Admin
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}