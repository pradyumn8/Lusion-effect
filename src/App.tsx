import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import BrandsLogo from "@/components/ui/brands-logo"
import Header from "@/components/ui/header"
import ScrollVideoReveal from "@/components/ui/scroll-video-reveal"
import Stats from "@/components/ui/stats"
import VideoPlayer from "@/components/ui/video-player"
import desktopVideo from "@/assets/ebr desk.mp4"
import mobileVideo from "@/assets/ebr mob.mp4"

const BRAND_BLUE = "#1d3afe"

function App() {
  const [playerOpen, setPlayerOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [])

  const videoSrc = isMobile ? mobileVideo : desktopVideo

  return (
    <main
      className={cn(
        "relative w-full transition-colors duration-300",
        menuOpen ? "bg-[#350B6A] md:bg-[#f3f1ff]" : "bg-[#f3f1ff]"
      )}
    >
      <Header onMenuOpenChange={setMenuOpen} />

      <div className="mx-auto w-full 2xl:w-[80%]">
        <Hero />

        <ScrollVideoReveal
          src={videoSrc}
          className="md:-mt-[25rem]"
          revealOverlay={
            <button
              type="button"
              aria-label="Play reel"
              onClick={() => setPlayerOpen(true)}
              className="group flex cursor-pointer items-center gap-4 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)] md:gap-8"
            >
              <span className="relative grid place-items-center overflow-hidden rounded-full bg-white/95 px-6 py-3 ring-1 ring-white/40 md:px-10 md:py-5">
                <span
                  aria-hidden
                  className="absolute inset-0 translate-y-full bg-blue-600 transition-transform duration-500 ease-out group-hover:translate-y-0"
                />
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="relative z-10 h-7 w-7 fill-black transition-colors duration-500 group-hover:fill-white md:h-12 md:w-12"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          }
        >
          <h2 className="text-h1 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]">
            Scroll to reveal.
          </h2>
          <span className="text-eyebrow text-white/80">
            ↓ keep going
          </span>
        </ScrollVideoReveal>

        <Stats />

        <BrandsLogo />
      </div>

      <VideoPlayer
        src={videoSrc}
        open={playerOpen}
        onClose={() => setPlayerOpen(false)}
      />
    </main>
  )
}

export default App

function Hero() {
  return (
    <section className="relative px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-24">
      <h1 className="text-display text-black">
        Bold Ideas,
        <br />
        Brought to Life
      </h1>

      <div className="mt-12 flex flex-col gap-10 md:mt-20 md:flex-row md:items-end md:justify-between md:gap-16">
        <div className="w-full md:w-[42%]">

        </div>
        <div className="max-w-[42em]">
          <p className="text-body-lg text-black/80">
            We combine design, motion, 3D, and development to create digital
            experiences that feel visually striking and technically seamless.
            From campaign launches to immersive brand worlds, we build work
            that captures attention and invites interaction.
          </p>
          <OurApproachPill />
        </div>
      </div>
    </section>
  )
}

function OurApproachPill() {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "mt-8 relative z-30 flex h-[3.2em] cursor-pointer items-center gap-2 rounded-[6.25em] px-[1.625em] py-0",
        "text-[0.875rem] font-medium uppercase",
        "border-none ring-1 ring-black/5 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.25)]",
        "transition-colors duration-[400ms]",
        "outline-none focus:outline-none focus-visible:outline-none"
      )}
      style={{
        backgroundColor: hovered ? BRAND_BLUE : "#ffffff",
        color: hovered ? "#ffffff" : "#000000",
      }}
    >
      {/* Arrow that grows in from the left on hover */}
      <motion.span
        aria-hidden
        animate={{
          width: hovered ? 18 : 0,
          marginRight: hovered ? 2 : 0,
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center overflow-hidden"
      > 
        <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.25} />
      </motion.span>

      <span className="leading-[1.15]">OUR APPROACH</span>

      {/* Default trailing dot collapses on hover */}
      <motion.span
        aria-hidden
        animate={{
          width: hovered ? 0 : 6,
          marginLeft: hovered ? 0 : 4,
          opacity: hovered ? 0 : 1,
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center overflow-hidden"
      >
        <span className="block h-[5px] w-[5px] shrink-0 rounded-full bg-current" />
      </motion.span>
    </button>
  )
}
