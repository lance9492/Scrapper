import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { type MaterialType } from "@/lib/types"

interface MaterialTypeItemProps {
  type: MaterialType
  materialName: string
}

const getImageUrl = (materialName: string, typeName: string) => {
  const images: Record<string, string> = {
    // Copper types
    "Bright Copper (Millberry)": "https://images.unsplash.com/photo-1605557202138-097824c3f8c7?auto=format&fit=crop&q=80&w=400",
    "Heavy Copper (Berry)": "https://images.unsplash.com/photo-1599690925058-90e1a0b56154?auto=format&fit=crop&q=80&w=400",
    "Light Copper": "https://images.unsplash.com/photo-1496661269814-a841e78df103?auto=format&fit=crop&q=80&w=400",
    "Insulated Copper Wire (ICW)": "https://images.unsplash.com/photo-1589924749359-9697080c3577?auto=format&fit=crop&q=80&w=400",
    
    // Steel types
    "HMS 1": "https://images.unsplash.com/photo-1567502669551-8d58f952c9f9?auto=format&fit=crop&q=80&w=400",
    "HMS 2": "https://images.unsplash.com/photo-1535813547-99c456a39356?auto=format&fit=crop&q=80&w=400",
    "304 Stainless Steel": "https://images.unsplash.com/photo-1583776751686-4ec535b8e424?auto=format&fit=crop&q=80&w=400",
    "316 Stainless Steel": "https://images.unsplash.com/photo-1582540730843-e3601b530548?auto=format&fit=crop&q=80&w=400",
    
    // Aluminum types
    "Clean Aluminum": "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=400",
    "Cast Aluminum": "https://images.unsplash.com/photo-1599690925527-0b147a7ddcd0?auto=format&fit=crop&q=80&w=400",
    "Aluminum Cans": "https://images.unsplash.com/photo-1576398289164-c48dc021b4e1?auto=format&fit=crop&q=80&w=400",
    
    // Brass types
    "Yellow Brass": "https://images.unsplash.com/photo-1589655150142-a74e5ad4ff11?auto=format&fit=crop&q=80&w=400",
    "Red Brass": "https://images.unsplash.com/photo-1589655150346-e447556d3ec5?auto=format&fit=crop&q=80&w=400",
    "Mixed Brass": "https://images.unsplash.com/photo-1589655150496-7c8e4d4bff6b?auto=format&fit=crop&q=80&w=400",
    
    // Default fallback image
    "default": "https://images.unsplash.com/photo-1518618750560-8f07abde4c6c?auto=format&fit=crop&q=80&w=400"
  }

  const key = `${materialName} - ${typeName}`
  return images[key] || images.default
}

export function MaterialTypeItem({ type, materialName }: MaterialTypeItemProps) {
  const imageUrl = getImageUrl(materialName, type.name)
  
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={type.name}
            fill
            className="object-cover"
            sizes="64px"
            quality={75}
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{type.name}</h3>
            <Badge variant={getBadgeVariant(type.grade)}>
              Grade {type.grade}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold">R {type.price}</div>
        <div className="text-xs text-muted-foreground">per kg</div>
      </div>
    </div>
  )
}

function getBadgeVariant(grade: string) {
  if (grade.includes('+')) return "default"
  switch (grade) {
    case 'A': return "secondary"
    case 'B': return "outline"
    default: return "destructive"
  }
}