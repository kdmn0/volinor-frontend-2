import React, { Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import { products } from '../data/products';
import { motion } from 'motion/react';

// 3D Model Placeholder or Actual Loader
const ModelViewer = ({ modelPath }) => {
  // Gerçek modeller hazır olduğunda aşağıdaki kodu kullanabilirsiniz:
  // import { useGLTF } from '@react-three/drei';
  // const { scene } = useGLTF(modelPath);
  // return <primitive object={scene} scale={1} />;

  // Şimdilik geçici, teknolojik görünümlü bir dönen placeholder:
  return (
    <group>
      <mesh>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#00e5ff" wireframe opacity={0.3} transparent />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

const Loader = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-[#00e5ff] bg-[#080f1e]/80 p-6 rounded-2xl backdrop-blur-xl border border-[#00e5ff]/20 whitespace-nowrap shadow-[0_0_30px_rgba(0,229,255,0.15)]">
        <svg className="w-8 h-8 animate-spin mb-3" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="font-medium text-xs tracking-[0.2em] uppercase">3D Model Yükleniyor</span>
      </div>
    </Html>
  );
};

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-[#080f1e] text-white">
        <h1 className="text-4xl font-semibold mb-4">Ürün Bulunamadı</h1>
        <p className="text-white/60 mb-6">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
        <button 
          onClick={() => navigate('/')} 
          className="px-6 py-2 bg-[#00e5ff] text-black font-medium rounded hover:bg-[#00cce6] transition-colors"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-[100dvh] bg-[#080f1e] text-white flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* Sol Kısım: 3D Görüntüleyici */}
      <div className="w-full h-[45vh] md:w-3/5 md:h-full relative bg-gradient-to-br from-[#080f1e] to-[#040810] border-b md:border-b-0 md:border-r border-white/10 shrink-0">
        <div className="absolute top-6 left-6 z-10">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium backdrop-blur-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Geri Dön
          </button>
        </div>
        
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <Environment preset="city" />
          <Suspense fallback={<Loader />}>
             <ModelViewer modelPath={product.modelPath} />
             <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2} far={4} />
          </Suspense>
          <OrbitControls autoRotate autoRotateSpeed={2} enablePan={false} enableZoom={true} minDistance={2} maxDistance={10} />
        </Canvas>
        
        <div className="absolute bottom-6 right-6 text-white/40 text-xs flex items-center gap-2 pointer-events-none">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          Döndürmek için sürükleyin
        </div>
      </div>

      {/* Sağ Kısım: Ürün Bilgileri */}
      <div className="w-full h-[55vh] md:w-2/5 md:h-full p-6 md:p-10 overflow-y-auto flex flex-col justify-start md:justify-center">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-2xl md:text-4xl font-semibold text-white mb-4 tracking-wide drop-shadow-lg">
            {product.title}
          </h1>
          
          <div className="w-10 h-1 bg-[#00e5ff] mb-4 rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]"></div>
          
          <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="space-y-3 bg-white/5 p-5 rounded-xl border border-white/10">
            <h3 className="text-white font-medium text-base border-b border-white/10 pb-2 mb-3">Öne Çıkan Özellikler</h3>
            <ul className="text-white/70 space-y-2 text-xs md:text-sm">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_5px_#00e5ff]"></div>
                Yüksek Sadakatli 3D Modelleme
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_5px_#00e5ff]"></div>
                Gerçek Zamanlı Veri Entegrasyonu
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_5px_#00e5ff]"></div>
                Gelişmiş Karar Destek Algoritmaları
              </li>
            </ul>
          </div>
          
          <button className="mt-6 w-full py-3.5 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:border-[#00e5ff]/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] group relative overflow-hidden">
            <span className="relative z-10">Bilgi Al</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
        </motion.div>
      </div>
      
    </div>
  );
}
