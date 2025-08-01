export const academicTitles = [
  { id: 'acd01', name: 'Thạc sĩ' },
  { id: 'acd02', name: 'Tiến sĩ' },
  { id: 'acd03', name: 'Giáo sư' },
]

export const bills = [
  {
    id: 1,
    createAt: '2024-10-01',
    amount: '1,000,000 VND',
    paymentMethod: 'VietinBank',
    note: 'Thanh toán viện phí',
    status: 1,
    appointmentId: 'A12345',
    userId: 'U001',
  },
  {
    id: 2,
    createAt: '2024-09-15',
    amount: '500,000 VND',
    paymentMethod: 'ZaloPay',
    note: 'Thanh toán thuốc',
    status: 0,
    appointmentId: 'A12346',
    userId: 'U002',
  },
  {
    id: 3,
    createAt: '2024-09-20',
    amount: '700,000 VND',
    paymentMethod: 'VNPay',
    note: 'Phí dịch vụ',
    status: 1,
    appointmentId: 'A12347',
    userId: 'U003',
  },
  {
    id: 4,
    createAt: '2024-08-25',
    amount: '300,000 VND',
    paymentMethod: 'MB Bank',
    note: 'Phí xét nghiệm',
    status: 1,
    appointmentId: 'A12348',
    userId: 'U004',
  },
  {
    id: 5,
    createAt: '2024-08-10',
    amount: '1,500,000 VND',
    paymentMethod: 'PayPal',
    note: 'Thanh toán viện phí',
    status: 1,
    appointmentId: 'A12349',
    userId: 'U005',
  },
]

export const userData = [
  {
    id: 'U001',
    name: 'Nguyễn Quỳnh',
    password: 'password123',
    phone: '0123456789',
    email: 'nguyenvana@example.com',
    roleName: 'Admin',
  },
  {
    id: 'U002',
    name: 'Ngô Thị Duyên',
    password: 'password456',
    phone: '0987654321',
    email: 'tranthib@example.com',
    roleName: 'User',
  },
  {
    id: 'U003',
    name: 'Huỳnh Chí Trung',
    password: 'password789',
    phone: '0901234567',
    email: 'phamvanc@example.com',
    roleName: 'Moderator',
  },
  {
    id: 'U004',
    name: 'Lê Thị D',
    password: 'password101',
    phone: '0912345678',
    email: 'lethid@example.com',
    roleName: 'User',
  },
  {
    id: 'U005',
    name: 'Hoàng Văn E',
    password: 'password202',
    phone: '0923456789',
    email: 'hoangvane@example.com',
    roleName: 'Admin',
  },
]
