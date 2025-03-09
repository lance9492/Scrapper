import Image from "next/image"

interface MaterialImageProps {
  image: string
  name: string
}

export function MaterialImage({ image, name }: MaterialImageProps) {
  return (
    <div className="relative h-[300px] md:h-full">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        quality={85}
      />
    </div>
  )
}