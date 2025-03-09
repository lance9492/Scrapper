"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImagePlus, Video, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface MediaUploadProps {
  images: string[]
  video?: string
  onImagesChange: (images: string[]) => void
  onVideoChange: (video: string | undefined) => void
  maxImages?: number
}

export function MediaUpload({ 
  images, 
  video, 
  onImagesChange, 
  onVideoChange,
  maxImages = 10
}: MediaUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return

    const imageFiles = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .slice(0, maxImages - images.length)
    
    const newImages = imageFiles.map(file => URL.createObjectURL(file))
    onImagesChange([...images, ...newImages])
  }

  const handleVideoUpload = (files: FileList | null) => {
    if (!files || !files[0]) return
    
    const file = files[0]
    if (!file.type.startsWith('video/')) return
    
    if (video) URL.revokeObjectURL(video)
    
    const videoUrl = URL.createObjectURL(file)
    onVideoChange(videoUrl)
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    URL.revokeObjectURL(newImages[index])
    newImages.splice(index, 1)
    onImagesChange(newImages)
  }

  const removeVideo = () => {
    if (video) URL.revokeObjectURL(video)
    onVideoChange(undefined)
  }

  return (
    <div className="space-y-4">
      {images.length < maxImages && (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-4 text-center",
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
          )}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setIsDragging(false)
            handleImageUpload(e.dataTransfer.files)
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <ImagePlus className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drag and drop images here or click to browse ({images.length}/{maxImages})
            </p>
            <Input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              id="image-upload"
              onChange={(e) => handleImageUpload(e.target.files)}
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              Choose Images
            </Button>
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={image}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2 h-6 w-6"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">Add Video (Optional)</span>
          </div>
          <Input
            type="file"
            accept="video/*"
            className="hidden"
            id="video-upload"
            onChange={(e) => handleVideoUpload(e.target.files)}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('video-upload')?.click()}
          >
            Upload Video
          </Button>
        </div>
        
        {video && (
          <div className="relative mt-4">
            <video
              src={video}
              controls
              className="w-full rounded-lg"
            />
            <Button
              size="icon"
              variant="destructive"
              className="absolute -top-2 -right-2 h-6 w-6"
              onClick={removeVideo}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}