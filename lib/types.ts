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
  visible: boolean;
};

export type Booking = {
  id: string;
  ref: string;
  serviceId: string;
  serviceName: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  note?: string;
  createdAt: number;
};

export type UserProfile = {
  uid: string;
  name: string;
  phone: string;
  email?: string;
  role: "customer" | "admin";
  createdAt: number;
};
