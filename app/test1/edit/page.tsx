'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Test2 = () => {
  const params = useSearchParams()

  return <div>Test2 {params.get('data')}</div>
}
export default Test2
