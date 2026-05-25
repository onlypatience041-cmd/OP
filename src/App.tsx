import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Volume2, VolumeX, ArrowUp, X } from "lucide-react";
// @ts-ignore
import stoneTextureBackground from "./assets/images/stone_texture_bg_1779635081857.png";
// @ts-ignore
import perfumesOnRockPlatform from "./assets/images/perfumes_on_rock_platform_1779635840155.png";

const UNIQUE_HERO_IMAGE = "https://res.cloudinary.com/dilgatlft/image/upload/v1779672639/ChatGPT_Image_May_25_2026_06_59_33_AM_zvnpfb.png";

const GALLERY_PERFUMES = [
  {
    id: 1,
    name: "SENSORY COUD",
    volume: "100ml",
    type: "Extraits de Cologne",
    liquidColor: "bg-[#252322]/30",
    capColor: "bg-stone-800",
    label: "SENSORY COUD",
    sub: "CHRISTIAN DIOR",
    rockStyle: "rounded-[35%_65%_70%_30%_/_40%_35%_65%_60%] rotate-3 border-stone-800",
    rockBg: "from-stone-900 to-[#121110]",
    notes: ["Cold Ozone", "White Patchouli", "Dry Cedar"],
    align: "start"
  },
  {
    id: 2,
    name: "RAW LICHEN",
    volume: "100ml",
    type: "Parfum Unique",
    liquidColor: "bg-[#2c2d28]/25",
    capColor: "bg-zinc-800",
    label: "RAW LICHEN",
    sub: "CHRISTIAN DIOR",
    rockStyle: "rounded-[60%_40%_30%_70%_/_50%_60%_40%_50%] -rotate-2 border-zinc-900",
    rockBg: "from-zinc-900 to-neutral-950",
    notes: ["Spiced Moss", "Wet Bark", "Cold Rain"],
    align: "end"
  },
  {
    id: 3,
    name: "MATTE OBSIDIAN",
    volume: "100ml",
    type: "Intense Parfum",
    liquidColor: "bg-[#18181a]/20",
    capColor: "bg-stone-950",
    label: "OBSIDIAN RAW",
    sub: "CHRISTIAN DIOR",
    rockStyle: "rounded-[40%_60%_50%_50%_/_30%_40%_60%_70%] rotate-6 border-stone-800",
    rockBg: "from-[#1a1a1e] to-[#0a0a0c]",
    notes: ["Volcanic Ash", "Suede Leather", "Dry Birch"],
    align: "start"
  },
  {
    id: 4,
    name: "AMBRE BRUT",
    volume: "100ml",
    type: "Esprit de Parfum",
    liquidColor: "bg-[#2e2620]/30",
    capColor: "bg-[#201c18]",
    label: "AMBRE BRUT",
    sub: "CHRISTIAN DIOR",
    rockStyle: "rounded-[55%_45%_65%_35%_/_45%_55%_45%_55%] -rotate-6 border-stone-900",
    rockBg: "from-[#1d1917] to-black",
    notes: ["Roasted Tonka", "Cracked Herb", "Ancient Incense"],
    align: "end"
  },
  {
    id: 5,
    name: "SILVER COBBLE",
    volume: "100ml",
    type: "Dior Exclusive",
    liquidColor: "bg-[#232729]/20",
    capColor: "bg-stone-800",
    label: "SILVER COBBLE",
    sub: "CHRISTIAN DIOR",
    rockStyle: "rounded-[50%_50%_40%_60%_/_60%_40%_60%_40%] rotate-12 border-[#202022]",
    rockBg: "from-[#222426] to-[#0c0d0f]",
    notes: ["Mineral Slate", "Silver Spruce", "Cold Water"],
    align: "start"
  },
  {
    id: 6,
    name: "NOIR MONOLITH",
    volume: "100ml",
    type: "Extrait de Parfum",
    liquidColor: "bg-[#111112]/40",
    capColor: "bg-neutral-900",
    label: "NOIR MONOLITH",
    sub: "CHRISTIAN DIOR",
    rockStyle: "rounded-[30%_70%_45%_55%_/_35%_45%_55%_65%] -rotate-3 border-stone-950",
    rockBg: "from-[#151515] to-[#020202]",
    notes: ["Dark Vetiver", "Charcoal Wood", "Ebony Amber"],
    align: "end"
  }
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [droplets, setDroplets] = useState<{ id: number; left: number; top: number; delay: number; scale: number; speed: number; xWiggles: number[] }[]>([]);
  const [isMuted, setIsMuted] = useState(true);
  const [videoHovered, setVideoHovered] = useState(false);
  const [menVideoHovered, setMenVideoHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const menVideoRef = useRef<HTMLVideoElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  // Parallax & Scale Transitions for magnificent page changes
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.88]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -60]);

  // Smooth Interpolated Background Gradient to blend the dark first page into light second page
  const bgColor = useTransform(scrollYProgress, [0, 0.35, 1], ["#000000", "#faf9f6", "#faf9f6"]);

  const [showGallery, setShowGallery] = useState(false);
  const [isSlicing, setIsSlicing] = useState(false);
  const [slicingPhase, setSlicingPhase] = useState<"idle" | "entering" | "revealed">("idle");

  const triggerSideSliceTransition = () => {
    if (isSlicing) return;
    setIsSlicing(true);
    setSlicingPhase("entering");

    // Switch to gallery view when panels have fully swept the viewport
    setTimeout(() => {
      setShowGallery(true);
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
      setSlicingPhase("revealed");
    }, 800);

    // End transition completely after slide-out ends
    setTimeout(() => {
      setIsSlicing(false);
      setSlicingPhase("idle");
    }, 1600);
  };

  const triggerBackToMainTransition = () => {
    if (isSlicing) return;
    setIsSlicing(true);
    setSlicingPhase("entering");

    // Switch back to landing view when panels have fully swept the viewport
    setTimeout(() => {
      setShowGallery(false);
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
      setSlicingPhase("revealed");
    }, 800);

    // End transition completely after slide-out ends
    setTimeout(() => {
      setIsSlicing(false);
      setSlicingPhase("idle");
    }, 1600);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    if (videoRef.current) videoRef.current.muted = nextMuted;
    if (menVideoRef.current) menVideoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Single image background is static and clean now

  useEffect(() => {
    // Generate organic luxury water droplets with asymmetrical winding/bending travel paths
    const items = Array.from({ length: 30 }).map((_, i) => {
      const scale = 0.25 + Math.random() * 0.75;
      const speed = 6 + Math.random() * 9;
      // Negative delay pre-warms the animation timeline so the water is already actively wetting down the page on initial load
      const delay = -Math.random() * speed;
      const left = Math.random() * 100;
      const top = -(Math.random() * 32 + 12);
      
      // Create non-linear, customized horizontal winding offsets
      // to simulate water running on unpredictable, organic paths
      const xKeyframes = [0];
      const steps = 6;
      let currentX = 0;
      for (let s = 1; s <= steps; s++) {
        // Organic random drift left or right, styled beautifully
        const drift = (Math.random() - 0.5) * 55 * scale;
        currentX += drift;
        xKeyframes.push(currentX);
      }

      return {
        id: i,
        left,
        top,
        delay,
        scale,
        speed,
        xWiggles: xKeyframes,
      };
    });
    setDroplets(items);
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      style={{ backgroundColor: showGallery ? "#090807" : bgColor }}
      className={`w-full h-screen overflow-x-hidden relative font-sans ${
        showGallery ? "overflow-y-auto" : "overflow-y-auto snap-y snap-mandatory scroll-smooth"
      }`}
    >
      {/* SVG Water Ripple & Wet Fluid Distortion Filter */}
      <svg className="absolute w-0 h-0 opacity-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <defs>
          <filter id="water-wetting">
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves="2" result="wave">
              <animate attributeName="baseFrequency" dur="20s" keyTimes="0;0.5;1" values="0.014 0.018;0.018 0.024;0.014 0.018" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="wave" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {!showGallery ? (
        <>
          <section id="hero-section" className="relative w-full h-[125vh] overflow-hidden bg-transparent snap-start snap-always shrink-0">
        <motion.div
          className="w-full h-full relative"
          style={{
            scale: heroScale,
            opacity: heroOpacity,
            y: heroY,
          }}
        >
          {/* Stunning Bold Centered Headline in middle of the screen */}
        <motion.div
          id="center-headline"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none select-none filter drop-shadow-[0_8px_32px_rgba(0,0,0,0.85)]"
        >
          <div className="relative flex flex-col items-center justify-center select-none pt-12">
            {/* The giant HEAVEN backdrop styled like SHORE with overlapping letter spacing */}
            <h1 
              className="font-sub font-light text-7xl sm:text-9xl md:text-[11rem] lg:text-[13rem] leading-none mb-0 select-none text-white filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)] uppercase"
              style={{
                letterSpacing: "-0.08em",
              }}
            >
              HEAVEN
            </h1>

            {/* Minimalist details directly like the SHORE image layout */}
            <div className="mt-8 md:mt-12 flex flex-col items-center gap-1.5 md:gap-2 select-none">
              <span className="font-sub text-[11px] sm:text-xs md:text-sm text-white/90 tracking-widest font-light">
                (2026©)
              </span>
              <span className="font-sub text-[11px] sm:text-xs md:text-sm text-white/95 tracking-[0.4em] sm:tracking-[0.55em] uppercase font-light text-center">
                LUXURY AND MINIMALIST
              </span>
              <span className="font-sub text-[10px] sm:text-[11px] md:text-xs text-white/70 tracking-[0.35em] uppercase font-light text-center">
                SANS SERIF FONT
              </span>
            </div>
          </div>
        </motion.div>



        {/* Right Side Vertical Luxury Accessory Bar */}
        <motion.div
          id="right-accessory-sidebar"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-5 select-none pointer-events-none filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        >
          {/* Top Elegant Vertical Line */}
          <span className="w-[0.5px] h-20 md:h-28 bg-[#cbd5e1]/30 block" />

          {/* Elegant Vertical Text */}
          <span
            className="font-sub text-[7.5px] md:text-[8.5px] tracking-[0.45em] font-light text-[#cbd5e1]/75 uppercase whitespace-nowrap block"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              textRendering: "optimizeLegibility",
            }}
          >
            LUXURY IN ITS PUREST FORM
          </span>

          {/* Golden/Silver Accent Horizontal Spacer Line */}
          <span className="w-1.5 h-[0.5px] bg-[#cbd5e1]/50 block" />

          {/* Stacked NY over M Brand Mark */}
          <div className="flex flex-col items-center gap-0 tracking-[0.1em] font-serif leading-none mt-1">
            <span className="font-serif text-[11px] md:text-[12.5px] font-normal text-white/90">
              NY
            </span>
            <span className="font-serif text-[11px] md:text-[12.5px] font-normal text-white/90">
              M
            </span>
          </div>
        </motion.div>

        {/* Luxury Brand Logo */}
        <motion.div
          id="brand-logo"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 z-20 text-center flex flex-col items-center pointer-events-none select-none"
        >
          {/* Elevated Brand Typeface with stunning shiny silver metallic gradient */}
          <span
            className="font-luxury text-2xl md:text-3xl tracking-[0.55em] font-medium uppercase mr-[-0.55em] leading-none bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #8a909a 0%, #cbd5e1 20%, #ffffff 45%, #94a3b8 55%, #f1f5f9 75%, #475569 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.5))",
            }}
          >
            NYM
          </span>

          {/* Luxury Subline Tag in matching fine silver */}
          <div className="flex items-center gap-2 mt-3.5">
            <span className="h-[0.5px] w-4 bg-white/20" />
            <span
              className="font-sub text-[7px] md:text-[8px] tracking-[0.7em] font-medium uppercase mr-[-0.7em] leading-none bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #e2e8f0 0%, #ffffff 50%, #94a3b8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              PERFUMES
            </span>
            <span className="h-[0.5px] w-4 bg-white/20" />
          </div>
        </motion.div>

        {/* Luxury Top-Right Navigation Controls (Naked high-contrast icons for maximum elegance) */}
        <motion.div
          id="top-right-nav"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-8 md:top-10 right-8 md:right-20 z-30 flex items-center gap-3.5 md:gap-4"
        >
          {/* Menu Icon with high-fidelity, razor-sharp three horizontal lines silver style */}
          <button
            id="nav-menu"
            className="group relative flex items-center justify-center p-1 cursor-pointer select-none transition-all duration-300 hover:scale-105 active:scale-95 bg-transparent border-0"
            aria-label="Menu"
          >
            <svg
              className="w-4.5 h-4.5 md:w-[1.15rem] md:h-[1.15rem] transition-all duration-300 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        </motion.div>

        <motion.img
          src={UNIQUE_HERO_IMAGE}
          alt="Luxury Perfume Campaign"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover object-center block z-0"
          style={{
            filter: "url(#water-wetting) contrast(1.05) brightness(0.9)",
          }}
          referrerPolicy="no-referrer"
        />

        {/* Dynamic Wet Sheen Water Ambient Overlay */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-50"
          style={{
            background: "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.2) 0%, transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)",
          }}
        />

        {/* Real-time 3D Sliding Luxury Water Droplets following unpredictable curved paths */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden select-none">
          {droplets.map((drop) => (
            <motion.div
              key={drop.id}
              initial={{ y: `${drop.top}vh`, x: 0, opacity: 0 }}
              animate={{ 
                y: "115vh",
                x: drop.xWiggles,
                opacity: [0, 0.85, 0.85, 0],
              }}
              transition={{
                duration: drop.speed,
                repeat: Infinity,
                delay: drop.delay,
                ease: "easeInOut",
              }}
              className="absolute"
              style={{
                left: `${drop.left}%`,
                width: `${8 * drop.scale}px`,
                height: `${16 * drop.scale}px`,
              }}
            >
              {/* Ultra-realistic liquid wetting trail left behind */}
              <div 
                className="absolute bottom-full left-1/2 -translate-x-1/2 w-[1.5px] bg-gradient-to-t from-white/20 to-transparent pointer-events-none origin-bottom" 
                style={{ 
                  height: `${220 * drop.scale}px`, 
                  opacity: 0.18
                }} 
              />
              
              {/* Bulgy, bulbous teardrop water structure */}
              <div 
                className="relative w-full h-full rounded-[50%_50%_40%_40%/_60%_60%_40%_40%]"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.02) 85%)",
                  boxShadow: "inset -1.5px -2px 3px rgba(255,255,255,0.7), inset 1.5px 1.5px 3px rgba(0,0,0,0.4), 0px 1px 2px rgba(255,255,255,0.3), 0px 3px 6px -1px rgba(0,0,0,0.55)",
                  backdropFilter: "blur(1.5px) contrast(1.1)",
                  WebkitBackdropFilter: "blur(1.5px) contrast(1.1)",
                }}
              >
                {/* Upper specular glare dot */}
                <div 
                  className="absolute top-[12%] left-[18%] rounded-full bg-white/95"
                  style={{
                    width: `${2.2 * drop.scale}px`,
                    height: `${1.2 * drop.scale}px`,
                    transform: "rotate(-18deg)",
                    filter: "blur-[0.1px]",
                  }}
                />
                
                {/* Lower secondary refraction glint */}
                <div 
                  className="absolute bottom-[10%] right-[15%] rounded-full bg-white/45"
                  style={{
                    width: `${1.6 * drop.scale}px`,
                    height: `${1 * drop.scale}px`,
                    transform: "rotate(15deg)",
                    filter: "blur-[0.2px]",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Exclusive Luxury Scrolling Indicator & Navigation */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer pointer-events-auto select-none group"
          onClick={() => {
            document.getElementById("white-sensory-page")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span 
            className="font-sub text-[10px] md:text-[11px] tracking-[0.35em] uppercase block font-medium transition-all duration-300 border-b border-stone-200/30 pb-1.5 cursor-pointer group-hover:border-slate-300/80"
            style={{
              backgroundImage: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 35%, #94a3b8 70%, #f1f5f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0px 1.5px 4px rgba(0, 0, 0, 0.75))"
            }}
          >
            Discover
          </span>
        </div>
        </motion.div>
      </section>

      {/* Pristine Luxury White Section (Page 2) */}
      <section 
        id="white-sensory-page" 
        className="relative w-full h-screen text-[#1c1917] snap-start snap-always shrink-0 overflow-hidden select-none"
      >
        <div className="w-full h-full flex flex-col md:flex-row bg-[#faf9f6] relative">
        {/* Decorative ultra-thin luxury borders wrapped around the section */}
        <div className="absolute top-6 left-6 right-6 bottom-6 border-[0.5px] border-stone-200/45 pointer-events-none z-30" />

        {/* Left Screen: Interactive Cinematic Video (WOMEN CHOICE) */}
        <div
          onClick={triggerSideSliceTransition}
          className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden bg-stone-100 cursor-pointer z-10 group border-b md:border-b-0 md:border-r border-stone-200/50"
          onMouseEnter={() => {
            setVideoHovered(true);
          }}
          onMouseLeave={() => {
            setVideoHovered(false);
          }}
        >
          {/* Campaign Video */}
          <video
            ref={videoRef}
            src="https://v1.pinimg.com/videos/mc/720p/06/74/95/067495421364118b97d71262ec76777c.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />

          {/* Vignette Shadow Overlay for enhanced high-fidelity contrast */}
          <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

          {/* Elegant "Women Choice" Signature Overlay right in the middle (No Rectangular Box) */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h3 className="font-signature text-6xl md:text-7xl lg:text-8xl text-white select-none leading-none tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)] capitalize">
                Women Choice
              </h3>
            </motion.div>
          </div>
        </div>

        {/* Right Screen: Interactive Cinematic Video (MEN CHOICE) */}
        <div
          onClick={triggerSideSliceTransition}
          className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden bg-stone-100 cursor-pointer z-10 group"
          onMouseEnter={() => {
            setMenVideoHovered(true);
          }}
          onMouseLeave={() => {
            setMenVideoHovered(false);
          }}
        >
          {/* Campaign Video */}
          <video
            ref={menVideoRef}
            src="https://v1.pinimg.com/videos/iht/expMp4/01/7a/42/017a424eba8ea16bbfb0900c0d8d1aa2_720w.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />

          {/* Vignette Shadow Overlay for enhanced high-fidelity contrast */}
          <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

          {/* Elegant "Men Choice" Signature Overlay right in the middle (No Rectangular Box) */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h3 className="font-signature text-6xl md:text-7xl lg:text-8xl text-white select-none leading-none tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)] capitalize">
                Men Choice
              </h3>
            </motion.div>
          </div>
        </div>

        {/* Global Floating Sound Controls (z-30) */}
        <div className="absolute top-10 right-10 z-30">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-md shadow-[0_12px_36px_rgba(0,0,0,0.15)] flex items-center justify-center text-stone-900 cursor-pointer hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label={isMuted ? "Unmute sensory presentation" : "Mute sensory presentation"}
          >
            {isMuted ? (
              <VolumeX className="w-5.2 h-5.2 text-stone-900" />
            ) : (
              <Volume2 className="w-5.2 h-5.2 text-stone-900" />
            )}
          </button>
        </div>

        {/* "Know More" luxury option centered between the two images */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30">
          <motion.button
            onClick={() => setIsModalOpen(true)}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="bg-transparent border-none outline-none text-center flex items-center justify-center cursor-pointer transition-all duration-300"
          >
            <span 
              className="font-signature text-5xl md:text-6xl lg:text-7xl text-white select-none leading-none capitalize px-4 drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)] hover:text-stone-200 transition-colors duration-300"
              style={{ WebkitTextStroke: "0.5px white" }}
            >
              Know More
            </span>
          </motion.button>
        </div>

        {/* Unified Scroll Return button */}
        <motion.div 
          onClick={() => {
            document.getElementById("hero-section")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity duration-300 z-30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
        >
          <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.1)] flex items-center justify-center">
            <ArrowUp className="w-4 h-4 text-stone-700" />
          </div>
          <span className="font-sub text-[8px] tracking-[0.4em] text-stone-600 select-none uppercase font-bold">Return to Top</span>
        </motion.div>
        </div>
      </section>
        </>
      ) : (
        <>
          {/* Pristine Luxury Section 3 (Brutalist matte slate gallery of 6 individual perfumes on their own rustic rock plates) */}
          <section 
            id="white-empty-page" 
            className="relative w-full min-h-[200vh] h-auto bg-[#090807] px-6 md:px-16 py-28 select-none overflow-hidden"
          >
            {/* Subtle Matte Mineral Background Texture Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
              <img 
                src={stoneTextureBackground}
                alt="Mineral background plate"
                className="w-full h-full object-cover object-center filter grayscale contrast-125 select-none"
                referrerPolicy="no-referrer"
              />
              {/* Heavy Vignette & Dark Overlay to keep space extremely moody, abstract & matte */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#090807] via-transparent to-[#090807]" />
              <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Elegant Floating Back to Main button */}
            <div className="absolute top-10 left-6 md:left-16 z-30">
              <button
                onClick={triggerBackToMainTransition}
                className="px-5 py-2.5 rounded-full border border-slate-700/60 bg-[#090807]/80 backdrop-blur-md text-slate-300 font-mono text-[9px] tracking-[0.25em] uppercase hover:bg-slate-800/40 hover:text-white hover:border-slate-500 transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.5)] cursor-pointer flex items-center justify-center gap-2 font-medium"
              >
                <span>←</span>
                <span>Back to Main</span>
              </button>
            </div>

        {/* Section Header */}
        <div className="relative z-10 text-center mb-16 max-w-xl mx-auto">
          <span className="font-mono text-[9px] md:text-[10px] text-slate-400/60 tracking-[0.4em] uppercase block mb-3">
            La Collection Privée
          </span>
          <h2 
            className="font-luxury text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.2em] uppercase"
            style={{
              backgroundImage: "linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #64748b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.8))"
            }}
          >
            The Minerals
          </h2>
          <p className="font-signature text-xl md:text-2xl text-slate-400/80 mt-3 capitalize">
            sculpted by nature, captured in matte grey slate
          </p>
        </div>

        {/* 6 Staggered Perfumes Showcase */}
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-8 md:gap-16">
          {GALLERY_PERFUMES.map((perfume) => (
            <div 
              key={perfume.id} 
              className={`w-full flex ${
                perfume.align === 'start' ? 'justify-start' : perfume.align === 'end' ? 'justify-end' : 'justify-center'
              }`}
            >
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col items-center max-w-sm w-full"
              >
                {/* Matte Ambient Light-shaft behind (Stunning Silver/Grey ambient, non-shining) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-slate-500/5 blur-[95px] pointer-events-none group-hover:bg-slate-400/10 transition-all duration-700" />

                {/* Outer Scene container to house bottle and rock plate */}
                <div className="relative w-80 h-[360px] flex items-end justify-center">
                  
                  {/* THE ROCK PLATE/PLATFORM: Matte dark stone plate, rustic and thick */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[240px] h-[60px] z-10">
                    
                    {/* Main irregular stone body */}
                    <div className={`${perfume.rockStyle} bg-gradient-to-br ${perfume.rockBg} w-full h-full border border-stone-850 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.95)] relative overflow-hidden transition-all duration-700 group-hover:scale-[1.04]`}>
                      {/* Matte mineral grain simulation lines */}
                      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px] mix-blend-overlay" />
                      <div className="absolute inset-x-0 top-0 h-[2px] bg-white/10" />
                      
                      {/* Left face shadow depth */}
                      <div className="absolute inset-y-0 left-0 w-[45px] bg-black/60 filter blur-[3px]" />
                      {/* Top matte silver lighting highlight */}
                      <div className="absolute top-1 left-4 right-4 h-1 bg-slate-400/15 blur-[1.5px] rounded-full" />
                    </div>

                    {/* Under-rock ambient dark drop shadow projection */}
                    <div className="absolute bottom-[-18px] inset-x-6 h-8 bg-black/85 blur-[14px] -z-10 rounded-full" />
                  </div>

                  {/* THE LUXURY BOTTLE: Matte, heavy glass sitting on the rock plate */}
                  <motion.div 
                    className="relative z-20 flex flex-col items-center transition-transform duration-700 group-hover:translate-y-[-12px]"
                    style={{ transformOrigin: "bottom center" }}
                  >
                    {/* Heavy textured Cap */}
                    <div className="w-8.5 h-10.5 bg-neutral-800 rounded-sm shadow-[inset_0_-4px_8px_rgba(0,0,0,0.7),0_4px_8px_rgba(0,0,0,0.5)] border-t border-stone-700/50 flex flex-col justify-between p-1">
                      {/* Cap texture vertical grooved lines */}
                      <div className="flex justify-between w-full h-full opacity-35 px-1">
                        <span className="w-[1.2px] h-full bg-black/50" />
                        <span className="w-[1.2px] h-full bg-black/50" />
                        <span className="w-[1.2px] h-full bg-black/50" />
                        <span className="w-[1.2px] h-full bg-black/50" />
                      </div>
                    </div>
                    
                    {/* Glass Collar/Neck */}
                    <div className="w-5 h-[5px] bg-stone-700 border-b border-stone-900 shadow-md" />

                    {/* Perfume Bottle Body */}
                    <div className="w-24 h-40 rounded-t-[14px] rounded-b-[4px] bg-gradient-to-b from-stone-950/95 via-stone-900/90 to-stone-950 border border-stone-850 hover:border-stone-700/55 shadow-[0_22px_50px_rgba(0,0,0,0.9)] relative p-3 flex flex-col items-center justify-between overflow-hidden transition-colors duration-500">
                      {/* Inner glass tube */}
                      <div className="absolute top-0 bottom-3 w-[1.2px] bg-white/20 blur-[0.2px]" />
                      
                      {/* Glass refraction edge lines */}
                      <div className="absolute inset-y-0 left-[2px] w-[2px] bg-white/10 opacity-50" />
                      <div className="absolute inset-y-0 right-[2px] w-[2px] bg-white/10 opacity-50" />
                      <div className="absolute bottom-[2px] inset-x-2 h-[3px] bg-white/12 rounded-full blur-[0.2px]" />

                      {/* Liquid level layer inside */}
                      <div className={`absolute bottom-0 left-[3px] right-[3px] top-[45px] ${perfume.liquidColor} rounded-t-sm pointer-events-none border-t border-white/5`} />

                      {/* The minimal high-fashion matte silver/white Label */}
                      <div className="w-16 h-24 bg-stone-200/90 shadow-[0_4px_14px_rgba(0,0,0,0.65)] rounded-sm p-1.5 flex flex-col justify-between items-center text-stone-900 select-none border border-stone-300 z-10 transition-colors duration-500 group-hover:bg-white group-hover:shadow-[0_6px_18px_rgba(0,0,0,0.8)]">
                        <div className="text-center w-full">
                          <span className="font-sub text-[5.5px] tracking-[0.16em] text-stone-500 block uppercase leading-none mt-0.5">
                            {perfume.type}
                          </span>
                          <span className="font-luxury text-[8.5px] font-bold tracking-[0.05em] text-stone-900 block leading-tight mt-2.5 uppercase border-b border-stone-300 pb-1">
                            {perfume.label}
                          </span>
                        </div>
                        <span className="font-sans text-[6.5px] font-semibold text-stone-500 uppercase tracking-widest leading-none mb-0.5">
                          {perfume.sub}
                        </span>
                      </div>

                      {/* Bottle volume stat */}
                      <span className="font-mono text-[7px] text-stone-400 select-none tracking-widest z-10 uppercase mt-auto">
                        {perfume.volume}
                      </span>
                    </div>

                    {/* Under-bottle shadow directly on the stone plate */}
                    <div className="absolute bottom-[-1px] inset-x-5 h-2 bg-black/95 blur-[2.5px] rounded-full z-15" />
                  </motion.div>

                </div>

                {/* TEXT SPECIFICATIONS: Matte silver colors, minimal typography */}
                <div className="text-center mt-6">
                  <span className="font-mono text-[9px] text-slate-400/50 tracking-[0.3em] uppercase block mb-1">
                    0{perfume.id} / EXCLUSIVE MODEL
                  </span>
                  <h3 className="font-luxury text-xl text-slate-100 font-light tracking-[0.18em] uppercase mb-2">
                    {perfume.name}
                  </h3>
                  
                  {/* Horizontal separator line */}
                  <div className="w-14 h-[0.5px] bg-slate-800 mx-auto my-3" />

                  {/* Dynamic fragrance notes pills with beautiful matte look */}
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {perfume.notes.map((note, index) => (
                      <span 
                        key={index}
                        className="font-sub text-[8.5px] text-slate-300 bg-slate-400/5 border border-slate-500/10 px-2.5 py-0.5 rounded-full select-none tracking-[0.15em] uppercase"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Elegant Return to Main control at the bottom of Section 3 */}
        <div className="relative z-10 w-full flex justify-center mt-28">
          <motion.div 
            onClick={triggerBackToMainTransition}
            className="cursor-pointer flex flex-col items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 rounded-full border border-slate-700/60 bg-transparent flex items-center justify-center hover:bg-slate-800/40 active:scale-95 transition-all">
              <ArrowUp className="w-5 h-5 text-slate-300 -rotate-90 md:rotate-0" />
            </div>
            <span className="font-sub text-[9px] tracking-[0.35em] text-slate-300 select-none uppercase font-light">
              Back to Main
            </span>
          </motion.div>
        </div>
      </section>
    </>
  )}

      {/* Campaign Story Modal popup (AnimatePresence) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0c0a09]/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-[#faf9f6] text-[#1c1917] rounded-lg shadow-[0_32px_80px_rgba(0,0,0,0.55)] border border-stone-200 overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-auto md:max-h-[85vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 z-40 w-10 h-10 rounded-full bg-stone-900/10 hover:bg-stone-900/20 text-stone-800 flex items-center justify-center transition-all duration-200"
                aria-label="Close story lookbook"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Left Pane: Women Campaign */}
              <div className="w-full md:w-1/2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-stone-200 flex flex-col justify-between overflow-y-auto">
                <div>
                  <span className="font-sub text-[10px] tracking-[0.3em] text-amber-700 uppercase font-semibold block mb-4">
                    VOLUME I
                  </span>
                  <h4 className="font-luxury text-3xl md:text-4xl font-light text-stone-900 tracking-wide uppercase mb-4 animate-pulse">
                    WOMEN COLLECTION
                  </h4>
                  <p className="font-signature text-2xl text-stone-600 leading-relaxed mb-6">
                    A celestial waltz of royalty and wild rebellion.
                  </p>
                  <p className="font-sub text-xs text-stone-400 font-light leading-relaxed tracking-wide">
                    Features dynamic harmonies of sweet wild violets, crisp white tea blossoms, and deep, dark vanilla woods. Made for the modern queen who settles state affairs with unyielding elegance.
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-stone-200/50 flex items-center justify-between">
                  <div>
                    <span className="font-sub text-[9px] tracking-wider text-stone-400 block uppercase">Eau De Parfum</span>
                    <span className="font-sans font-semibold text-lg text-stone-900">100ml – $185</span>
                  </div>
                  <a
                    href="https://www.pinterest.com/pin/1126744400547836977/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sub text-[10px] tracking-[0.25em] font-bold text-stone-950 uppercase border-b border-stone-950 pb-1 hover:text-stone-500 hover:border-stone-400 transition-all duration-300"
                  >
                    DISCOVER PINS
                  </a>
                </div>
              </div>

              {/* Modal Right Pane: Men Campaign */}
              <div className="w-full md:w-1/2 p-8 md:p-12 bg-stone-100 flex flex-col justify-between overflow-y-auto">
                <div>
                  <span className="font-sub text-[10px] tracking-[0.3em] text-purple-800 uppercase font-semibold block mb-4">
                    VOLUME II
                  </span>
                  <h4 className="font-luxury text-3xl md:text-4xl font-light text-stone-900 tracking-wide uppercase mb-4 animate-pulse">
                    MEN COLLECTION
                  </h4>
                  <p className="font-signature text-2xl text-stone-600 leading-relaxed mb-6">
                    Raw magnetism, untamed yet perfectly refined.
                  </p>
                  <p className="font-sub text-xs text-stone-400 font-light leading-relaxed tracking-wide">
                    Envelops the senses in notes of spiced leather, cracked black pepper, smoked vetiver, and clean cedarwood. A masterful composition for the modern rebel who commands every room.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-200/50 flex items-center justify-between">
                  <div>
                    <span className="font-sub text-[9px] tracking-wider text-stone-400 block uppercase">Extrait De Parfum</span>
                    <span className="font-sans font-semibold text-lg text-stone-900">100ml – $195</span>
                  </div>
                  <a
                    href="https://pin.it/5prOwrkMx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sub text-[10px] tracking-[0.25em] font-bold text-stone-950 uppercase border-b border-stone-950 pb-1 hover:text-stone-500 hover:border-stone-400 transition-all duration-300"
                  >
                    EXPLORE COLLECTION
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brutalist Ambient Side Slicing Web Page Transition */}
      <AnimatePresence>
        {isSlicing && (
          <div className="fixed inset-0 z-[100] flex pointer-events-none overflow-hidden">
            {/* Slice 1 */}
            <motion.div
              initial={{ x: "100%" }}
              animate={slicingPhase === "entering" ? { x: "0%" } : { x: "-100%" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="w-1/3 h-full bg-[#1c1a19] border-r border-[#2d2a28]/40 shadow-[20px_0_50px_rgba(0,0,0,0.8)]"
            />
            {/* Slice 2 */}
            <motion.div
              initial={{ x: "100%" }}
              animate={slicingPhase === "entering" ? { x: "0%" } : { x: "-100%" }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="w-1/3 h-full bg-[#121110] border-r border-[#201e1d]/40 shadow-[20px_0_50px_rgba(0,0,0,0.8)]"
            />
            {/* Slice 3 */}
            <motion.div
              initial={{ x: "100%" }}
              animate={slicingPhase === "entering" ? { x: "0%" } : { x: "-100%" }}
              transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="w-1/3 h-full bg-[#090807] shadow-[20px_0_50px_rgba(0,0,0,0.8)]"
            />
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

