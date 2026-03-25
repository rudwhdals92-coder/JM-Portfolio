"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OptimizedVideo } from "@/components/OptimizedVideo";
import { HeroSection } from "@/components/HeroSection";

// 1. 포트폴리오 데이터 구조 (영상 작업물 중심)
const projects = [
  {
    id: 1,
    title: "AI anime MV",
    description: "캐릭터의 외형 및 세계관 설정부터 기획, 제작까지 전 과정을 단독으로 수행하여, AI 도구를 활용한 2분 길이의 애니메이션 뮤직비디오를 제작하였습니다.\n\n희망차고 경쾌한 음악의 분위기에 맞춰 캐릭터를 기획하고, ‘노력하는 자의 꿈은 이루어진다’는 메시지를 중심으로 스토리를 구성했습니다.\n\nNanobanana Pro을 활용해 장면 간 시각적 일관성을 유지한 비주얼을 제작하고, Premiere Pro를 통해 리듬감 있는 컷 편집과 인서트 활용으로 자연스러운 장면 전환을 구현했습니다. 이를 통해 AI 기반 제작 워크플로우를 경험하고 콘텐츠 제작 가능성을 확장했습니다.",
    tools: ["Premiere Pro"],
    aiTools: [
      { category: "Music", tool: "Suno" },
      { category: "Image", tool: "Nanobanana Pro" },
      { category: "Video", tool: "Kling2.5 turbo, Kling 3.0, Grok" }
    ],
    videoUrl: "https://youtu.be/k7afnc2JHec",
    thumbnailUrl: "/GIFs/썸네일1.jpg",
    gifs: ["/GIFs/1-1.mp4", "/GIFs/1-2.mp4", "/GIFs/1-3.mp4", "/GIFs/1-4.mp4"],
  },
  {
    id: 2,
    title: "Spotify on Naver\n모션그래픽 영상",
    description: "네이버 멤버십에 새롭게 추가된 Spotify 서비스를 주제로, 서비스의 주요 기능과 사용 방법을 효과적으로 전달하기 위한 모션그래픽 영상을 제작하였습니다.\n\n사용자들이 서비스를 직관적으로 이해하고 활용할 수 있도록 핵심 기능 중심으로 콘텐츠를 구성하고, 빠른 템포의 BGM과 다양한 모션을 활용해 몰입도를 높였습니다.\n\nAfter Effects의 3D 요소를 활용해 입체적인 연출을 구현하고, Photoshop을 통해 실제 애플리케이션 UI와 유사한 화면을 제작하여 현실감을 강화했습니다. 이를 통해 정보 전달과 시각적 흥미를 동시에 고려한 콘텐츠 제작 역량을 강화했습니다.",
    tools: ["After Effects", "Photoshop"],
    videoUrl: "https://youtu.be/ilJBblLfQkQ",
    thumbnailUrl: "/GIFs/썸네일2.jpg",
    gifs: ["/GIFs/2-1.mp4", "/GIFs/2-2.mp4", "/GIFs/2-3.mp4", "/GIFs/2-4.mp4"],
  },
  {
    id: 3,
    title: "꼬달리 AI 광고 영상",
    description: "AI 이미지 생성 도구인 Midjourney를 활용하여 프랑스 내추럴 뷰티 브랜드 ‘Caudalie(꼬달리)’를 주제로 한 화장품 광고 영상을 제작하였습니다.\n\n브랜드의 자연 친화적인 이미지를 분석해 ‘자연 유래 성분’이라는 콘셉트를 도출하고, 이를 중심으로 영상의 방향을 기획했습니다.\n\n주요 성분인 포도나무 추출물을 시각적으로 강조하는 연출을 통해 브랜드 아이덴티티를 표현했으며, Midjourney를 활용해 자연적인 질감과 분위기를 살린 비주얼을 제작하고 이를 영상으로 구성하여 감성적인 화장품 광고 콘텐츠로 완성했습니다. 이를 통해 브랜드 콘셉트를 시각적으로 구현하는 방법을 경험할 수 있었습니다.",
    tools: ["Premiere Pro", "After Effects"],
    aiTools: [
      { category: "Image", tool: "Midjourney" },
      { category: "Video", tool: "Midjourney" }
    ],
    videoUrl: "https://youtu.be/OaXkgpuatkI",
    thumbnailUrl: "/GIFs/썸네일3.jpg",
    gifs: ["/GIFs/3-1.mp4", "/GIFs/3-2.mp4", "/GIFs/3-3.mp4", "/GIFs/3-4.mp4"],
  },
  {
    id: 4,
    title: "AI 공모전 광고 영상",
    description: "제2회 매경미디어 AI 영상 광고·숏폼 공모전에 출품하기 위해 AI 기반 영상 광고를 제작하였습니다.\n\n공모전 주제에 맞춰 한국을 대표하는 음식인 ‘치킨’을 소재로, 국내를 넘어 글로벌 시장으로 확장되는 과정을 중심으로 영상을 기획했습니다.\n\n브랜드가 성장하며 세계로 뻗어나가는 흐름을 스토리 기반으로 구성하고, AI 영상 제작 기술을 활용해 장면을 연출하여 시각적 전개가 자연스럽게 이어지도록 제작했습니다. 특히 브랜드의 글로벌 확장 과정을 서사 중심의 스토리텔링 방식으로 구성하여, 영상의 몰입도와 완성도를 높였습니다.",
    tools: ["Premiere Pro"],
    aiTools: [
      { category: "Image", tool: "Nanobanana Pro, Grok" },
      { category: "Video", tool: "Kling2.5 turbo, Grok" }
    ],
    videoUrl: "https://youtu.be/sdgdKuQ72kQ",
    thumbnailUrl: "/GIFs/썸네일4.jpg",
    gifs: ["/GIFs/4-1.mp4", "/GIFs/4-2.mp4", "/GIFs/4-3.mp4", "/GIFs/4-4.mp4"],
  },
  {
    id: 5,
    title: "키네틱 타이포그래피 영상",
    description: "PLAVE의 ‘BBUU!’ 곡을 기반으로, 음악의 리듬과 가사를 시각적으로 표현한 키네틱 타이포그래피 영상을 제작하였습니다. 밝고 귀여운 곡의 분위기를 유지하면서 가사와 비트에 맞춘 타이포그래피 모션을 중심으로 영상을 구성했습니다.\n\n특히 반복되는 가사 구간이 지루하게 느껴지지 않도록 다양한 모션과 표현 방식을 적용하여 리듬감 있는 장면을 연출했으며, After Effects를 활용해 프레임 단위로 음악의 비트와 타이밍에 정교하게 맞춘 모션 디테일을 구현했습니다. 이를 통해 타이포그래피의 움직임으로 음악의 에너지를 시각적으로 전달하고자 했습니다.",
    tools: ["Premiere Pro", "After Effects"],
    videoUrl: "https://youtu.be/ZbSRwKALTPc",
    thumbnailUrl: "/GIFs/썸네일5.jpg",
    gifs: ["/GIFs/5-1.mp4", "/GIFs/5-2.mp4", "/GIFs/5-3.mp4", "/GIFs/5-4.mp4"],
  },
  {
    id: 6,
    title: "메이플스토리 23주년\n인포그래픽 영상",
    description: "게임 ‘메이플스토리’ 23주년 이벤트를 주제로, 이벤트 정보를 효과적으로 전달하기 위한 인포그래픽 영상을 제작하였습니다. 빠른 장면 전환과 다양한 시각 요소를 활용해 사용자에게 정보를 직관적으로 전달할 수 있도록 구성했습니다.\n\n공식 이미지에 등장하는 캐릭터를 Illustrator를 활용해 리깅이 가능한 형태로 재구성하여 영상에 적용했으며, 이벤트 요소를 놀이기구 콘셉트의 이미지로 시각화해 콘텐츠의 재미를 더했습니다. Kling을 활용해 놀이기구의 움직임을 구현한 영상을 제작하고 이를 적용하여 콘텐츠 전반에 생동감과 몰입도를 더했습니다. 또한 일부 장면에서는 이벤트 정보를 효과적으로 전달하기 위해 다양한 시각 요소를 결합한 인포그래픽 형태로 구성했습니다.",
    tools: ["Illustrator", "After Effects"],
    aiTools: [
      { category: "Image", tool: "Nanobanana Pro" },
      { category: "Video", tool: "Kling" }
    ],
    videoUrl: "https://youtube.com/shorts/0vPWGIkDaCU?feature=share",
    thumbnailUrl: "/GIFs/썸네일6.jpg",
    gifs: ["/GIFs/6-1.mp4", "/GIFs/6-2.mp4", "/GIFs/6-3.mp4", "/GIFs/6-4.mp4"],
    isShorts: true,
  },
];

