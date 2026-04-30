"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import MenuButton from "@/components/ui/menu-button"

const BRAND_BLUE = "#1d3afe"

export default function Header() {
  return (
    <header className="fixed inset-x-0 2xl:inset-x-[10%] top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
      <a
        href="#home"
        className="text-[clamp(1.25rem,1.4vw,1.75rem)] font-black tracking-[0.02em] text-black leading-none"
      >
        EBR
      </a>

      <div className="flex items-center gap-2.5">
        <div className="hidden md:block">
          <LetsTalkPill />
        </div>
        <MenuButton />
      </div>
    </header>
  )
}


function LetsTalkPill() {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex h-[3.2em] cursor-pointer items-center gap-2 rounded-[6.25em] px-[1.625em] py-0",
        "text-[0.875rem] font-medium uppercase text-white",
        "border-none ring-1 ring-black/5 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.25)]",
        "transition-colors duration-[400ms]",
        "outline-none focus:outline-none focus-visible:outline-none"
      )}
      style={{ backgroundColor: hovered ? BRAND_BLUE : "#0f0d17" }}
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

      <span className="leading-[1.15]">LET'S TALK</span>

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
        <span className="block h-[5px] w-[5px] shrink-0 rounded-full bg-white" />
      </motion.span>
    </button>
  )
}
