"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, ArrowRight, MessageSquare } from "lucide-react"

import { cn } from "@/lib/utils"
import TextRoll from "@/components/ui/text-roll"

type MenuItem = {
  name: string
  href: string
  active?: boolean
}

const defaultItems: MenuItem[] = [
  { name: "HOME", href: "#home", active: true },
  { name: "ABOUT US", href: "#about" },
  { name: "PROJECTS", href: "#projects" },
  { name: "CONTACT", href: "#contact" },
]

export default function MenuButton({
  items = defaultItems,
  labsHref = "#labs",
  className,
}: {
  items?: MenuItem[]
  labsHref?: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [labsHovered, setLabsHovered] = useState(false)

  return (
    <div className={cn("relative inline-block", className)}>
      {/* Toggle pill */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        layout
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
        className={cn(
          "relative flex h-[3.2em] w-[3.2em] cursor-pointer items-center justify-center gap-0 rounded-[6.25em] px-0 py-0",
          "md:w-auto md:justify-start md:gap-3 md:px-[1.625em]",
          "text-[0.875rem] font-medium uppercase",
          "border-none shadow-[0_8px_24px_-10px_rgba(0,0,0,0.25)] ring-1 transition-colors duration-[400ms]",
          open
            ? "bg-white text-[#0f0d17] ring-black/5"
            : "bg-[#E5E7F0] text-black ring-black/5"
        )}
      >
        <motion.span
          key={open ? "close" : "menu"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="hidden leading-[1.15] md:inline-block"
        >
          {open ? "CLOSE" : "MENU"}
        </motion.span>

        {/* Dots indicator */}
        <span
          className={cn(
            "flex items-center justify-center",
            open ? "flex-col gap-[3px]" : "flex-row gap-[3px]"
          )}
        >
          <motion.span
            layout
            className={cn(
              "block h-[4px] w-[4px] rounded-full",
              open ? "bg-[#0f0d17]" : "bg-black"
            )}
          />
          <motion.span
            layout
            className={cn(
              "block h-[4px] w-[4px] rounded-full",
              open ? "bg-[#0f0d17]" : "bg-black"
            )}
          />
        </span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <div
            key="menu-panel"
            className="absolute right-0 top-[calc(100%+12px)] z-50 flex w-[calc(100vw-3rem)] max-w-[22em] flex-col gap-2 md:w-[19.38em]"
          >
            {/* Block 1 — items panel: tumbles up from below with a tilt */}
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.85, rotate: 8 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 60, scale: 0.9, rotate: 6 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="origin-top-right overflow-hidden rounded-[0.625em] bg-white shadow-[0_20px_50px_-15px_rgba(15,13,23,0.35)] ring-1 ring-black/5"
            >
              <ul
                className="flex flex-col px-2.5 py-4"
                onMouseLeave={() => setHovered(null)}
              >
                {items.map((item, index) => {
                  const isHovered = hovered === item.name
                  return (
                    <li key={item.name}>
                      <motion.a
                        href={item.href}
                        onMouseEnter={() => setHovered(item.name)}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.06 + index * 0.04,
                          duration: 0.25,
                          ease: "easeOut",
                        }}
                        className={cn(
                          "group relative flex w-full cursor-pointer items-center justify-between overflow-hidden rounded-full px-4 py-4 text-black",
                          "outline-none focus:outline-none focus-visible:outline-none",
                          "[-webkit-tap-highlight-color:transparent]"
                        )}
                      >
                        {/* Bg pill — circular reveal anchored at left-center,
                            same easing as the wave button. */}
                        <span
                          aria-hidden
                          className="absolute inset-0 transition-[clip-path]"
                          style={{
                            backgroundColor: "#E5E7F0",
                            clipPath: isHovered
                              ? "circle(125%)"
                              : "circle(0%)",
                            transitionDuration: isHovered ? "0.5s" : "0s",
                            transitionTimingFunction:
                              "cubic-bezier(0.25, 1, 0.3, 1)",
                          }}
                        />

                        <TextRoll
                          hovered={isHovered}
                          className={cn(
                            "relative z-10 font-aeonik text-[26px] font-light tracking-[0.02em] uppercase leading-[1.4] text-black"
                          )}
                        >
                          {item.name}
                        </TextRoll>

                        {/* Right-side indicator: arrow on hover, dot for active otherwise */}
                        <span className="relative z-10 ml-3 flex h-4 w-4 items-center justify-center">
                          <AnimatePresence mode="wait" initial={false}>
                            {isHovered ? (
                              <motion.span
                                key="arrow"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                style={{ originX: 0, originY: 1 }}
                                className="absolute inset-0 flex items-center justify-center text-[#0f0d17]"
                              >
                                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                              </motion.span>
                            ) : item.active ? (
                              <motion.span
                                key="dot"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.18 }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                <span className="block h-[6px] w-[6px] rounded-full bg-[#0f0d17]" />
                              </motion.span>
                            ) : null}
                          </AnimatePresence>
                        </span>
                      </motion.a>
                    </li>
                  )
                })}
              </ul>
            </motion.div>

            {/* Mobile-only LET'S TALK card — slots between the items panel
                and the LABS card to mirror the reference layout. */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 50, scale: 0.88, rotate: 6 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 40, scale: 0.92, rotate: 4 }}
              transition={{
                delay: 0.09,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex origin-top-right items-center justify-between overflow-hidden rounded-[0.625em] bg-white px-[1.875em] py-[1.75em] text-black shadow-[0_20px_50px_-15px_rgba(15,13,23,0.35)] ring-1 ring-black/5 md:hidden"
            >
              <span className="font-aeonik text-[26px] font-light tracking-[0.02em] uppercase leading-none text-black">
                LET'S TALK
              </span>
              <MessageSquare className="h-[18px] w-[18px] text-black" strokeWidth={2} />
            </motion.a>

            {/* Block 2 — LABS footer: tumbles in after the items panel,
                tilted from the opposite direction so the two read as
                two distinct objects falling into place. */}
            <motion.a
              href={labsHref}
              onMouseEnter={() => setLabsHovered(true)}
              onMouseLeave={() => setLabsHovered(false)}
              initial={{ opacity: 0, y: 40, scale: 0.85, rotate: -20 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 32, scale: 0.9, rotate: -16 }}
              transition={{
                delay: 0.14,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex origin-top-right items-center justify-between overflow-hidden rounded-[0.625em] bg-[#0f0d17] px-[1.875em] py-[1.25em] text-white shadow-[0_20px_50px_-15px_rgba(15,13,23,0.35)] ring-1 ring-black/5"
            >
              <span className="flex items-center gap-2">
                <LabsIcon className="h-[28px] w-[28px]" />
                <TextRoll
                  hovered={labsHovered}
                  className="text-[26px] font-light tracking-[0.12em] uppercase leading-none text-white"
                >
                  LABS
                </TextRoll>
              </span>
              <span className="relative flex h-4 w-4 items-center justify-center">
                <AnimatePresence mode="wait">
                  {labsHovered ? (
                    <motion.span
                      key="hover-arrow"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ originX: 0, originY: 1 }}
                      className="absolute inset-0 flex items-center justify-center text-white/90"
                    >
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="default-arrow"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ originX: 0, originY: 1 }}
                      className="absolute inset-0 flex items-center justify-center text-white/90"
                    >
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </motion.a>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

function LabsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="8.5" cy="3" r="2" fill="currentColor" />
      <circle cx="15.5" cy="3" r="2" fill="currentColor" />
      <circle cx="12" cy="16" r="6" stroke="currentColor" strokeWidth="3" />
    </svg>
  )

}
