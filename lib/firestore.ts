import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Service, Booking, UserProfile } from "./types";

// --- Services ---

export async function getServices(): Promise<Service[]> {
  const snap = await getDocs(collection(db, "services"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Service);
}

export async function getVisibleServices(): Promise<Service[]> {
  const q = query(collection(db, "services"), where("visible", "==", true));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Service);
}

export async function getService(id: string): Promise<Service | null> {
  const snap = await getDoc(doc(db, "services", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Service;
}

// --- Bookings ---

export async function getBookingsForCustomer(customerId: string): Promise<Booking[]> {
  const q = query(
    collection(db, "bookings"),
    where("customerId", "==", customerId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Booking);
}

export async function getBooking(id: string): Promise<Booking | null> {
  const snap = await getDoc(doc(db, "bookings", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Booking;
}

export async function createBooking(
  data: Omit<Booking, "id" | "ref" | "createdAt">
): Promise<string> {
  const ref = `KL-${Math.floor(1000 + Math.random() * 9000)}`;
  const docRef = await addDoc(collection(db, "bookings"), {
    ...data,
    ref,
    createdAt: Date.now(),
  });
  return docRef.id;
}

export async function updateBookingStatus(
  id: string,
  status: Booking["status"]
): Promise<void> {
  await updateDoc(doc(db, "bookings", id), { status });
}

// --- User Profiles ---

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return { uid: snap.id, ...snap.data() } as UserProfile;
}

export async function createOrUpdateUserProfile(
  uid: string,
  data: Partial<Omit<UserProfile, "uid">>
): Promise<void> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await updateDoc(ref, data);
  } else {
    const { setDoc } = await import("firebase/firestore");
    await setDoc(ref, {
      name: data.name || "",
      phone: data.phone || "",
      email: data.email || "",
      role: data.role || "customer",
      createdAt: Date.now(),
      ...data,
    });
  }
}
