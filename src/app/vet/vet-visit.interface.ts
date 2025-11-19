export interface VetVisit {
  id: string; // Frontend uses 'id' for tracking/editing/deleting
  _id?: string; // Backend returns this
  petId: string;
  date: string;           // ISO date string
  reason: string;
  vetName: string;
  diagnosis: string;
  treatment: string;
  nextAppointment?: string; // ISO date string
  createdAt: string;
  updatedAt: string;
}
