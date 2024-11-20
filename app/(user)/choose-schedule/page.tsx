'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const ChooseSchedule = () => {
  const params = useSearchParams()
  const value = params.get('value')
  return <div>ChooseSchedule {value}</div>
}

export default ChooseSchedule
