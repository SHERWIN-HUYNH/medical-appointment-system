declare type Gender = 'MALE' | 'FEMALE' | 'OTHER';
declare type Status = 'PENDING' | 'SCHEDULED' | 'CANCELLED';
export interface Profile {
    id: string; 
    name: string;
    birthDate?: Date; 
    gender: Gender;
    email: string;
    phone: string;
    allergies ?:string;
    identificationType: string;
    identificationNumber: string;
    identificationDocumentUrl: string; 
    pastMedicalHistory : string; 
  }
  export interface UserRole {
    id: string;
    name: string;
    email: string;
    roleName: string;
  }

export interface Appointment {
  profileId: string;
  doctorScheduleId: string;
  serviceId: string;
  note: string;
  status: Status;
  cancellationReason: string;
}
export interface CreateAppointment{
  profileId: string;
  doctorScheduleId: string;
  serviceId: string;
}

export interface Faculty {
  id: string;
  name: string;
  description: string;
  image: string;
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
  description?: string;
  image?: string;
  facultyId: string;
  isActive: boolean;
  faculty?: {
    name: string;
  };
  comments: Comment[];
  doctorSchedule: Schedule[];
}
export interface Bill {
  id?: string;
  price: number;
  appointmentId: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
  paymentMethod?: string;
  note?: string;
}
