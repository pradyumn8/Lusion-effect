"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView } from "motion/react"

type Stat = {
  value: number
  prefix?: string
  suffix?: string
  label: string
}

const stats: Stat[] = [
  { value: 100, suffix: "+", label: "Projects Done" },
  { value: 1, prefix: "$", suffix: "M", label: "Company ARR" },
  { value: 50, suffix: "k+", label: "Client Traffic" },
  { value: 97, suffix: "%", label: "Retention Rate" },
]

function Counter({ value, inView }: { value: number; inView: boolean }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, value])

  return <>{display}</>
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15%" })

  return (
    <section className="px-6 py-10 md:px-8 md:py-16">
      <div
        ref={ref}
        className="grid grid-cols-2 gap-y-12 md:flex md:flex-row md:justify-between md:gap-y-0"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-3">
            <div className="text-h1 flex items-baseline text-black">
              {stat.prefix}
              <Counter value={stat.value} inView={inView} />
              {stat.suffix}
            </div>
            <div className="flex items-center gap-2 text-black/70">
              <span
                aria-hidden
                className="block h-1.5 w-1.5 rounded-full bg-black/70"
              />
              <span className="text-body-sm">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
