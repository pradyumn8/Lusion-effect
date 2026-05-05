"use client"

const modules = import.meta.glob("../../assets/brands-logo/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
})

const logos = Object.values(modules) as string[]
const loop = [...logos, ...logos]

export default function BrandsLogo() {
  return (
    <section className="bg-[#6B00F6] py-20 md:py-28">
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 22%, black 78%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 22%, black 78%, transparent)",
        }}
      >
        <div className="flex w-max animate-snake items-center [animation-duration:40s]">
          {loop.map((src, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center justify-center px-8 md:px-12"
            >
              <img
                src={src}
                alt=""
                aria-hidden
                className="h-10 w-auto md:h-12"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
