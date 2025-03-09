interface MaterialInfoProps {
  name: string
  description: string
}

export function MaterialInfo({ name, description }: MaterialInfoProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <p className="text-muted-foreground mb-6">{description}</p>
    </>
  )
}