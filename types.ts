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

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface SelectedAddOn {
  id: string;
  quantity: number;
}

export interface BookingDetails {
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  passengers: string; // Total count
  passengerCounts: {
    adults: number;
    children: number;
    infants: number;
  };
  bags: number;
  vehicleType: string;
  returnDate?: string;
  email: string;
  addOns: SelectedAddOn[];
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