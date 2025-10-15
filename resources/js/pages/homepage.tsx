import React from "react";
import daging1Img from "../images/daging1.png"; // ✅ pakai file lokal kamu

export default function Homepage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8E1]">
      {/* Header */}
      <header className="w-full fixed top-0 left-0 z-50 bg-[#F8FFF6]/70 backdrop-blur-md shadow-sm border-b border-green-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-[#6DBE45] tracking-tight drop-shadow-sm">
            PanganKU
          </h1>
          <nav>
            <ul className="flex space-x-8 text-gray-700 font-medium">
              <li className="hover:text-[#6DBE45] cursor-pointer transition-colors">Home</li>
              <li className="hover:text-[#6DBE45] cursor-pointer transition-colors">Produk</li>
              <li className="hover:text-[#6DBE45] cursor-pointer transition-colors">Tentang</li>
              <li className="hover:text-[#6DBE45] cursor-pointer transition-colors">Kontak</li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 pt-32 md:pt-40">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-5xl font-extrabold text-gray-800 leading-tight">
            Selamat Datang di{" "}
            <span className="text-[#6DBE45]">PanganKU</span> 
          </h2>
          <p className="text-gray-700 text-lg">
            Platform untuk menemukan, membeli, dan menjual produk pangan lokal
            dengan mudah dan cepat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-[#8FD694] text-white px-8 py-3 rounded-full shadow-md hover:bg-[#7EC885] transition-all duration-300">
              Jelajahi Sekarang
            </button>
            <button className="border border-[#8FD694] text-[#6DBE45] px-8 py-3 rounded-full hover:bg-[#EAF9E6] transition-all duration-300">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
          <img
            src={daging1Img}
            alt="Ilustrasi produk pangan lokal"
            className="w-72 md:w-80 lg:w-96 rounded-2xl"
          />
        </div>
      </section>
    </div>
  );
}
