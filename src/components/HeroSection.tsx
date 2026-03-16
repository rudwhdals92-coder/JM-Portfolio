"use client";

import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* 배경 장식 애니메이션 (Abstract Blobs) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-[80px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] bg-accent/20 rounded-full mix-blend-multiply filter blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-foreground/80 tracking-wide uppercase">AI Creator & Video Editor</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40, backgroundPosition: "0% 50%" }}
          animate={{ opacity: 1, y: 0, backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ 
            opacity: { duration: 0.8, delay: 0.2, ease: "easeOut" },
            y: { duration: 0.8, delay: 0.2, ease: "easeOut" },
            backgroundPosition: { duration: 8, repeat: Infinity, ease: "linear" }
          }}
          className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 drop-shadow-[0_0_15px_rgba(233,213,255,0.4)] bg-[length:200%_auto]"
        >
          Portfolio
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-2xl text-foreground/60 max-w-2xl mx-auto mb-12 font-medium tracking-widest uppercase"
        >
          Jongmin Kyoung
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 100 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button 
            onClick={() => {
              document.getElementById('projects-grid')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-full bg-primary text-white font-bold text-lg hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            Explore Projects
          </button>
        </motion.div>
      </div>

      {/* 아래로 스크롤 유도 인디케이터 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
        onClick={() => {
          document.getElementById('projects-grid')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-xs uppercase tracking-widest font-semibold">Scroll Down</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-foreground to-transparent"
        />
      </motion.div>
    </section>
  );
};
