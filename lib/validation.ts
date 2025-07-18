import { z } from 'zod'
export const UserLogin = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
})
export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
})
export const RegisterFormValidation = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
  // password: z.string().min(8, "Password must be at least 8 characters"),
})
export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
  birthDate: z.coerce.date(),
  gender: z.enum(['Male', 'Female', 'Other']),
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(500, 'Address must be at most 500 characters'),
  occupation: z
    .string()
    .min(2, 'Occupation must be at least 2 characters')
    .max(500, 'Occupation must be at most 500 characters'),
  emergencyContactName: z
    .string()
    .min(2, 'Contact name must be at least 2 characters')
    .max(50, 'Contact name must be at most 50 characters'),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      'Invalid phone number',
    ),
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  insuranceProvider: z
    .string()
    .min(2, 'Insurance name must be at least 2 characters')
    .max(50, 'Insurance name must be at most 50 characters'),
  insurancePolicyNumber: z
    .string()
    .min(2, 'Policy number must be at least 2 characters')
    .max(50, 'Policy number must be at most 50 characters'),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to treatment in order to proceed',
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to disclosure in order to proceed',
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to privacy in order to proceed',
    })
    .optional(),
})

export const FacultyFormValidation = z.object({
  name: z
    .string()
    .min(2, 'Faculty must be at least 2 characters')
    .max(50, 'Faculty must be at most 50 characters'),
  description: z
    .string()
    .min(1, "Description can't be empty")
    .max(500, 'Description must be at most 500 characters'),
  image: z.string().min(1, 'Vui lòng chọn ảnh chuyên khoa'),
})

export const DoctorFormValidation = z.object({
  name: z
    .string()
    .min(1, 'Tên không được để trống')
    .max(50, 'Tên bác sĩ phải không quá 50 kí tự')
    .refine((name) => /^[\p{L}\s]+$/u.test(name), 'Tên không được nhập ký tự đặc biệt'),
  image: z.string().min(1, 'Vui lòng chọn ảnh bác sĩ'),
  academicTitle: z.string().min(1, 'Học hàm/học vị không được để trống'),
  faculty: z.string().min(1, 'Chuyên khoa không được để trống'),
  description: z
    .string()
    .min(1, 'Mô tả không được để trống')
    .max(500, 'Mô tả chỉ được phép tối đa 500 ký tự'),
  isActive: z.boolean(),
  gender: z.boolean(),
})
export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, 'Reason must be at least 2 characters')
    .max(500, 'Reason must be at most 500 characters'),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
})

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
  service: z.string().optional(),
})

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, 'Reason must be at least 2 characters')
    .max(500, 'Reason must be at most 500 characters'),
})

export const createService = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  description: z.string().max(500, 'Description must be at most 500 characters'),
  price: z
    .string()
    .refine((price) => /^\d{1,10}(\.\d{1,2})?$/.test(price), 'Invalid price'),
  facultyId: z
    .string()
    .refine((value) => value !== '', { message: 'Please select a faculty' }),
})
export function getAppointmentSchema(type: string) {
  switch (type) {
    case 'create':
      return CreateAppointmentSchema
    case 'cancel':
      return CancelAppointmentSchema
    default:
      return ScheduleAppointmentSchema
  }
}
