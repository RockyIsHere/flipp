import { adminDb } from "./firebase-admin";
import type { Service, Booking } from "./types";

// --- Bookings (Admin) ---

export async function getAllBookings(): Promise<Booking[]> {
  const snap = await adminDb
    .collection("bookings")
    .orderBy("createdAt", "desc")
    .get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Booking);
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const snap = await adminDb.collection("bookings").doc(id).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() } as Booking;
}

export async function updateBookingStatusAdmin(
  id: string,
  status: Booking["status"]
): Promise<void> {
  await adminDb.collection("bookings").doc(id).update({ status });
}

// --- Services (Admin) ---

export async function getAllServices(): Promise<Service[]> {
  const snap = await adminDb.collection("services").get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Service);
}

export async function createService(
  data: Omit<Service, "id">
): Promise<string> {
  const docRef = await adminDb.collection("services").add(data);
  return docRef.id;
}

export async function updateService(
  id: string,
  data: Partial<Omit<Service, "id">>
): Promise<void> {
  await adminDb.collection("services").doc(id).update(data);
}

export async function deleteService(id: string): Promise<void> {
  await adminDb.collection("services").doc(id).delete();
}
