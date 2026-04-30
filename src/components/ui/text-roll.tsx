"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"

const STAGGER = 0.035

export default function TextRoll({
  children,
  className,
  center = false,
  hovered,
}: {
  children: string
  className?: string
  center?: boolean
  /** External hover control. If omitted, falls back to self-hover. */
  hovered?: boolean
}) {
  // When `hovered` is provided we drive the variant from props (so the
  // animation can be triggered by a parent element). Otherwise we use the
  // span's own pointer hover via whileHover.
  const controlled = hovered !== undefined
  return (
    <motion.span
      initial="initial"
      animate={controlled ? (hovered ? "hovered" : "initial") : "initial"}
      whileHover={controlled ? undefined : "hovered"}
      className={cn(
        "relative block overflow-hidden text-black dark:text-white/90",
        className
      )}
      style={{
        lineHeight: 0.85,
      }}
    >
      {/* Top Text (Slides up) */}
      <div>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i

          return (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: "-100%",
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          )
        })}
      </div>

      {/* Bottom Text (Slides in from bottom) */}
      <div className="absolute inset-0">
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i

          return (
            <motion.span
              variants={{
                initial: {
                  y: "100%",
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          )
        })}
      </div>
    </motion.span>
  )
}
