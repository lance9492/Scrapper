"use client"

import { Marker, InfoWindow } from '@react-google-maps/api'
import { recyclers, type Recycler } from '@/lib/data/recyclers'
import { RecyclerInfoCard } from './recycler-info-card'

interface RecyclerMarkersProps {
  selectedRecycler: Recycler | null
  onSelectRecycler: (recycler: Recycler | null) => void
}

export function RecyclerMarkers({ selectedRecycler, onSelectRecycler }: RecyclerMarkersProps) {
  return (
    <>
      {recyclers.map((recycler) => (
        <Marker
          key={recycler.id}
          position={recycler.coordinates}
          onClick={() => onSelectRecycler(recycler)}
        />
      ))}

      {selectedRecycler && (
        <InfoWindow
          position={selectedRecycler.coordinates}
          onCloseClick={() => onSelectRecycler(null)}
        >
          <RecyclerInfoCard recycler={selectedRecycler} />
        </InfoWindow>
      )}
    </>
  )
}