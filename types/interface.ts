declare type Gender = 'MALE' | 'FEMALE' | 'OTHER';
declare type Status = 'PENDING' | 'SCHEDULED' | 'CANCELLED';
export interface Profile {
  id: string;
  name: string;
  birthday: Date;
  gender: Gender;
  email: string;
  phone: string;
  allergies?: string;
  identificationType: string;
  identificationNumber: string;
  identificationDocumentUrl: string;
  pastMedicalHistory: string;
}
export interface UserRole {
  id: string;
  name: string;
  email: string;
  roleName: string;
}

export interface Appointment {
  date: Date;
  timeSlots: string;
  profileId: string;
  doctorScheduleId: string;
  serviceId: string;
  reason: string;
  note: string;
  status: Status;
  cancellationReason: string;
}

export interface Faculty {
  id: string;
  name: string;
  description: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  facultyId: string;
  description: string;
}
export interface Schedule {
  id: string;
  date: string;
  timeSlot: string;
  isAvailable: boolean;
  doctorScheduleId: string;
}

export interface Comment {
  id: string;
  date: string;
  content: string;
  rating: number;
  doctorId: string;
  userId: string;
}

export interface Doctor {
  id: string;
  name: string;
  academicTitle: string;
  image: string;
  isActive: boolean;
  description: string;
  facultyId: string;
  comments: Comment[];
  doctorSchedule: Schedule[];
}
