"use client"

import { useState, useCallback } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { type Recycler } from '@/lib/types'
import { RecyclerInfoCard } from './recycler-info-card'
import { recyclers } from '@/lib/data/recyclers'

const mapContainerStyle = {
  width: '100%',
  height: '600px'
}

const defaultCenter = {
  lat: -29.0,
  lng: 24.0
}

const mapStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  }
]

// Only load required libraries
const libraries: ("places" | "geometry")[] = ["places"]

export function RecyclersMap() {
  const [selectedRecycler, setSelectedRecycler] = useState<Recycler | null>(null)
  const [mapLoadError, setMapLoadError] = useState<string | null>(null)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  const handleLoadError = useCallback(() => {
    setMapLoadError("Failed to load Google Maps. Please try again later.")
  }, [])

  if (!apiKey) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-muted">
        <p className="text-muted-foreground text-center">
          Google Maps API key is not configured.
          <br />
          Please contact the administrator.
        </p>
      </div>
    )
  }

  if (mapLoadError) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-muted">
        <p className="text-muted-foreground text-center">{mapLoadError}</p>
      </div>
    )
  }

  return (
    <LoadScript 
      googleMapsApiKey={apiKey}
      libraries={libraries}
      onError={handleLoadError}
      loadingElement={
        <div className="h-[600px] flex items-center justify-center bg-muted">
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      }
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={6}
        options={{ 
          styles: mapStyles,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          gestureHandling: 'cooperative',
          maxZoom: 16,
          minZoom: 5
        }}
      >
        {recyclers.map((recycler) => (
          <Marker
            key={recycler.id}
            position={recycler.coordinates}
            onClick={() => setSelectedRecycler(recycler)}
            title={recycler.name}
          />
        ))}

        {selectedRecycler && (
          <InfoWindow
            position={selectedRecycler.coordinates}
            onCloseClick={() => setSelectedRecycler(null)}
          >
            <RecyclerInfoCard recycler={selectedRecycler} />
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}