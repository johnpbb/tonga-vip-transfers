export interface Vehicle {
  id: string;
  name: string;
  type: string;
  passengers: number;
  luggage: number;
  image: string;
  priceStart: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
}

export interface BookingDetails {
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  passengers: string;
  vehicleType: string;
}

export enum ChatRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  role: ChatRole;
  text: string;
  isError?: boolean;
}