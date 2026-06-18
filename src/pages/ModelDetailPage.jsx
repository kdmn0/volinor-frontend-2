import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { MOCK_MODELS } from "../data/mockModels";

const ChevronLeftIcon = ({ className = "" }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const ChevronRightIcon = ({ className = "" }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const ArrowLeftIcon = ({ className = "" }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const DownloadIcon = ({ className = "" }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const BoxIcon = ({ className = "" }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const LayersIcon = ({ className = "" }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const CalendarIcon = ({ className = "" }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ModelDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const model = MOCK_MODELS.find((m) => m.id === id);
  
  const imageList = model?.images || [model?.image, model?.image, model?.image, model?.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  if (!model) {
    return (
      <div className="w-full min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold text-cyan-500 mb-4">404</h1>
        <p className="text-zinc-400 mb-8">Model bulunamadı.</p>
        <button
          onClick={() => navigate("/model-kutuphanesi")}
          className="px-6 py-2 bg-zinc-900 border border-zinc-700 hover:border-cyan-500 rounded-lg transition-all">
          Kütüphaneye Dön
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden bg-zinc-950 text-zinc-200 font-sans selection:bg-cyan-500/30">
      {/* HEADER */}
      <header className="sticky top-0 z-50 h-16 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-full flex items-center">
          <button
            onClick={() => navigate("/model-kutuphanesi")}
            className="flex items-center gap-2 text-sm font-medium tracking-widest text-zinc-400 hover:text-cyan-400 transition-colors group">
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:block">KÜTÜPHANEYE DÖN</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-[1600px] mx-auto p-4 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: IMAGE GALLERY */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-video lg:aspect-[2/1] w-full bg-[#E5E5E5]/5 dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800/60 shadow-2xl">
              <img
                src={imageList[currentImageIndex]}
                alt={model.name}
                className="w-full h-full object-contain p-4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />

              {/* ARROWS */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-950/50 hover:bg-cyan-500/80 text-zinc-300 hover:text-white border border-zinc-700/50 backdrop-blur transition-all"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-950/50 hover:bg-cyan-500/80 text-zinc-300 hover:text-white border border-zinc-700/50 backdrop-blur transition-all"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>

            </div>

            {/* THUMBNAILS */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 custom-scrollbar">
              {imageList.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-24 h-16 sm:w-28 sm:h-20 bg-zinc-900 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                    index === currentImageIndex ? 'border-cyan-500 opacity-100 ring-2 ring-cyan-500/50' : 'border-zinc-800 opacity-60 hover:opacity-100'
                  }`}>
                  <img
                    src={typeof img === 'string' ? img : model.image}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS & DOWNLOADS */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/60 rounded-2xl p-6 lg:p-8 flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-zinc-100 mb-2">
                {model.name}
              </h1>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                Bu 3D model, yüksek kaliteli poligon yapısı ve optimize edilmiş
                materyalleri ile projenizde hemen kullanıma hazırdır. Endüstri
                standartlarında formatlar sunulmaktadır.
              </p>

              {/* STATS */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                <div className="p-4 bg-zinc-950/50 rounded-xl border border-zinc-800/50">
                  <div className="flex items-center gap-2 text-zinc-500 mb-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span className="text-xs font-bold tracking-widest uppercase">
                      Eklenme Tarihi
                    </span>
                  </div>
                  <div className="text-lg font-mono text-zinc-200">
                    {model.date}
                  </div>
                </div>
              </div>

              {/* DOWNLOAD */}
              <div className="mt-4">
                <button className="group relative w-full flex items-center justify-center gap-3 p-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl transition-all overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <DownloadIcon className="w-6 h-6" />
                  <span className="font-bold tracking-widest uppercase text-lg">
                    Modeli İndir
                  </span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ModelDetailPage;
