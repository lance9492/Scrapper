// Department types
export interface Member {
  name: string;
  position: string;
  email: string;
  phone: string;
}

export interface Department {
  name: string;
  members: Member[];
}

// Material types
export interface MaterialType {
  name: string;
  description: string;
  price: string;
  grade: string;
}

export interface Material {
  name: string;
  description: string;
  image: string;
  types: MaterialType[];
}

// Recycler types
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Recycler {
  id: string;
  name: string;
  description: string;
  address: string;
  coordinates: Coordinates;
  materials: string[];
  phone: string;
  email: string;
  website?: string;
  verified: boolean;
}