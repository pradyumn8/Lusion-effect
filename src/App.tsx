import Header from "@/components/ui/header"
import ScrollVideoReveal from "@/components/ui/scroll-video-reveal"
import desktopVideo from "@/assets/desktop.mp4"

function App() {
  return (
    <main className="relative w-full bg-[#f3f1ff]">
      <Header />

      <div className="mx-auto w-full 2xl:w-[80%]">
        <Hero />

        <ScrollVideoReveal src={desktopVideo} className="-mt-[25rem]">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]">
            Scroll to reveal.
          </h2>
          <span className="text-sm md:text-base font-medium uppercase tracking-[0.2em] text-white/80">
            ↓ keep going
          </span>
        </ScrollVideoReveal>
      </div>
    </main>
  )
}

export default App

function Hero() {
  return (
    <section className="relative px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-24">
      <h1 className="font-aeonik font-light tracking-[-0.02em] text-black leading-[0.9] text-[clamp(56px,11vw,200px)]">
        Bold Ideas,
        <br />
        Brought to Life
      </h1>

      <div className="mt-12 flex flex-col gap-10 md:mt-20 md:flex-row md:items-end md:justify-between md:gap-16">
        <div className="w-full md:w-[42%]">

        </div>
        <div className="max-w-[42em]">
          <p className="font-aeonik text-base leading-[1.6] text-black/80 md:text-lg">
            We combine design, motion, 3D, and development to create digital
            experiences that feel visually striking and technically seamless.
            From campaign launches to immersive brand worlds, we build work
            that captures attention and invites interaction.
          </p>
          <button
            type="button"
            className="mt-8 inline-flex h-[3.2em] cursor-pointer items-center gap-3 rounded-[6.25em] bg-white px-[1.625em] text-[0.875rem] font-medium uppercase text-black shadow-[0_8px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-black/5 outline-none focus:outline-none focus-visible:outline-none"
          >
            <span aria-hidden className="block h-[6px] w-[6px] rounded-full bg-black" />
            <span className="leading-[1.15]">OUR APPROACH</span>
          </button>
        </div>
      </div>
    </section>
  )
}
