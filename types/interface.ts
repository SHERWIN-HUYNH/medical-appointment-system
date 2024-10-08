export interface Profile {
    id: string; 
    name: string;
    birthday: Date; // Hoặc string tùy theo định dạng bạn sử dụng
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    email: string;
    phone: string;
    allergies ?:string;
    identificationType: string;
    identificationNumber: string;
    identificationDocumentUrl: string; // Hoặc URL kiểu string
    pastMedicalHistory : string; // Hoặc một kiểu dữ liệu khác nếu cần
  }