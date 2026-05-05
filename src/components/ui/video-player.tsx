"use client"

import { useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react"

type VideoPlayerProps = {
  src: string
  open: boolean
  onClose: () => void
}

export default function VideoPlayer({ src, open, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const moveTimeoutRef = useRef<number | null>(null)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40, mass: 0.3 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40, mass: 0.3 })

  useEffect(() => {
    if (!open) return
    const v = videoRef.current
    if (v) {
      v.muted = true
      v.currentTime = 0
      v.play().catch(() => {})
    }
    setIsPlaying(true)
    setIsMuted(true)
    setProgress(0)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setCursorVisible(true)
      setIsMoving(true)
      if (moveTimeoutRef.current) window.clearTimeout(moveTimeoutRef.current)
      moveTimeoutRef.current = window.setTimeout(() => setIsMoving(false), 180)
    }
    const onLeave = () => setCursorVisible(false)
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseleave", onLeave)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
    }
  }, [open, cursorX, cursorY])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setIsPlaying(true)
    } else {
      v.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setIsMuted(v.muted)
  }

  const onTimeUpdate = () => {
    const v = videoRef.current
    if (!v || !v.duration) return
    setProgress((v.currentTime / v.duration) * 100)
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-0 z-[100] bg-black "
          onClick={onClose}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={src}
            autoPlay
            loop
            playsInline
            onTimeUpdate={onTimeUpdate}
          />
          <div className="pointer-events-none absolute inset-0 bg-black/30" />

          <button
            type="button"
            aria-label="Close player"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25 md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              className="h-4 w-4"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>

          <div
            className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-6 px-8 py-6 text-white md:px-12 md:py-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={togglePlay}
              className="text-eyebrow"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>

            <div className="relative h-px flex-1 bg-white/30">
              <div
                className="absolute inset-y-0 left-0 bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              type="button"
              onClick={toggleMute}
              className="text-eyebrow"
            >
              {isMuted ? "Unmute" : "Mute"}
            </button>
          </div>

          <motion.div
            aria-hidden
            style={{ x: springX, y: springY }}
            animate={{
              opacity: cursorVisible ? 1 : 0,
              scale: isMoving ? 1.25 : 1,
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed left-0 top-0 z-[200] hidden h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white md:grid"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="h-6 w-6"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