// 2. 그 외 추가 영상 작업물 데이터
const otherProjects = [
  { id: 101, title: "퓨리얼 AI 공모전 참여 영상", videoUrl: "/videos/퓨리얼 정수기와 함께 하는 ‘하루의 전환점’_경종민.mp4" },
  { id: 102, title: "코난 AI 실사화 영상", videoUrl: "/videos/코난실사화_경종민.mp4" },
  { id: 103, title: "유튜브 양산형 쇼츠 영상", videoUrl: "/videos/유튜브쇼츠수정.mp4" },
  { id: 105, title: "Coming Soon...", videoUrl: "" },
];

export default function PortfolioPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [selectedGif, setSelectedGif] = useState<string | null>(null); // GIF 팝업용 상태 추가
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string; } | null>(null); // 비디오 팝업용 상태 추가

  // 전역 이벤트 리스너 (헤더 내 About 등 외부 클릭에서 모달 열기용)
  useEffect(() => {
    const handleOpenModal = () => setIsContactModalOpen(true);
    window.addEventListener('openContactModal', handleOpenModal as EventListener);
    return () => window.removeEventListener('openContactModal', handleOpenModal as EventListener);
  }, []);

  // 스크롤 위치에 따라 현재 활성화된 프로젝트 인덱스 업데이트
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // 화면 정중앙을 지날 때 감지
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const indexStr = entry.target.getAttribute("data-index");
          if (indexStr !== null) {
            setActiveIndex(Number(indexStr));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll(".project-video-section");
    
    sections.forEach((section, index) => {
      if (!section.hasAttribute("data-index")) {
        section.setAttribute("data-index", index.toString());
      }
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <HeroSection />
      {/* --- All Projects Grid Section --- */}
    <section id="projects-grid" className="py-24 px-6 md:px-12 lg:px-24 bg-background relative z-10 border-t border-foreground/10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Selected <span className="text-primary italic">Works</span>
            </h2>
            <p className="text-foreground/60 max-w-xl text-lg">
              A collection of videos I made.
            </p>
          </div>
          <button 
            onClick={() => setIsArchiveModalOpen(true)}
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors font-semibold group"
          >
            View Archive 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {projects.map((project, idx) => (
            <motion.div
              key={`grid-${project.id}`}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.15, type: "spring", bounce: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-6"
            >
              {/* Thumbnail Container (큰 영상 팝업 띄우기 / 썸네일 이미지 보여주기) */}
              <div 
                className="group relative z-10 aspect-video rounded-3xl overflow-hidden bg-zinc-900 shadow-lg border border-white/10 hover:border-primary/50 transition-colors duration-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (project.videoUrl) {
                    setSelectedVideo({ url: project.videoUrl, title: project.title });
                  }
                }}
              >
                {project.thumbnailUrl ? (
                  <img 
                    src={project.thumbnailUrl} 
                    alt={`${project.title} thumbnail`} 
                    className={`w-full h-full ${project.isShorts ? 'object-contain bg-black' : 'object-cover'} transition-transform duration-700 group-hover:scale-105`}
                  />
                ) : (
                  <OptimizedVideo 
                    src={project.videoUrl} 
                    isActive={true} 
                  />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 delay-100 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Info Container (해당 프로젝트 영역으로 부드럽게 스크롤) */}
              <div 
                className="group flex flex-col gap-2 p-4 mt-1 rounded-2xl cursor-pointer bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 relative z-20"
                onClick={(e) => {
                  e.stopPropagation();
                  const sections = document.querySelectorAll('.project-video-section');
                  if (sections[idx]) {
                    sections[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
              >
                <div className="flex flex-wrap gap-2 mb-1">
                  {project.tools.slice(0, 2).map(tool => ( // 툴은 두개까지만 간략하게 표시
                    <span key={tool} className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-sm">
                      {tool}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                  {project.title.includes('\n') ? (
                    <span className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-foreground/60 tracking-wider break-words">{project.title.split('\n')[0]}</span>
                      <span className="line-clamp-2">{project.title.split('\n')[1]}</span>
                    </span>
                  ) : (
                    <span className="line-clamp-2">{project.title}</span>
                  )}
                </h3>
                <div className="text-foreground/60 text-sm line-clamp-2 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
                  {project.description.split('\n\n').map((para, idx) => (
                    <p key={idx} className="whitespace-pre-wrap">{para.trim()}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

      <main id="work" className="flex flex-col md:flex-row md:items-start min-h-screen bg-background text-foreground transition-colors duration-500 relative z-10">
      {/* --- 좌측 섹션 (Sticky) --- */}
      <section className="md:w-1/2 h-screen sticky top-0 flex flex-col justify-center p-8 lg:p-16 overflow-hidden bg-gradient-to-br from-background to-accent/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={projects[activeIndex].id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full flex flex-col"
          >
            {/* 고정된 높이를 가진 Header 영역 */}
            <div className="flex items-center gap-3 mb-2 h-[28px]">
              <span className="text-primary font-bold animate-bounce-soft uppercase tracking-wider text-sm md:text-base">
                Project 0{activeIndex + 1}
              </span>
              {activeIndex === 0 && (
                <span className="text-foreground/50 font-medium text-sm md:text-base tracking-wide border-l border-foreground/20 pl-3">
                  AI 기반 애니메이션 뮤직비디오
                </span>
              )}
              {activeIndex === 1 && (
                <span className="text-foreground/50 font-medium text-sm md:text-base tracking-wide border-l border-foreground/20 pl-3">
                  설명 목적의 모션그래픽 영상
                </span>
              )}
              {activeIndex === 2 && (
                <span className="text-foreground/50 font-medium text-sm md:text-base tracking-wide border-l border-foreground/20 pl-3">
                  AI 기반 화장품 광고 영상
                </span>
              )}
              {activeIndex === 3 && (
                <span className="text-foreground/50 font-medium text-sm md:text-base tracking-wide border-l border-foreground/20 pl-3">
                  제2회 매경미디어 AI 영상 공모전 출품작
                </span>
              )}
              {activeIndex === 4 && (
                <span className="text-foreground/50 font-medium text-sm md:text-base tracking-wide border-l border-foreground/20 pl-3">
                  PLAVE – BBUU! 음악 기반 타이포그래피 영상
                </span>
              )}
              {activeIndex === 5 && (
                <span className="text-foreground/50 font-medium text-sm md:text-base tracking-wide border-l border-foreground/20 pl-3">
                  이벤트 정보를 전달하는 게임 인포그래픽 영상
                </span>
              )}
            </div>

            {/* Title 영역 */}
            <div className="flex flex-col justify-start mb-6 overflow-hidden">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground/90">
                {projects[activeIndex].title.includes('\n') ? (
                  <span className="flex flex-col gap-1">
                    <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground/60 tracking-wider">{projects[activeIndex].title.split('\n')[0]}</span>
                    <span>{projects[activeIndex].title.split('\n')[1]}</span>
                  </span>
                ) : (
                  projects[activeIndex].title
                )}
              </h1>
            </div>

            {/* Description 영역 */}
            <div className="max-h-[210px] md:max-h-[240px] lg:max-h-[280px] text-base md:text-lg text-foreground/70 mb-8 w-full max-w-none leading-relaxed font-medium overflow-y-auto hide-scrollbar pr-2 md:pr-4 [&>p]:mb-4 [&>p:last-child]:mb-0">
              {projects[activeIndex].description.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-wrap">{paragraph.trim()}</p>
              ))}
            </div>

            {/* Tools & AI Tools 영역 */}
            <div className="flex flex-col justify-start mb-4">
              <div className="flex gap-2 flex-wrap mb-3">
                {projects[activeIndex].tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-1.5 bg-white text-secondary-foreground font-semibold text-xs md:text-sm rounded-full border-2 border-primary/20 shadow-sm hover:animate-wiggle hover:border-primary/50 transition-colors cursor-default"
                    style={{ color: "var(--foreground)" }}
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {projects[activeIndex].aiTools && (
                <div className="flex flex-col gap-1 pl-4 border-l-2 border-primary/30">
                  {projects[activeIndex].aiTools.map((item, idx) => (
                    <div key={idx} className="text-sm flex flex-col md:flex-row md:items-end gap-1 md:gap-3">
                      <span className="font-bold text-primary tracking-widest uppercase text-xs w-16">{item.category}</span>
                      <span className="text-foreground/70 font-medium">{item.tool}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* GIF Spaces (4 slots) */}
            <div className="grid grid-cols-4 gap-3 w-full max-w-none pr-2 md:pr-4">
              {[0, 1, 2, 3].map((i) => {
                const gifSrc = projects[activeIndex].gifs?.[i];
                return (
                  <div 
                    key={i} 
                    className={`aspect-video bg-foreground/5 rounded-xl border border-foreground/10 overflow-hidden relative group ${gifSrc ? 'cursor-zoom-in' : 'cursor-default'}`}
                    onClick={() => {
                      if (gifSrc) setSelectedGif(gifSrc); // GIF 스크린이 클릭되면 팝업 열기
                    }}
                  >
                    {/* 빈 공간일 때 보여줄 Placeholder */}
                    {!gifSrc && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-foreground/30 transition-colors group-hover:bg-foreground/10">
                        <svg className="w-6 h-6 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[10px] font-semibold uppercase tracking-widest mt-1">GIF {i + 1}</span>
                      </div>
                    )}
                    {/* GIF나 이미지가 등록되어 있을 때 보여줄 이미지/영상 */}
                    {gifSrc && (
                      <>
                        {gifSrc.endsWith('.mp4') ? (
                          <div className="absolute inset-0 w-full h-full [&>video]:absolute [&>video]:inset-0 [&>video]:w-full [&>video]:h-full [&>video]:object-cover group-hover:[&>video]:scale-110 [&>video]:transition-transform [&>video]:duration-500 pointer-events-none">
                            <OptimizedVideo 
                              src={gifSrc} 
                              isActive={true} 
                            />
                          </div>
                        ) : (
                          <img 
                            src={gifSrc} 
                            alt={`${projects[activeIndex].title} media ${i + 1}`} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          />
                        )}
                        {/* 마우스오버 시 돋보기 아이콘 표시 */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 인디케이터 */}
        <div className="absolute bottom-12 left-12 flex gap-3">
          {projects.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-500 ease-in-out ${
                i === activeIndex ? "w-10 bg-primary shadow-md" : "w-2 bg-foreground/20"
              }`}
            />
          ))}
        </div>
      </section>

      {/* --- 우측 섹션 (Scroll) --- */}
      <section className="md:w-1/2 bg-background/50">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-video-section h-[80vh] md:h-screen flex items-center justify-center p-6 md:p-12 perspective-1000"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 80 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              viewport={{ once: false, margin: "-20%" }}
              className="w-full h-full relative"
            >
              <motion.div
                animate={{ y: [-12, 12, -12] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="w-full h-full bg-white rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)] border-2 border-white/50 relative group"
              >
                <div 
                  className="w-full h-full relative group cursor-pointer"
                  onClick={() => {
                    if (project.videoUrl) {
                      setSelectedVideo({ url: project.videoUrl, title: project.title });
                    }
                  }}
                >
                  {project.thumbnailUrl ? (
                    <>
                      <img 
                        src={project.thumbnailUrl} 
                        alt={`${project.title} thumbnail`} 
                        className={`w-full h-full ${project.isShorts ? 'object-contain bg-black' : 'object-cover'} transition-transform duration-700 group-hover:scale-105`}
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 delay-100 shadow-xl">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </>
                  ) : (
                    <OptimizedVideo 
                      src={project.videoUrl} 
                      isActive={activeIndex === index} 
                    />
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        ))}
        {/* 하단 여백: 마지막 아이템도 충분히 스크롤 되도록 */}
        <div className="h-[20vh]" />
      </section>
    </main>

    {/* --- Other Works Section --- */}
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-background border-t border-foreground/10 relative z-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground/80">
            More <span className="italic">Experiments</span>
          </h2>
          <p className="text-foreground/50 max-w-2xl mx-auto">
            A selection of short-form videos, tests, and other personal projects exploring new techniques.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {otherProjects.map((project, idx) => (
            <motion.div
              key={`other-${project.id}`}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.1, type: "spring", bounce: 0.4 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group cursor-pointer flex flex-col gap-3"
            >
              <div 
                className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 group-hover:border-primary/40 transition-colors duration-500"
                onClick={() => setSelectedVideo({ url: project.videoUrl, title: project.title })}
              >
                <OptimizedVideo 
                  src={project.videoUrl} 
                  isActive={true} 
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white font-semibold tracking-wider text-sm border border-white/50 px-4 py-2 rounded-full scale-90 group-hover:scale-100 transition-all duration-300">
                    Play
                  </span>
                </div>
              </div>
              <h4 className="text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors text-center px-2 truncate">
                {project.title}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* --- Final THANK YOU Section --- */}
    <section id="contact-section" className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-background border-t border-foreground/5 mt-24">
      {/* 장식 애니메이션 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[1px] border-primary/5 rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border-[1px] border-accent/5 rounded-full pointer-events-none border-dashed"
      />

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center -translate-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          viewport={{ once: true }}
          className="mb-8 p-4 bg-primary/10 rounded-full inline-flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 drop-shadow-[0_0_15px_rgba(233,213,255,0.4)]"
        >
          THANK YOU
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl text-foreground/50 max-w-2xl mx-auto mb-16 tracking-wide font-light"
        >
          For watching my portfolio.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="px-8 py-4 rounded-full bg-foreground text-background font-bold text-lg hover:bg-primary hover:text-white transition-colors duration-300"
          >
            Get in Touch
          </button>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 rounded-full border-2 border-foreground/20 text-foreground font-semibold text-lg hover:border-foreground transition-all duration-300 flex items-center gap-2"
          >
            Back to Top
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Footer copyright */}
      <div className="absolute bottom-8 text-center w-full">
        <p className="text-sm text-foreground/30 font-medium tracking-widest uppercase">
          © {new Date().getFullYear()} JONGMIN KYOUNG. All rights reserved.
        </p>
      </div>
    </section>

    {/* --- Contact Modal Overlay --- */}
    <AnimatePresence>
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsContactModalOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="relative w-full max-w-lg bg-background p-8 md:p-12 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.3)] border border-foreground/10 overflow-hidden"
          >
            {/* Modal Header/Decorative */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary" />
            
            <button 
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-foreground/5 text-foreground/50 hover:text-foreground transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col gap-8 mt-4">
              <div>
                <h3 className="text-3xl font-extrabold tracking-tight mb-2">Let's Talk</h3>
                <p className="text-foreground/60">I'm currently available for new projects.<br/>Feel free to reach out via phone or email.</p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="group flex items-center gap-4 p-4 rounded-2xl bg-foreground/5 hover:bg-foreground/10 transition-colors cursor-default border border-transparent hover:border-foreground/10">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 text-pink-500 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-foreground/50 font-semibold mb-1">Name</span>
                    <span className="text-xl font-bold tracking-tight text-foreground">경종민</span>
                  </div>
                </div>

                <div className="group flex items-center gap-4 p-4 rounded-2xl bg-foreground/5 hover:bg-foreground/10 transition-colors cursor-default border border-transparent hover:border-foreground/10">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-foreground/50 font-semibold mb-1">Phone Number</span>
                    <a href="tel:010-2706-3341" className="text-xl font-bold font-mono tracking-tight hover:text-primary transition-colors">010-2706-3341</a>
                  </div>
                </div>

                <div className="group flex items-center gap-4 p-4 rounded-2xl bg-foreground/5 hover:bg-foreground/10 transition-colors cursor-default border border-transparent hover:border-foreground/10">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-foreground/50 font-semibold mb-1">E-mail</span>
                    <a href="mailto:minmin710@naver.com" className="text-lg font-bold tracking-tight hover:text-accent transition-colors">minmin710@naver.com</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

    {/* --- View Archive Modal Overlay --- */}
    <AnimatePresence>
      {isArchiveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsArchiveModalOpen(false)}
            className="absolute inset-0 bg-background/90 backdrop-blur-md cursor-pointer"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
            className="relative w-full h-full max-w-7xl bg-background/50 border border-foreground/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header / Sticky Top */}
            <div className="flex items-center justify-between p-6 md:px-10 border-b border-foreground/10 bg-background/80 backdrop-blur-xl z-10">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight">Project Archive</h3>
                <p className="text-foreground/50 text-sm">Past experiments and works.</p>
              </div>
              <button 
                onClick={() => setIsArchiveModalOpen(false)}
                className="p-3 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Video Grid Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 hide-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
                {/* 
                  1. 메인 projects 요소를 맨 앞에
                  2. otherProjects 요소를 뒤에 붙인 배열을 활용
                */}
                {[...projects, ...otherProjects].map((proj, i) => (
                  <motion.div 
                    key={`archive-${proj.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group relative flex flex-col gap-3"
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-white/10 group-hover:border-primary/50 transition-colors">
                      <OptimizedVideo src={proj.videoUrl} isActive={true} />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                        {proj.title}
                      </h4>
                      {Array.isArray((proj as any).tools) && ((proj as any).tools as string[]).length > 0 && (
                        <p className="text-xs text-foreground/50 uppercase tracking-wider mt-1 truncate">
                          {((proj as any).tools as string[]).join(" • ")}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="py-12 text-center text-foreground/30 text-sm font-semibold tracking-widest uppercase">
                End of Archive
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

    {/* --- GIF Fullscreen Modal Overlay --- */}
    <AnimatePresence>
      {selectedGif && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGif(null)}
            className="absolute inset-0 bg-background/95 backdrop-blur-xl cursor-zoom-out"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center justify-center pointer-events-none"
          >
            {/* 닫기 버튼 */}
            <button 
              onClick={() => setSelectedGif(null)}
              className="absolute -top-12 right-0 md:-right-12 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground transition-colors pointer-events-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {selectedGif.endsWith('.mp4') ? (
              <video 
                src={selectedGif} 
                autoPlay
                loop
                muted
                playsInline
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-foreground/10 pointer-events-auto"
              />
            ) : (
              <img 
                src={selectedGif} 
                alt="Expanded GIF View" 
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-foreground/10 pointer-events-auto" 
              />
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>

    {/* --- Video Fullscreen Modal Overlay --- */}
    <AnimatePresence>
      {selectedVideo && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            className="absolute inset-0 bg-background/95 backdrop-blur-xl cursor-zoom-out"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="relative w-full max-w-7xl aspect-video flex flex-col items-center justify-center pointer-events-none"
          >
            {/* 닫기 버튼 */}
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 md:-right-12 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground transition-colors pointer-events-auto z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-full h-full rounded-2xl shadow-2xl overflow-hidden border border-foreground/10 pointer-events-auto relative bg-black">
               {selectedVideo.url.includes("youtu") ? (
                 <iframe
                   src={selectedVideo.url.replace("youtu.be/", "www.youtube.com/embed/").replace("watch?v=", "embed/").replace("youtube.com/shorts/", "www.youtube.com/embed/").split("?")[0] + "?autoplay=1"}
                   className="w-full h-full border-none"
                   allow="autoplay; encrypted-media"
                   allowFullScreen
                   title={selectedVideo.title}
                 />
               ) : (
                 <video 
                   src={selectedVideo.url} 
                   controls 
                   autoPlay 
                   className="w-full h-full object-contain"
                 />
               )}
               <div className="absolute top-4 left-4 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white text-sm font-semibold tracking-wider">
                 {selectedVideo.title}
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

    </>
  );
}
