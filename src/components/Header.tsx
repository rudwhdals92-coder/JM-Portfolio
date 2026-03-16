"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* 로고 영역 */}
        <Link 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform shadow-sm">
            JM
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            Portfolio
          </span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-sm">
          <Link 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link 
            href="#projects-grid" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects-grid')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-primary transition-colors"
          >
            Work
          </Link>
          <Link 
            href="#contact-section" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
              window.dispatchEvent(new CustomEvent('openContactModal'));
            }}
            className="hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* 모바일 햄버거 메뉴 (아이콘만 배치) */}
        <button className="md:hidden p-2 text-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </motion.header>
  );
};
