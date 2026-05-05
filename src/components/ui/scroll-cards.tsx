"use client"

import type { FC } from "react"

interface iCardItem {
  title: string
  description: string
  tag: string
  src: string
  link: string
  color: string
  textColor: string
}

interface iCardProps extends Omit<iCardItem, "src" | "link" | "tag"> {
  i: number
  src: string
}

const Card: FC<iCardProps> = ({
  title,
  description,
  color,
  textColor,
  src,
}) => {
  return (
    <div className="h-screen flex items-center justify-center sticky top-0 md:p-0 px-4">
      <div
        className="relative flex flex-col h-[300px] w-[700px] py-12 px-10 md:px-12
          rotate-0 md:h-[400px] md:w-[600px] items-center justify-center mx-auto
          shadow-md pr-3 pl-3 pt-3 pb-4 overflow-hidden rounded-md"
        style={{ backgroundColor: color }}
      >
        <h3
          className="text-h1 relative z-10 mt-5"
          style={{ color: textColor }}
        >
          {title}
        </h3>
        <p
          className="text-body-lg relative z-10 mt-2 text-center lowercase"
          style={{ color: textColor }}
        >
          {description}
        </p>
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src={src}
            alt={title}
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>
      </div>
    </div>
  )
}

interface iCardSlideProps {
  items: iCardItem[]
}

const CardsParallax: FC<iCardSlideProps> = ({ items }) => {
  return (
    <div className="min-h-screen">
      {items.map((project, i) => (
        <Card key={`p_${i}`} {...project} i={i} />
      ))}
    </div>
  )
}

export { CardsParallax, type iCardItem }
