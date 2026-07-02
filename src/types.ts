export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'multi-cuisine' | 'bakery' | 'cafe' | 'fast-food';
  image: string;
  isVeg: boolean;
  isEggless: boolean;
  isBestSeller?: boolean;
}

export interface Branch {
  id: 'sardarpura' | 'bhadwasiya' | 'paota';
  name: string;
  address: string;
  phone: string;
  mapEmbedUrl: string;
  mapLink: string;
  timings: string;
  images: string[];
  features: string[];
}

export interface Review {
  id: string;
  reviewerName: string;
  avatarUrl?: string;
  rating: number;
  timeAgo: string;
  context?: string; // e.g. "Dine in, Dinner, ₹200–400"
  reviewText: string;
  imagesCount?: number;
  isLocalGuide?: boolean;
  reviewsCount?: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'food' | 'bakery' | 'rooftop' | 'ambience' | 'events';
  image: string;
  author?: string;
}

export interface BookingData {
  location: 'sardarpura' | 'bhadwasiya' | 'paota';
  date: string;
  time: string;
  guests: number;
  seatingPreference: 'rooftop' | 'open-air' | 'indoor' | 'party-hall';
  occasion?: string;
  name: string;
  phone: string;
  email: string;
}
