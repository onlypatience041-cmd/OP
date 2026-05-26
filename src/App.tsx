import { useState, useEffect, useRef, ReactNode } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Volume2, VolumeX, ArrowUp, X, Compass, Leaf, Gem, Shield } from "lucide-react";
// @ts-ignore
import stoneTextureBackground from "./assets/images/stone_texture_bg_1779635081857.png";
// @ts-ignore
import perfumesOnRockPlatform from "./assets/images/perfumes_on_rock_platform_1779635840155.png";
// @ts-ignore
import nymAboutPerfumeImg from "./assets/images/nym_about_perfume_1779721629774.png";
// @ts-ignore
import nBeyondScentImg from "./assets/images/n_beyond_scent_1779721650662.png";
// @ts-ignore
import tobaccoLeavesTexture from "./assets/images/tobacco_leaves_texture_1779773730298.png";
// @ts-ignore
import grisDiorImg from "./assets/images/gris_dior_product_shot_1779774179662.png";
// @ts-ignore
import missDiorImg from "./assets/images/miss_dior_product_shot_1779774198149.png";
// @ts-ignore
import sauvageImg from "./assets/images/sauvage_product_shot_1779774211789.png";
// @ts-ignore
import jadoreImg from "./assets/images/jadore_product_shot_1779774227430.png";

const UNIQUE_HERO_IMAGE = "https://res.cloudinary.com/dilgatlft/image/upload/v1779672639/ChatGPT_Image_May_25_2026_06_59_33_AM_zvnpfb.png";

const GALLERY_PERFUMES = [
  {
    id: 1,
    name: "PERFECTION PURITY",
    volume: "100ml",
    type: "Extraits de Cologne",
    liquidColor: "bg-[#252322]/30",
    capColor: "bg-stone-800",
    label: "PERFECTION PURITY",
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

// ==========================================
// LUXURIES TYPOGRAPHY ANIMATION COMPONENTS (Maison style)
// ==========================================

interface LuxuryRevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

function LuxuryRevealText({
  text,
  className = "",
  delay = 0,
  duration = 1.6,
}: LuxuryRevealTextProps) {
  const letters = Array.from(text);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (customDelay: number) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: customDelay,
      },
    }),
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 15, 
      filter: "blur(10px)",
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: duration,
        ease: [0.16, 1, 0.3, 1], // Dreamy high-fashion bezier curve
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      custom={delay}
      className={`inline-flex flex-wrap ${className}`}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className={`inline-block ${char === " " ? "w-2 sm:w-3" : ""}`}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface LuxuryTrackingTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  fromTracking?: string;
  toTracking?: string;
}

