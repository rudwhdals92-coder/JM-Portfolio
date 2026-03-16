"use client";

import { useState, useEffect, useRef } from "react";

export const OptimizedVideo = ({ src, isActive }: { src: string; isActive: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasError, setHasError] = useState(false);

  // 1. 화면에 잡히기 직전에만 src를 렌더링하기 위한 옵저버 (대역폭 절약)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "200px" } // 화면에 진입하기 200px 전부터 미리 로드
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  // 2. 현재 활성화된 영상만 재생하고 나머지는 일시정지 (메모리, 배터리 최적화)
  useEffect(() => {
    if (!videoRef.current) return;

    if (isActive) {
      // 재생 시도 (브라우저 정책에 의해 차단될 수 있으므로 catch 처리)
      videoRef.current.play().catch(error => {
        console.warn("Auto-play prevented:", error);
      });
    } else {
      videoRef.current.pause();
    }
  }, [isActive]);

  if (!src || hasError) {
    return (
      <div className="w-full h-full relative flex items-center justify-center bg-zinc-900 overflow-hidden group">
        <img 
          src="/placeholder.png" 
          alt="Video Placeholder" 
          className="w-full h-full object-cover opacity-50 transition-transform duration-1000 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-transparent" />
        
        <div className="absolute flex flex-col items-center gap-4 backdrop-blur-md bg-white/5 border border-white/10 px-8 py-6 rounded-2xl shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
            <svg className="w-6 h-6 text-white/70 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-white/80 font-medium tracking-widest text-sm uppercase">Video Coming Soon</span>
        </div>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      // 로컬 파일이나 빠른 로딩이 필요한 경우를 위해 바로 src 지정 (IntersectionObserver 최적화 제거 혹은 완화)
      src={src}
      muted
      loop
      playsInline
      preload="auto"
      onError={(e) => {
        console.error("Video loading error:", e);
        setHasError(true);
      }}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
};
