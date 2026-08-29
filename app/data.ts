export type Service = {
  id: string;
  name: string;
  duration: string;
  durationMin: number;
  description: string;
  longDescription?: string;
  price: number;
  category: "hair" | "beard" | "skin";
  included?: string[];
};

export const services: Service[] = [
  {
    id: "haircut",
    name: "Haircut",
    duration: "45 min",
    durationMin: 45,
    description: "with any stylist",
    longDescription: "Consultation, wash, cut and finish. Clippers or scissors — tell your stylist on the chair.",
    price: 500,
    category: "hair",
    included: ["Shampoo and scalp rinse", "Neck shave and line-up", "Styling with product"],
  },
  {
    id: "beard-trim",
    name: "Beard trim",
    duration: "20 min",
    durationMin: 20,
    description: "shape & line-up",
    price: 200,
    category: "beard",
  },
  {
    id: "hot-towel-shave",
    name: "Hot towel shave",
    duration: "30 min",
    durationMin: 30,
    description: "straight razor",
    longDescription: "Straight razor, hot towel, aftershave balm.",
    price: 300,
    category: "beard",
  },
  {
    id: "hair-colour",
    name: "Hair colour",
    duration: "90 min",
    durationMin: 90,
    description: "consult included",
    price: 1500,
    category: "hair",
  },
  {
    id: "facial",
    name: "Facial",
    duration: "50 min",
    durationMin: 50,
    description: "deep cleanse",
    price: 800,
    category: "skin",
  },
  {
    id: "kids-cut",
    name: "Kids cut",
    duration: "30 min",
    durationMin: 30,
    description: "hidden",
    price: 250,
    category: "hair",

  },
];

export type Booking = {
  id: string;
  ref: string;
  service: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  customer: string;
  phone: string;
};

export const bookings: Booking[] = [
  { id: "1", ref: "KL-2481", service: "Haircut", date: "Fri 29 Aug", time: "15:30", duration: "45 min", price: 500, status: "confirmed", customer: "Ana Reyes", phone: "+91 98765 43210" },
  { id: "2", ref: "KL-2482", service: "Beard trim", date: "Sat 06 Sep", time: "11:15", duration: "20 min", price: 200, status: "pending", customer: "Ana Reyes", phone: "+91 98765 43210" },
  { id: "3", ref: "KL-2477", service: "Hot towel shave", date: "Fri 08 Aug", time: "18:30", duration: "30 min", price: 300, status: "completed", customer: "Ana Reyes", phone: "+91 98765 43210" },
  { id: "4", ref: "KL-2470", service: "Facial", date: "Wed 23 Jul", time: "10:30", duration: "50 min", price: 800, status: "cancelled", customer: "Ana Reyes", phone: "+91 98765 43210" },
];

export type AdminBooking = {
  id: string;
  ref: string;
  time: string;
  customer: string;
  service: string;
  duration: string;
  price: number;
  status: "confirmed" | "pending" | "completed" | "cancelled" | "now";
  phone?: string;
  note?: string;
};

export const todaySchedule: AdminBooking[] = [
  { id: "a1", ref: "KL-2475", time: "09:45", customer: "Jonah Weber", service: "Haircut", duration: "45 min", price: 500, status: "completed" },
  { id: "a2", ref: "KL-2476", time: "11:15", customer: "Priya Anand", service: "Hair colour", duration: "90 min", price: 1500, status: "completed" },
  { id: "a3", ref: "KL-2477", time: "13:30", customer: "Lena Ott", service: "Facial", duration: "50 min", price: 800, status: "cancelled", phone: "+91 99876 54321" },
  { id: "a4", ref: "KL-2481", time: "15:30", customer: "Ana Reyes", service: "Haircut", duration: "45 min", price: 500, status: "confirmed", phone: "+91 98765 43210" },
  { id: "a5", ref: "KL-2483", time: "16:15", customer: "Tom Elias", service: "Hot towel shave", duration: "30 min", price: 300, status: "confirmed" },
  { id: "a6", ref: "KL-2484", time: "17:00", customer: "Ana Reyes", service: "Beard trim", duration: "20 min", price: 200, status: "pending", phone: "+91 98765 43210", note: "Keep the length on top, tighter on the sides than last time." },
];
