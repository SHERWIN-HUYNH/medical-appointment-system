// pages/403.tsx
import Link from 'next/link'
import React from 'react'

const AccessDenied = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>403 - Forbidden</h1>
      <p>Bạn không có quyền truy cập vào trang này.</p>
      <Link href={'/'}>Quay lại trang chủ</Link>
    </div>
  )
}

export default AccessDenied
