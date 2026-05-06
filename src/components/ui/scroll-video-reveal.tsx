"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

type ScrollVideoRevealProps = {
  src: string
  poster?: string
  /** Total scroll height of the section, in vh. Default 300. */
  scrollHeightVh?: number
  className?: string
  /** Optional overlay content rendered above the video (e.g. a heading). */
  children?: React.ReactNode
  /** Centered overlay that fades in once the video reveal is complete. */
  revealOverlay?: React.ReactNode
}

type Point = [number, number]
type ShapeDef = {
  tl: Point, tr: Point, br: Point, bl: Point,
  tc1: Point, tc2: Point,
  rc1: Point, rc2: Point,
  bc1: Point, bc2: Point,
  lc1: Point, lc2: Point
}

function pt(p1: Point, p2: Point, dist: number): Point {
  const dx = p2[0] - p1[0]
  const dy = p2[1] - p1[1]
  const len = Math.sqrt(dx * dx + dy * dy)
  if (len === 0) return p1
  const t = Math.min(dist / len, 0.5) // Max 50% along the segment to prevent overlaps
  return [p1[0] + dx * t, p1[1] + dy * t]
}

function buildPath(c: ShapeDef, r: number) {
  // Inset the corners by 'r' towards the adjacent control points.
  // We then connect them with a quadratic bezier (defined as a cubic with coincident CPs)
  // at the corner point, creating perfectly tangent, smooth rounded corners.
  const tl_out = pt(c.tl, c.tc1, r)
  const tl_in = pt(c.tl, c.lc2, r)

  const tr_in = pt(c.tr, c.tc2, r)
  const tr_out = pt(c.tr, c.rc1, r)

  const br_in = pt(c.br, c.rc2, r)
  const br_out = pt(c.br, c.bc1, r)

  const bl_in = pt(c.bl, c.bc2, r)
  const bl_out = pt(c.bl, c.lc1, r)

  return [
    `M ${tl_out[0]} ${tl_out[1]}`,
    `C ${c.tc1[0]} ${c.tc1[1]}, ${c.tc2[0]} ${c.tc2[1]}, ${tr_in[0]} ${tr_in[1]}`,
    `C ${c.tr[0]} ${c.tr[1]}, ${c.tr[0]} ${c.tr[1]}, ${tr_out[0]} ${tr_out[1]}`,
    `C ${c.rc1[0]} ${c.rc1[1]}, ${c.rc2[0]} ${c.rc2[1]}, ${br_in[0]} ${br_in[1]}`,
    `C ${c.br[0]} ${c.br[1]}, ${c.br[0]} ${c.br[1]}, ${br_out[0]} ${br_out[1]}`,
    `C ${c.bc1[0]} ${c.bc1[1]}, ${c.bc2[0]} ${c.bc2[1]}, ${bl_in[0]} ${bl_in[1]}`,
    `C ${c.bl[0]} ${c.bl[1]}, ${c.bl[0]} ${c.bl[1]}, ${bl_out[0]} ${bl_out[1]}`,
    `C ${c.lc1[0]} ${c.lc1[1]}, ${c.lc2[0]} ${c.lc2[1]}, ${tl_in[0]} ${tl_in[1]}`,
    `C ${c.tl[0]} ${c.tl[1]}, ${c.tl[0]} ${c.tl[1]}, ${tl_out[0]} ${tl_out[1]}`,
    `Z`
  ].join(" ")
}

const S1: ShapeDef = {
  tl: [0.03, 0.2], tr: [0.45, 0.2], br: [0.45, 0.8], bl: [0.03, 0.8],
  tc1: [0.18, 0.2], tc2: [0.32, 0.2],
  rc1: [0.45, 0.4], rc2: [0.45, 0.6],
  bc1: [0.32, 0.8], bc2: [0.18, 0.8],
  lc1: [0.03, 0.6], lc2: [0.03, 0.4]
};

const S2: ShapeDef = {
  tl: [0.03, 0.2], tr: [0.7, 0.2], br: [0.45, 0.8], bl: [0.03, 0.8],
  tc1: [0.26, 0.2], tc2: [0.48, 0.2],
  rc1: [0.35, 0.4], rc2: [0.35, 0.6],
  bc1: [0.31, 0.8], bc2: [0.18, 0.8],
  lc1: [0.03, 0.6], lc2: [0.03, 0.4]
};

