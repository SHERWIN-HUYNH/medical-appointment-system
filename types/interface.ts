declare type Gender = "MALE" | "FEMALE" | "OTHER";
declare type Status = "PENDING" | "SCHEDULED" | "CANCELLED";
export interface Profile {
    id: string; 
    name: string;
    birthday: Date; // Hoặc string tùy theo định dạng bạn sử dụng
    gender: Gender;
    email: string;
    phone: string;
    allergies ?:string;
    identificationType: string;
    identificationNumber: string;
    identificationDocumentUrl: string; // Hoặc URL kiểu string
    pastMedicalHistory : string; // Hoặc một kiểu dữ liệu khác nếu cần
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

export interface Faculty{
    id:string,
    name: string;
    description: string;
}

export interface Service{
    id:string,
    name: string;
    price: number;
    facultyId: string;
    description: string;
}
export interface Schedule{
  id:string,
  date: string;
  timeSlot: string;
  isAvailable: boolean;
  doctorScheduleId: string;
}