function LuxuryTrackingText({
  text,
  className = "",
  delay = 0,
  duration = 1.8,
  fromTracking = "0.15em",
  toTracking = "0.45em",
}: LuxuryTrackingTextProps) {
  return (
    <motion.span
      initial={{ opacity: 0, letterSpacing: fromTracking, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, letterSpacing: toTracking, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`inline-block whitespace-nowrap ${className}`}
    >
      {text}
    </motion.span>
  );
}

interface ElegantLineRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

function ElegantLineReveal({
  children,
  delay = 0,
  duration = 1.8,
  className = "",
}: ElegantLineRevealProps) {
  return (
    <div className={`overflow-hidden py-1 ${className}`}>
      <motion.div
        initial={{ y: "105%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function App() {
  const [index, setIndex] = useState(0);
  const [droplets, setDroplets] = useState<{ id: number; left: number; top: number; delay: number; scale: number; speed: number; xWiggles: number[] }[]>([]);
  const [isMuted, setIsMuted] = useState(true);
  const [videoHovered, setVideoHovered] = useState(false);
  const [menVideoHovered, setMenVideoHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'men' | 'women' | null>(null);
  const [isSlicing, setIsSlicing] = useState(false);
  const [slicingPhase, setSlicingPhase] = useState<"idle" | "entering" | "revealed">("idle");

  const videoRef = useRef<HTMLVideoElement>(null);
  const menVideoRef = useRef<HTMLVideoElement>(null);
  const campaignHeroVideoRef = useRef<HTMLVideoElement>(null);

  // Auto-play the campaign hero video under chromium block conditions
  useEffect(() => {
    if (activeCategory === "men" && campaignHeroVideoRef.current) {
      campaignHeroVideoRef.current.muted = true;
      campaignHeroVideoRef.current.play().catch((err) => {
        console.log("Campaign autoplay blocked or waiting for user gesture:", err.message);
      });
    }
  }, [activeCategory]);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  // Parallax & Scale Transitions for magnificent page changes
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.88]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -60]);

  // Smooth Interpolated Background Gradient to blend the dark first page into light second page
  const bgColor = useTransform(scrollYProgress, [0, 0.35, 1], ["#000000", "#faf9f6", "#faf9f6"]);

  const triggerSideSliceTransition = (category: 'men' | 'women') => {
    if (isSlicing) return;
    setIsSlicing(true);
    setSlicingPhase("entering");
    setActiveCategory(category);

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
              <span className="font-sub text-[11px] sm:text-xs md:text-sm text-white/95 uppercase font-light text-center">
                <LuxuryTrackingText text="LUXURY AND MINIMALIST" fromTracking="0.3em" toTracking="0.55em" duration={2.2} />
              </span>
              <span className="font-sub text-[10px] sm:text-[11px] md:text-xs text-white/70 uppercase font-light text-center">
                <LuxuryTrackingText text="SANS SERIF FONT" fromTracking="0.2em" toTracking="0.35em" delay={0.2} duration={2.2} />
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
            document.getElementById("empty-transitional-page")?.scrollIntoView({ behavior: "smooth" });
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

      {/* Elegant Minimalist White Transitional Section (Slightly more than half-view size, pure white) */}
      <section 
        id="empty-transitional-page" 
        className="relative w-full h-[60vh] bg-white snap-start snap-always shrink-0 flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center text-center max-w-xl select-none"
        >
          {/* Centered Brand Name NYM in Black */}
          <span className="font-serif text-2xl sm:text-4xl tracking-[0.55em] font-bold uppercase text-stone-950 mr-[-0.55em] leading-none">
            NYM
          </span>

          {/* Golden styled PERFUMES subtitle underneath */}
          <div className="flex items-center gap-3 mt-4">
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: "2rem" }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1.5px] block origin-right" 
              style={{
                backgroundImage: "linear-gradient(90deg, #bf953f 0%, #fcf6ba 50%, #aa771c 100%)"
              }}
            />
            <span className="font-sub text-[8px] sm:text-[9px] tracking-[0.5em] font-medium uppercase text-stone-600 mr-[-0.5em] leading-none">
              PERFUMES
            </span>
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: "2rem" }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1.5px] block origin-left" 
              style={{
                backgroundImage: "linear-gradient(90deg, #aa771c 0%, #fcf6ba 50%, #bf953f 100%)"
              }}
            />
          </div>

          {/* Thin minimalist line like image design */}
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "48px" }}
            viewport={{ once: false }}
            transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-stone-200 my-6" 
          />

          {/* Subtitle: the essence that feels unreal */}
          <LuxuryTrackingText 
            text="THE ESSENCE THAT FEELS UNREAL" 
            className="font-sub text-[8.5px] sm:text-[9.5px] md:text-[10.5px] text-stone-500 uppercase font-light mr-[-0.45em]"
            fromTracking="0.2em"
            toTracking="0.45em"
            duration={2.0}
            delay={0.25}
          />
        </motion.div>
      </section>

      {/* Pristine Luxury White Section (Page 2) */}
      <section 
        id="white-sensory-page" 
        className="relative w-full h-[125vh] text-[#1c1917] snap-start snap-always shrink-0 overflow-hidden select-none"
      >
        <div className="w-full h-full flex flex-col md:flex-row bg-[#faf9f6] relative">
        {/* Decorative ultra-thin luxury borders wrapped around the section */}
        <div className="absolute top-6 left-6 right-6 bottom-6 border-[0.5px] border-stone-200/45 pointer-events-none z-30" />

        {/* Left Screen: Interactive Cinematic Video (WOMEN CHOICE) */}
        <motion.div
          onClick={() => triggerSideSliceTransition("women")}
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
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
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />

          {/* Vignette Shadow Overlay for enhanced high-fidelity contrast */}
          <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

          {/* Elegant "Women Choice" Signature Overlay right in the middle (No Rectangular Box) */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h3 className="font-signature text-6xl md:text-7xl lg:text-8xl text-white select-none leading-none tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)] capitalize">
                Women Choice
              </h3>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Screen: Interactive Cinematic Video (MEN CHOICE) */}
        <motion.div
          onClick={() => triggerSideSliceTransition("men")}
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
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
            referrerPolicy="no-referrer"
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
        </motion.div>

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

      {/* 2-Page Sized Pure White Section (Below Page 3, styled with custom luxury typography and a full-page image) */}
      <section 
        id="additional-empty-white-page" 
        className="relative w-full h-[200vh] bg-white snap-start snap-always shrink-0 flex flex-col justify-between"
      >
        {/* First Half (100vh): Pure typography space centered inside an elegant stone-beige rectangular box */}
        <div className="w-full h-[100vh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 bg-white">
          <motion.div 
            initial={{ opacity: 0, y: 40, filter: "blur(18px)", scale: 1.05 }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl min-h-[48vh] sm:min-h-[52vh] bg-[#e6e2de] flex flex-col items-center justify-center px-6 sm:px-12 py-8 sm:py-10 shadow-[0_20px_50px_rgba(0,0,0,0.015)] rounded-[2px] select-none"
          >
            {/* Elegant luxury house indicator */}
            <span className="font-sub text-[9px] sm:text-[10px] text-stone-500/80 uppercase font-light mb-4 block">
              <LuxuryTrackingText text="THE MAISON EXPERIENCE" fromTracking="0.25em" toTracking="0.45em" />
            </span>

            {/* First line: Luxury, Light & Aironeous serif (Cinzel) */}
            <h2 className="font-luxury font-light text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] text-stone-900 tracking-[0.12em] leading-tight uppercase">
              <LuxuryRevealText text="SEE WHAT OTHER'S" duration={1.6} />
            </h2>

            {/* Second line: Luxury, Soft Muted Gold/Taupe serif with Dot (Cinzel) */}
            <h3 
              className="font-luxury font-light text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] tracking-[0.12em] leading-tight uppercase mt-1 bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #78716c 0%, #44403c 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <LuxuryRevealText text="SERVICES." delay={0.4} duration={1.6} />
            </h3>

            {/* Silver Stunning Majestic Eagle Crest Design Emblem */}
            <motion.div 
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="my-4 sm:my-5 flex items-center justify-center select-none"
            >
              <svg className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_4px_15px_rgba(168,162,158,0.25)] filter transition-all duration-300 hover:brightness-110 cursor-pointer" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="silver-glossy" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="25%" stopColor="#f3f4f6" />
                    <stop offset="50%" stopColor="#9ca3af" />
                    <stop offset="75%" stopColor="#e5e7eb" />
                    <stop offset="90%" stopColor="#d1d5db" />
                    <stop offset="100%" stopColor="#4b5563" />
                  </linearGradient>
                  <linearGradient id="silver-accent" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#d1d5db" />
                    <stop offset="100%" stopColor="#6b7280" />
                  </linearGradient>
                </defs>
                
                {/* Outer exquisite precision thin ring */}
                <circle cx="32" cy="32" r="28" stroke="url(#silver-glossy)" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.5" />
                
                {/* Symmetrical crescent brand framing lines */}
                <path d="M 12,32 A 20,20 0 0,0 52,32" stroke="url(#silver-accent)" strokeWidth="0.5" opacity="0.35" />
                
                {/* Symmetrical Majestic Eagle Wings & Body */}
                <path 
                  d="M32 14 L35 20 L44 16 L39 25 L49 22 L42 29 L54 28 L44 35 L52 37 L42 41 L47 45 L37 45 L32 54 L27 45 L17 45 L22 41 L14 37 L22 35 L12 28 L24 29 L17 22 L27 25 L20 16 L29 20 Z" 
                  fill="url(#silver-glossy)"
                  stroke="url(#silver-accent)"
                  strokeWidth="0.75"
                  strokeLinejoin="round"
                />
                
                {/* Faceted 3D engraving lines to give a stunning physical feel */}
                <path d="M32 14 L32 54" stroke="#ffffff" strokeWidth="0.5" opacity="0.6" />
                <path d="M35 20 L29 20" stroke="#ffffff" strokeWidth="0.5" opacity="0.45" />
                <path d="M39 25 L25 25" stroke="#ffffff" strokeWidth="0.5" opacity="0.45" />
                <path d="M42 29 L22 29" stroke="#ffffff" strokeWidth="0.5" opacity="0.45" />
                <path d="M44 35 L20 35" stroke="#ffffff" strokeWidth="0.5" opacity="0.45" />
                <path d="M42 41 L22 41" stroke="#ffffff" strokeWidth="0.5" opacity="0.45" />
                
                {/* Iconic brand star at the top crest */}
                <polygon points="32,6 33.5,8 36,8.5 34,10 34.5,12 32,11 29.5,12 30,10 28,8.5 30.5,8" fill="url(#silver-glossy)" />
              </svg>
            </motion.div>

            {/* Lower refined paragraph sub-text with exquisite line heights and wide letter spacing */}
            <p className="mt-2 sm:mt-3 font-sub text-stone-700 font-light text-[9px] sm:text-xs leading-relaxed tracking-[0.18em] max-w-2xl px-4 uppercase text-center">
              We believe that simplicity is the height of sophistication.
              <br />
              <span className="text-stone-500/80 mt-1.5 block">
                Every bespoke consultation is an intention, every pure space is a breath.
              </span>
            </p>
          </motion.div>
        </div>

        {/* Second Half (100vh): High-fashion full page image covering the entire 100vh page */}
        <div className="w-full h-[100vh] relative overflow-hidden shrink-0">
          <motion.img 
            src="https://res.cloudinary.com/dilgatlft/image/upload/v1779684374/ChatGPT_Image_May_25_2026_10_15_24_AM_jqxt8x.png"
            alt="Luxury Services Campaign Image"
            className="w-full h-full object-cover object-center block"
            initial={{ opacity: 0, scale: 1.12, filter: "brightness(0.6)" }}
            whileInView={{ opacity: 1, scale: 1.02, filter: "brightness(0.95)" }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            referrerPolicy="no-referrer"
          />
          
          {/* Dior-inspired luxury text overlay: elegant spacing, pristine typography, absolute layout */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 sm:pb-32 bg-black/10 z-20">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center px-6 select-none"
            >
              {/* Category Subtitle like 'Men's Fall 2026' */}
              <span className="font-sub text-[10px] sm:text-[11px] md:text-[12px] text-white/95 tracking-[0.45em] uppercase font-light mb-3 block">
                Bespoke Atelier
              </span>

              {/* Main Title 'Create Your Own Fragrance' in editorial Serif (Cinzel) resembling the Dior typography */}
              <h4 className="font-luxury font-light text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-white tracking-[0.08em] leading-normal uppercase mb-7 max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                Create Your Own Fragrance
              </h4>

              {/* Elegant underlined action option mimicking 'Discover more' */}
              <motion.button 
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                className="bg-transparent border-none outline-none cursor-pointer flex flex-col items-center gap-1 group pb-1.5 border-b border-white/60 hover:border-white transition-all duration-300"
              >
                <span className="font-sub text-[10px] sm:text-[11px] tracking-[0.3em] text-white font-medium uppercase transition-colors duration-300 group-hover:text-stone-200">
                  Discover more
                </span>
              </motion.button>
            </motion.div>
          </div>

          {/* Subtle luxurious ambient overlay */}
          <div className="absolute inset-0 bg-black/[0.02] pointer-events-none z-10" />
        </div>
      </section>
      {/* Editorial Luxury About Page 1: The Origin & Spirit (Page 5) */}
      <section 
        id="about-nym-part-1" 
        className="relative w-full h-screen bg-white snap-start snap-always shrink-0 flex flex-col items-center justify-center border-t border-stone-150 z-30 overflow-hidden"
      >
        {/* Subtle, pale structural background markings to resemble blueprint draft sheets */}
        <div className="absolute top-8 left-8 text-[9px] font-mono text-stone-300 tracking-[0.2em] select-none pointer-events-none uppercase">Atelier Nym // Archive 01</div>
        <div className="absolute bottom-8 right-8 text-[9px] font-mono text-stone-300 tracking-[0.2em] select-none pointer-events-none uppercase">Volume I // Philosophy</div>
        
        {/* Thin minimalist frame border tracing the screen edges beautifully */}
        <div className="absolute top-6 left-6 right-6 bottom-6 border-[0.5px] border-stone-200/40 pointer-events-none z-10" />

        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-center h-full select-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: True High-fashion Editorial Copy (col-span 7) */}
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col items-start text-left lg:pr-8"
            >
              <div className="mb-4">
                <span className="font-sub text-[10px] sm:text-xs text-stone-400 uppercase font-light tracking-[0.45em]">
                  <LuxuryTrackingText text="THE PHILOSOPHY OF SILENCE" fromTracking="0.25em" toTracking="0.45em" />
                </span>
              </div>

              <h2 className="font-luxury font-light text-4xl sm:text-5xl md:text-6xl text-stone-900 leading-[1.1] mb-6">
                <ElegantLineReveal delay={0.1}>
                  <LuxuryRevealText text="CRAFTED IN" duration={1.6} />
                </ElegantLineReveal>
                <ElegantLineReveal delay={0.25}>
                  <LuxuryRevealText text="ABSOLUTE STILLNESS" duration={1.6} className="text-[#a78b54] font-medium" />
                </ElegantLineReveal>
              </h2>

              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "80px" }}
                viewport={{ once: false }}
                transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-[1px] bg-[#bf953f] my-6" 
              />

              <h3 className="font-sub text-stone-850 font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase leading-relaxed mb-6">
                we believe true luxury whispers rather than screams.
              </h3>

              <p className="font-sub text-stone-500 font-light text-sm sm:text-base tracking-[0.06em] leading-relaxed max-w-xl">
                MAISON NYM was conceived in the quiet spaces between shadow and light. Our perfumers treat scent as an invisible canvas—weaving together volatile notes of rare minerals, dark amber, and stardust. We do not design for a crowd, we curate for the singular spirit.
              </p>

              {/* Coordinates line indicator with high aesthetic touch */}
              <div className="flex items-center gap-3 mt-8 text-[9px] text-stone-400 font-mono tracking-widest uppercase">
                <span>LAT. 48.8566° N</span>
                <span className="w-1.5 h-1.5 rounded-full bg-stone-200" />
                <span>LON. 2.3522° E</span>
                <span className="w-1.5 h-1.5 rounded-full bg-stone-200" />
                <span>STUDIO IV</span>
              </div>
            </motion.div>

            {/* Right Column: Editorial Portrait Mockup (col-span 5) */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[4/5] w-full max-w-[360px] bg-[#fcfbfa] border border-stone-200/80 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.03)] rounded-[1px] overflow-hidden group"
              >
                {/* Image Inside Container with subtle pan on Hover */}
                <div className="w-full h-full overflow-hidden relative">
                  <motion.img 
                    src={nymAboutPerfumeImg} 
                    alt="Maison NYM Signature Perfume Presentation" 
                    className="w-full h-full object-cover rounded-[1px] filter brightness-[0.98] contrast-[1.01] transition-all duration-1000 group-hover:scale-[1.03] group-hover:brightness-[0.95]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Fine geometric layout guides on cover to reinforce architectural design */}
                  <div className="absolute inset-x-0 bottom-4 flex justify-between px-4 z-20">
                    <span className="text-[8px] font-mono text-white/60 tracking-widest uppercase">NYM ESSENCE N° 09</span>
                    <span className="text-[8px] font-mono text-white/60 tracking-widest uppercase">PLATEAU III</span>
                  </div>
                </div>
                {/* Delicate glass reflection effect panel */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none z-10" />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Editorial Luxury About Page 2: The Three Pillars & The Signature (Page 6) */}
      <section 
        id="about-nym-part-2" 
        className="relative w-full h-screen bg-[#faf8f5] snap-start snap-always shrink-0 flex flex-col items-center justify-center border-t border-stone-150 z-30 overflow-hidden"
      >
        {/* Subtle decorative elements for that high-fashion editorial book look */}
        <div className="absolute top-8 left-8 text-[9px] font-mono text-stone-400/70 tracking-[0.2em] select-none pointer-events-none uppercase">Atelier Nym // Archive 02</div>
        <div className="absolute bottom-8 right-8 text-[9px] font-mono text-stone-400/70 tracking-[0.2em] select-none pointer-events-none uppercase">Volume II // Pillars</div>
        <div className="absolute top-6 left-6 right-6 bottom-6 border-[0.5px] border-stone-300/25 pointer-events-none z-10" />

        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-center h-full select-none">
          {/* Section Header: Centered & Minimalist */}
          <div className="text-center mb-10 md:mb-14 flex flex-col items-center">
            <span className="font-sub text-[10px] sm:text-xs text-stone-400 uppercase tracking-[0.45em] mb-3 select-none">
              <LuxuryTrackingText text="OUR FOUNDATIONAL PILLARS" fromTracking="0.25em" toTracking="0.45em" />
            </span>
            <h3 className="font-luxury font-light text-2xl sm:text-3xl md:text-4xl text-stone-900 tracking-[0.16em] uppercase">
              <LuxuryRevealText text="THE SACRED METIER" duration={1.5} />
            </h3>
            <div className="w-8 h-[1px] bg-stone-300 my-4" />
          </div>

          {/* Majestic Three-Pillar Grid with Beautiful interactive motion cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 pb-12">
            
            {/* Pillar 1: THE MIND */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center p-6 bg-white border border-stone-200/40 rounded-[2px] shadow-[0_12px_32px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.02)] transition-all duration-500 hover:border-stone-200 cursor-default group"
            >
              <div className="mb-6 flex items-center justify-center w-12 h-12 rounded-full bg-stone-50 border border-stone-200/50 group-hover:bg-[#fcfaf7] group-hover:border-[#aa771c]/30 transition-all duration-500">
                <Compass className="w-5 h-5 stroke-[1.2] text-[#aa771c] transition-transform duration-700 group-hover:rotate-45" />
              </div>
              <h4 className="font-luxury font-medium text-sm sm:text-base text-stone-900 tracking-[0.25em] uppercase mb-4">
                THE MIND
              </h4>
              <p className="font-sub text-stone-500 font-light text-[11px] sm:text-xs tracking-[0.08em] leading-relaxed">
                To create what cannot be spoken. Our scents are psychological architecture, designed to align with the unexpressed dreams of the wearer.
              </p>
            </motion.div>

            {/* Pillar 2: THE CRAFT */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 1.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center p-6 bg-white border border-stone-200/40 rounded-[2px] shadow-[0_12px_32px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.02)] transition-all duration-500 hover:border-stone-200 cursor-default group"
            >
              <div className="mb-6 flex items-center justify-center w-12 h-12 rounded-full bg-stone-50 border border-stone-200/50 group-hover:bg-[#fcfaf7] group-hover:border-[#aa771c]/30 transition-all duration-500">
                <Leaf className="w-5 h-5 stroke-[1.2] text-[#aa771c] transition-transform duration-700 group-hover:scale-110" />
              </div>
              <h4 className="font-luxury font-medium text-sm sm:text-base text-stone-900 tracking-[0.25em] uppercase mb-4">
                THE CLAY
              </h4>
              <p className="font-sub text-stone-500 font-light text-[11px] sm:text-xs tracking-[0.08em] leading-relaxed">
                We wild-harvest raw elements from extreme altitudes and volcanic terrains. Every single molecule is matured in custom concrete containers.
              </p>
            </motion.div>

            {/* Pillar 3: THE PROMISE */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center p-6 bg-white border border-stone-200/40 rounded-[2px] shadow-[0_12px_32px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.02)] transition-all duration-500 hover:border-stone-200 cursor-default group"
            >
              <div className="mb-6 flex items-center justify-center w-12 h-12 rounded-full bg-stone-50 border border-stone-200/50 group-hover:bg-[#fcfaf7] group-hover:border-[#aa771c]/30 transition-all duration-500">
                <Gem className="w-5 h-5 stroke-[1.2] text-[#aa771c] transition-transform duration-700 group-hover:scale-110" />
              </div>
              <h4 className="font-luxury font-medium text-sm sm:text-base text-stone-900 tracking-[0.25em] uppercase mb-4">
                THE SOUL
              </h4>
              <p className="font-sub text-stone-500 font-light text-[11px] sm:text-xs tracking-[0.08em] leading-relaxed">
                Our creation stays with you forever. It acts as an anchor in time—leaving behind a luxurious trace that speaks a language of pure gold.
              </p>
            </motion.div>

          </div>

          {/* Part 3: BEYOND SCENT Split Banner integrated into part 2 elegantly */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-0 w-full bg-white border border-stone-200/50 rounded-[1px] overflow-hidden shadow-[0_12px_44px_rgba(0,0,0,0.01)] mt-2"
          >
            {/* Left Image Half (col-span 4) */}
            <div className="lg:col-span-4 h-[120px] lg:h-[180px] w-full relative overflow-hidden">
              <motion.img 
                src={nBeyondScentImg} 
                alt="Golden Cap Close-up Detail" 
                className="w-full h-full object-cover block filter brightness-[0.88] contrast-[1.05]"
                referrerPolicy="no-referrer"
                initial={{ scale: 1.05 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="absolute inset-0 bg-stone-950/20 pointer-events-none" />
            </div>

            {/* Right Content Half (col-span 8) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 bg-[#fdfcfb] flex flex-col sm:flex-row sm:items-center justify-between p-6 sm:p-10 text-left select-none gap-6"
            >
              <div className="flex flex-col max-w-md">
                <span className="font-sub text-[8px] sm:text-[9.5px] text-[#aa771c] tracking-[0.35em] uppercase font-bold mb-2">
                  THE MATTE SIGNATURE
                </span>
                <p className="font-sub text-stone-600 font-light text-[11px] sm:text-xs tracking-[0.06em] leading-relaxed">
                  NYM is an ultimate sensory experience — a quiet statement of who you are. Scent remains long after speech has been forgotten.
                </p>
              </div>
              <div className="flex flex-col items-start sm:items-end justify-center">
                <span className="font-signature text-2xl sm:text-3xl text-stone-400 italic block">
                  Live in Essence.
                </span>
                <span className="font-mono text-[7.5px] text-stone-300 tracking-[0.2em] uppercase mt-1">Maison Nym Atelier</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Elegant Minimalist White Section: Contact (Page 6) */}
      <section 
        id="contact-nym-page" 
        className="relative w-full h-screen bg-white snap-start snap-always shrink-0 flex flex-col items-center justify-center px-6 border-t border-stone-150"
      >
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-4xl select-none"
        >
          {/* Elegant luxury Maison category subtitle */}
          <span className="font-sub text-[10px] sm:text-xs text-stone-400 uppercase font-light mb-5 block">
            <LuxuryTrackingText text="THE ATELIER ENQUIRIES" fromTracking="0.25em" toTracking="0.45em" />
          </span>

          {/* Main Title 'CONTACT' in editorial luxury Serif */}
          <h2 className="font-luxury font-light text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] text-stone-900 tracking-[0.15em] leading-tight uppercase">
            <LuxuryRevealText text="CONTACT" delay={0.15} />
          </h2>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "48px" }}
            viewport={{ once: false }}
            transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-stone-200 my-8" 
          />

          {/* Minimal sensory touchpoints info */}
          <div className="flex flex-col items-center gap-2">
            <span className="font-sub text-stone-500 font-light text-[10px] sm:text-xs tracking-[0.25em] uppercase">
              atelier@maison-nym.com
            </span>
            <span className="font-sub text-stone-400 font-light text-[9px] tracking-[0.2em] uppercase mt-1">
              Paris — Milan — New York
            </span>
          </div>
        </motion.div>

        {/* Unified Scroll Return button inside Contact page */}
        <motion.div 
          onClick={() => {
            document.getElementById("hero-section")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity duration-300 z-30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
        >
          <div className="w-9 h-9 rounded-full bg-stone-50/85 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-stone-200/50 flex items-center justify-center">
            <ArrowUp className="w-4 h-4 text-stone-600" />
          </div>
          <span className="font-sub text-[8px] tracking-[0.4em] text-stone-500 select-none uppercase font-bold text-center">Return to Top</span>
        </motion.div>
      </section>
        </>
      ) : (
        <>
          {/* Magnificent Full-Bleed Campaign Hero Screen (Page-sized, 125vh, matches main first page scale and device scaling) */}
          {activeCategory === "men" && (
            <>
              <section className="relative w-full h-[125vh] bg-[#090807] overflow-hidden select-none z-20 border-b border-stone-850 flex flex-col justify-center items-center">
                {/* Subtle architectural markings resembling blueprint sketches */}
                <div className="absolute top-8 left-8 text-[9px] font-mono text-stone-500/80 tracking-[0.25em] uppercase pointer-events-none select-none">Maison Nym // Men Campaign</div>
                <div className="absolute top-8 right-8 text-[9px] font-mono text-stone-500/80 tracking-[0.25em] uppercase pointer-events-none select-none">Plateau III // SC-2026</div>

                {/* Floating Back to Main action inside campaign hero so user doesn't have to scroll */}
                <div className="absolute top-10 left-6 md:left-16 z-30">
                  <button
                    onClick={triggerBackToMainTransition}
                    className="px-5 py-2.5 rounded-full border border-slate-700/60 bg-[#090807]/80 backdrop-blur-md text-slate-300 font-mono text-[9px] tracking-[0.25em] uppercase hover:bg-slate-800/40 hover:text-white hover:border-slate-500 transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.5)] cursor-pointer flex items-center justify-center gap-2 font-medium"
                  >
                    <span>←</span>
                    <span>Back to Main</span>
                  </button>
                </div>

                {/* High-res media cover (Automated Video on laptops, Original Photograph on mobiles/tablets) */}
                <div className="absolute inset-0 bg-[#090807]">
                  {/* Laptop/Desktop Vertical Video Loop */}
                  <video
                    ref={campaignHeroVideoRef}
                    src="https://v1.pinimg.com/videos/iht/expMp4/92/27/45/92274529404149bf51dd307ef4eaf4cd_720w.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    referrerPolicy="no-referrer"
                    className="hidden md:block w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.01]"
                  />

                  {/* Mobile/Tablet Original Photograph Cover */}
                  <motion.img 
                    src="https://res.cloudinary.com/dilgatlft/image/upload/v1779755687/ChatGPT_Image_May_26_2026_06_03_54_AM_f9lumv.png"
                    alt="Sensory Coud Iconic Men Campaign"
                    className="block md:hidden w-full h-full object-cover object-center"
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    referrerPolicy="no-referrer"
                  />

                  {/* Minimal protective overlays at top/bottom for readability, keeping maximum central original brightness */}
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#090807]/90 via-[#090807]/30 to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/40 to-transparent z-10 pointer-events-none" />
                </div>

                {/* Dynamic Center Typography */}
                <div className="relative z-20 text-center px-6 max-w-4xl flex flex-col items-center">
                  <span className="font-mono text-[10px] sm:text-xs text-[#aa771c] tracking-[0.45em] uppercase mb-4 block">
                    <LuxuryTrackingText text="LA COLLECTION ESSENTIELLE" fromTracking="0.25em" toTracking="0.45em" />
                  </span>
                  <h1 className="font-luxury font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-[0.22em] uppercase leading-none mb-6 flex flex-col items-center gap-1 sm:gap-2 translate-y-6 md:translate-y-8">
                    <span className="block">
                      <LuxuryRevealText text="PERFECTION" duration={1.8} />
                    </span>
                    <span className="block mt-2 sm:mt-3">
                      <LuxuryRevealText text="PURITY" duration={1.8} />
                    </span>
                  </h1>
                  <div className="w-20 h-[0.5px] bg-[#bf953f] my-6 translate-y-6 md:translate-y-8" />
                  <p className="font-signature text-2xl md:text-3xl text-slate-300/90 mt-2 select-none capitalize translate-y-6 md:translate-y-8">
                    sculpted in shadow, captured in gold
                  </p>
                  
                  {/* Scroll hint Indicator */}
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="mt-16 flex flex-col items-center gap-2"
                  >
                    <span className="font-mono text-[8px] tracking-[0.3em] text-stone-400 uppercase">Scroll to Discover</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bf953f]" />
                  </motion.div>
                </div>
              </section>

              {/* Pristine Modernist White Page section (just slightly larger than half page: 65vh) */}
              <section className="relative w-full h-[65vh] min-h-[460px] bg-[#faf9f6] text-stone-900 overflow-hidden flex flex-col justify-center items-center z-20 border-b border-stone-200 px-6 sm:px-12 md:px-24">
                {/* Clean structural indicators resembling perfume house logs */}
                <div className="absolute top-8 left-8 text-[8px] font-mono text-stone-400/85 tracking-[0.22em] uppercase select-none pointer-events-none">
                  Atelier Formulation // Serie 018
                </div>
                <div className="absolute top-8 right-8 text-[8px] font-mono text-stone-400/85 tracking-[0.22em] uppercase select-none pointer-events-none">
                  Maison Nym — Paris
                </div>

                <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
                  <motion.span 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="font-mono text-[9px] md:text-[10.5px] text-[#aa771c] tracking-[0.45em] uppercase block mb-4"
                  >
                    THE OLFACTORY ANALYSIS
                  </motion.span>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-luxury text-2xl sm:text-3xl md:text-4xl text-stone-950 tracking-[0.18em] uppercase font-light leading-snug"
                  >
                    Minimalist Perfection & Raw Clarity
                  </motion.h2>

                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "40px" }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="h-[0.5px] bg-stone-300 my-6 sm:my-8" 
                  />

                  <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="font-sub text-stone-600 font-light text-[11px] sm:text-xs md:text-sm tracking-[0.06em] leading-relaxed max-w-2xl"
                  >
                    Perfection Purity represents the absolute threshold of perfume design at Maison Nym. 
                    Built on cold-pressed Himalayan bergamot, hand-sorted white iris concrete, and dry white woods, 
                    this fragrance evokes the crisp silence of alpine dawn. It does not speak to be noticed; 
                    it resides as a quiet, eternal witness to pristine elegance.
                  </motion.p>
                  
                  {/* Fine note elements display */}
                  <div className="grid grid-cols-3 gap-4 sm:gap-12 mt-8 sm:mt-12 w-full max-w-lg">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 1.2, delay: 0.3 }}
                      className="text-center"
                    >
                      <span className="font-mono text-[8px] tracking-[0.2em] text-stone-400 block mb-1">TOP NOTE</span>
                      <span className="font-luxury text-[10px] tracking-[0.15em] text-stone-800 uppercase font-medium">alba bergamot</span>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 1.2, delay: 0.4 }}
                      className="text-center"
                    >
                      <span className="font-mono text-[8px] tracking-[0.2em] text-stone-400 block mb-1">HEART NOTE</span>
                      <span className="font-luxury text-[10px] tracking-[0.15em] text-stone-800 uppercase font-medium">white iris concrete</span>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 1.2, delay: 0.5 }}
                      className="text-center"
                    >
                      <span className="font-mono text-[8px] tracking-[0.2em] text-stone-400 block mb-1">BASE NOTE</span>
                      <span className="font-luxury text-[10px] tracking-[0.15em] text-stone-800 uppercase font-medium">white cedarwood</span>
                    </motion.div>
                  </div>
                </div>

                {/* Subtle visual bottom anchor accent */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full border border-stone-300" />
              </section>

              {/* High-fidelity full-bleed atmosphere image section capturing Perfection Purity art */}
              <section className="relative w-full h-[115vh] bg-[#090807] overflow-hidden select-none z-20 border-b border-stone-850 flex flex-col justify-center items-center">
                <div className="absolute inset-0 bg-[#090807]">
                  <motion.img 
                    src="https://res.cloudinary.com/dilgatlft/image/upload/v1779772894/ChatGPT_Image_May_26_2026_10_48_56_AM_gut8yq.png"
                    alt="Perfection Purity Campaign Atmosphere"
                    className="w-full h-full object-cover object-center filter brightness-[0.94] contrast-[1.01]"
                    initial={{ scale: 1.04, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle cinematic overlays for seamless transition and typography readability */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#090807] via-[#090807]/20 to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/45 to-transparent z-10 pointer-events-none" />
                </div>

                {/* Elegant subtle metadata positioned at bottom margins */}
                <div className="absolute bottom-12 left-6 sm:left-12 md:left-24 z-20 pointer-events-none text-left">
                  <span className="font-mono text-[9px] text-[#bf953f] tracking-[0.35em] uppercase block mb-1">
                    CAMPAIGN CAPTURE // ATELIER
                  </span>
                  <h3 className="font-luxury text-stone-100 text-xs sm:text-sm tracking-[0.18em] uppercase font-light">
                    Maison Nym — Perfection Purity
                  </h3>
                </div>
              </section>

              {/* Le Tabac - 3 Tobacco-themed Perfumes collection (Luxurious White Page Layout) */}
              <section className="relative w-full py-24 bg-[#faf9f6] text-stone-900 z-20 border-b border-stone-200/80 overflow-hidden flex flex-col justify-center items-center px-6 sm:px-12 md:px-24">
                {/* Visual subtle grids/decorations for light page */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-stone-200 to-transparent pointer-events-none" />
                
                {/* Immersive Tobacco Leaf Artwork Banner (Exactly matching the user's uploaded inspiration) */}
                <div className="relative w-full max-w-5xl h-[45vh] min-h-[300px] rounded-2xl overflow-hidden mb-16 shadow-[0_24px_55px_rgba(27,25,23,0.12)] group/banner">
                  <img 
                    src={tobaccoLeavesTexture}
                    alt="Premium Tobacco Leaves Texture"
                    className="w-full h-full object-cover object-center transition-transform duration-[2.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/banner:scale-105"
                  />
                  {/* Subtle dark overlays representing the high-contrast professional photograph */}
                  <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/30 to-black/50 pointer-events-none" />
                  
                  {/* Centered Serif Display Text - Tobacco */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 select-none">
                    <span className="font-mono text-[9px] sm:text-[10px] text-[#bf953f] tracking-[0.45em] uppercase mb-4 block">
                      LE TABAC SÉLECTION UNIQUE
                    </span>
                    <h2 className="font-luxury text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.08em] font-light uppercase filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.55)] leading-none">
                      Tobacco
                    </h2>
                    <div className="w-16 h-[0.5px] bg-[#bf953f]/80 mt-6" />
                  </div>
                </div>

                {/* Section Header Description */}
                <div className="max-w-2xl mx-auto text-center flex flex-col items-center mb-16">
                  <h3 className="font-mono text-[9.5px] md:text-[10.5px] text-[#aa771c] tracking-[0.4em] uppercase block mb-3">
                    THREE EXQUISITE FRAGRANCES
                  </h3>
                  <p className="font-sans text-stone-500 font-light text-xs md:text-sm tracking-[0.05em] leading-relaxed max-w-xl">
                    A limited scent trilogy celebrating smoked amber, aromatic golden leaves, and dense resins. Reimagined for extreme physical longevity and pristine structural character on a pristine white canvas.
                  </p>
                </div>

                {/* 3 Perfumes Grid (Light Premium Theme Cards) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl relative z-10">
                  {[
                    {
                      name: "TABAC BRUT",
                      price: "$58",
                      spec: "No. 07 // Raw Smoked Extrait",
                      concentration: "22% Extrait de Parfum",
                      character: "Intense, Dry, Leather-tinged, Raw-leaf complex",
                      sillage: "9.2 / 10",
                      longevity: "12+ Hours (Heavy)",
                      notes: ["Kentucky Tobacco", "Raw Forest Honey", "Charred Oakwood"],
                      batch: "BATCH #TBC-01",
                      extraction: "CO2 Supercritical Extraction",
                      vol: "100ml / 3.4 FL.OZ.",
                      liquidColor: "bg-amber-600/[0.04] border-amber-600/15",
                      image: tabacBrutImg
                    },
                    {
                      name: "SMOKED CHERISE",
                      price: "$64",
                      spec: "No. 12 // Honeyed Cherry-Pipe Unique",
                      concentration: "25% Intense Parfum",
                      character: "Seductive, Warm, Dark-fruity, Ambery-depth",
                      sillage: "8.7 / 10",
                      longevity: "10+ Hours (Moderate-Heavy)",
                      notes: ["Sweet Shag Tobacco", "Morello Black Cherry", "Smoked Vetiver"],
                      batch: "BATCH #TBC-12",
                      extraction: "Steam Distillation & Enfleurage",
                      vol: "100ml / 3.4 FL.OZ.",
                      liquidColor: "bg-red-950/[0.04] border-red-900/15",
                      image: smokedCheriseImg
                    },
                    {
                      name: "VELOURS BLOND",
                      price: "$68",
                      spec: "No. 05 // Powdery Blonde Velvet",
                      concentration: "20% Esprit de Parfum",
                      character: "Refined, Creamy, Close-proximity, Subtle warmth",
                      sillage: "8.1 / 10",
                      longevity: "8+ Hours (Skin scent-Seductive)",
                      notes: ["Blonde Tobacco Blossom", "Cashmere Accord", "Sandalwood Incense"],
                      batch: "BATCH #TBC-05",
                      extraction: "Cold Absolute Maceration",
                      vol: "100ml / 3.4 FL.OZ.",
                      liquidColor: "bg-amber-100/[0.08] border-amber-200/20",
                      image: veloursBlondImg
                    }
                  ].map((p, idx) => (
                    <motion.div
                      key={p.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 1.0, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="group relative rounded-xl border border-stone-200 bg-white p-6 sm:p-8 flex flex-col justify-between hover:border-[#bf953f]/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(27,25,23,0.06)] overflow-hidden"
                    >
                      {/* Batch tag overlay */}
                      <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-[#aa771c]/60 tracking-widest">{p.batch}</div>
                      
                      <div className="flex flex-col">
                        {/* High-Fidelity Professional Perfume Art Capture */}
                        <div className="w-full flex justify-center py-4">
                          <div className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-xl overflow-hidden shadow-[0_12px_24px_rgba(27,25,23,0.05)] border border-stone-150 bg-[#faf9f6] flex items-center justify-center group-hover:shadow-[0_20px_40px_rgba(27,25,23,0.1)] transition-all duration-500">
                            <img 
                              src={p.image} 
                              alt={`${p.name} Perfume Bottle`} 
                              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            {/* Fine gold border detail */}
                            <div className="absolute inset-2 border border-[#bf953f]/20 pointer-events-none rounded-lg" />
                          </div>
                        </div>

                        {/* Details */}
                        <div className="mt-4">
                          <span className="font-mono text-[8.5px] text-[#aa771c] bg-[#bf953f]/10 px-2 py-0.5 rounded tracking-widest uppercase inline-block mb-2 font-medium">
                            {p.concentration}
                          </span>
                          <h3 className="font-luxury text-xl text-stone-900 tracking-[0.1em] uppercase font-light mt-1">
                            {p.name}
                          </h3>
                          <div className="flex items-baseline gap-2 mt-2">
                            <span className="font-sans text-xl text-[#9a7633] font-semibold">{p.price}</span>
                            <span className="font-mono text-[9px] text-stone-400 tracking-wider uppercase">USD</span>
                          </div>
                        </div>

                        {/* "Hard Characters" (Detailed perfume scientific specs) */}
                        <div className="mt-6 border-t border-stone-100 pt-4 space-y-2.5">
                          <div>
                            <span className="font-mono text-[8px] text-stone-400 tracking-widest block uppercase">OLFACTORY PROFILE</span>
                            <p className="font-sans text-[11px] text-stone-700 font-light mt-0.5">{p.character}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="font-mono text-[8px] text-stone-400 tracking-widest block uppercase">SILLAGE INDEX</span>
                              <p className="font-sans text-[10px] text-[#aa771c] font-mono mt-0.5">{p.sillage}</p>
                            </div>
                            <div>
                              <span className="font-mono text-[8px] text-stone-400 tracking-widest block uppercase">LONGEVITY</span>
                              <p className="font-sans text-[11px] text-stone-700 font-light mt-0.5">{p.longevity}</p>
                            </div>
                          </div>
                          <div>
                            <span className="font-mono text-[8px] text-stone-400 tracking-widest block uppercase">OLFACTORY TRIAD</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {p.notes.map((n) => (
                                <span key={n} className="font-mono text-[7.5px] bg-stone-50 text-stone-600 border border-stone-200/70 px-1.5 py-0.5 rounded">
                                  {n}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Luxurious action button */}
                      <button className="mt-8 w-full py-3 rounded bg-stone-950 hover:bg-[#aa771c] text-white font-mono text-[9px] tracking-[0.25em] uppercase transition-all duration-300 hover:shadow-lg cursor-pointer">
                        ORDER HANDMADE EXPERIENCE
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Footnote about craft */}
                <div className="mt-16 text-center max-w-lg">
                  <p className="font-mono text-[8px] text-stone-400/80 tracking-[0.25em] uppercase select-none pointer-events-none leading-relaxed">
                    UNCOMPROMISING METIER // EACH BOTTLE HAND-BLOWN AND WAX-SEALED // SHIPPED IN EMBOSSED ASHWOOD COFFRETS
                  </p>
                </div>
              </section>
            </>
          )}

          {activeCategory === "women" && (
            <section className="relative w-full h-[125vh] bg-[#090807] overflow-hidden select-none z-20 border-b border-stone-850 flex flex-col justify-center items-center">
              <div className="absolute top-8 left-8 text-[9px] font-mono text-stone-500/80 tracking-[0.25em] uppercase pointer-events-none select-none">Maison Nym // Women Campaign</div>
              <div className="absolute top-8 right-8 text-[9px] font-mono text-stone-500/80 tracking-[0.25em] uppercase pointer-events-none select-none">Plateau I // SC-2026</div>

              <div className="absolute top-10 left-6 md:left-16 z-30">
                <button
                  onClick={triggerBackToMainTransition}
                  className="px-5 py-2.5 rounded-full border border-slate-700/60 bg-[#090807]/80 backdrop-blur-md text-slate-300 font-mono text-[9px] tracking-[0.25em] uppercase hover:bg-slate-800/40 hover:text-white hover:border-slate-500 transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.5)] cursor-pointer flex items-center justify-center gap-2 font-medium"
                >
                  <span>←</span>
                  <span>Back to Main</span>
                </button>
              </div>

              <div className="absolute inset-0">
                <motion.img 
                  src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1600&auto=format&fit=crop"
                  alt="Sensory Elegance Iconic Women Campaign"
                  className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.05]"
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090807] via-black/10 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#090807]/80 via-transparent to-[#090807]/70 z-10" />
                <div className="absolute inset-0 bg-black/15 z-10" />
              </div>

              <div className="relative z-20 text-center px-6 max-w-4xl flex flex-col items-center">
                <span className="font-mono text-[10px] sm:text-xs text-[#aa771c] tracking-[0.45em] uppercase mb-4 block">
                  <LuxuryTrackingText text="LA COLLECTION IMPÉRIALE" fromTracking="0.25em" toTracking="0.45em" />
                </span>
                <h1 className="font-luxury font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-[0.22em] uppercase leading-none mb-6">
                  <LuxuryRevealText text="AMBRE SOLEIL" duration={1.8} />
                </h1>
                <div className="w-20 h-[0.5px] bg-[#bf953f] my-4" />
                <p className="font-signature text-2xl md:text-3xl text-slate-300/90 mt-2 select-none capitalize">
                  forged in absolute light, lived in whispers
                </p>
                
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="mt-16 flex flex-col items-center gap-2"
                >
                  <span className="font-mono text-[8px] tracking-[0.3em] text-stone-400 uppercase">Scroll to Discover</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#bf953f]" />
                </motion.div>
              </div>
            </section>
          )}

          {/* Pristine Luxury Section 3 (Brutalist matte slate gallery of 6 individual perfumes on their own rustic rock plates) */}
          {activeCategory === "women" && (
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
          <span className="font-mono text-[9px] md:text-[10px] text-slate-400/60 uppercase block mb-3">
            <LuxuryTrackingText text="LA COLLECTION PRIVÉE" fromTracking="0.25em" toTracking="0.4em" />
          </span>
          <ElegantLineReveal>
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
          </ElegantLineReveal>
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
                initial={{ opacity: 0, y: 55, filter: "blur(12px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
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
          )}
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