const S3: ShapeDef = {
  tl: [0.03, 0.2], tr: [0.97, 0.15], br: [0.4, 0.8], bl: [0.03, 0.8],
  tc1: [0.35, 0.18], tc2: [0.65, 0.16],
  rc1: [0.25, 0.4], rc2: [0.25, 0.6],
  bc1: [0.28, 0.8], bc2: [0.16, 0.8],
  lc1: [0.03, 0.6], lc2: [0.03, 0.4]
};

const S4: ShapeDef = {
  tl: [0.1, 0.15], tr: [0.9, 0.1], br: [0.85, 0.8], bl: [0.15, 0.85],
  tc1: [0.4, 0.35], tc2: [0.6, 0.35],
  rc1: [0.55, 0.4], rc2: [0.55, 0.6],
  bc1: [0.6, 0.95], bc2: [0.4, 0.95],
  lc1: [0.05, 0.6], lc2: [0.05, 0.4]
};

const S5: ShapeDef = {
  tl: [0.05, 0.05], tr: [0.95, 0.02], br: [0.95, 0.95], bl: [0.05, 0.98],
  tc1: [0.3, 0.12], tc2: [0.7, 0.12],
  rc1: [0.8, 0.4], rc2: [0.8, 0.6],
  bc1: [0.7, 1.0], bc2: [0.3, 1.0],
  lc1: [0.02, 0.7], lc2: [0.02, 0.3]
};

const S6: ShapeDef = {
  tl: [0, 0], tr: [1, 0], br: [1, 1], bl: [0, 1],
  tc1: [0.33, 0], tc2: [0.67, 0],
  rc1: [1, 0.33], rc2: [1, 0.67],
  bc1: [0.67, 1], bc2: [0.33, 1],
  lc1: [0, 0.67], lc2: [0, 0.33]
};

const paths = [
  buildPath(S1, 0.05),
  buildPath(S2, 0.05),
  buildPath(S3, 0.05),
  buildPath(S4, 0.05),
  buildPath(S5, 0.03),
  buildPath(S6, 0.03),
];

export default function ScrollVideoReveal({
  src,
  poster,
  scrollHeightVh = 150,
  className,
  children,
  revealOverlay,
}: ScrollVideoRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  // Smooth the raw scroll progress so the wave feels liquid rather than linear.
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.2,
  })

  const d = useTransform(
    progress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    paths
  )

  const childrenOpacity = useTransform(progress, [0.55, 0.8], [1, 0])
  const overlayOpacity = useTransform(progress, [0.85, 1], [0, 1])
  const overlayScale = useTransform(progress, [0.85, 1], [0.92, 1])

  if (isMobile) {
    return (
      <section className={cn("relative w-full px-4", className)}>
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl">
          <video
            className="h-full w-full object-cover"
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-black/15" />
          {revealOverlay ? (
            <div className="absolute inset-0 flex items-center justify-center px-6">
              {revealOverlay}
            </div>
          ) : null}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      className={cn("relative w-full", className)}
      style={{ height: `${scrollHeightVh}vh` }}
    >
      <div className="pointer-events-none sticky top-0 h-screen w-full overflow-hidden">
        {/* SVG defines the clip-path. objectBoundingBox keeps coords in 0..1
            so the path scales with whatever it is applied to. */}
        <svg
          aria-hidden
          width="0"
          height="0"
          className="absolute h-0 w-0"
        >
          <defs>
            <clipPath id="reveal-clip" clipPathUnits="objectBoundingBox">
              <motion.path d={d} />
            </clipPath>
          </defs>
        </svg>

        <div
          className="absolute inset-0"
          //  className="mx-auto h-full w-[80%] overflow-hidden rounded-3xl"
          style={{ clipPath: "url(#reveal-clip)", WebkitClipPath: "url(#reveal-clip)" }}
        >
          <video
            className="h-full w-full object-cover"
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>

        {children ? (
          <motion.div
            style={{ opacity: childrenOpacity }}
            className="pointer-events-none absolute inset-0 flex items-end justify-between p-8 md:p-14"
          >
            {children}
          </motion.div>
        ) : null}

        {revealOverlay ? (
          <motion.div
            style={{ opacity: overlayOpacity, scale: overlayScale }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
          >
            <div className="pointer-events-auto">{revealOverlay}</div>
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}
