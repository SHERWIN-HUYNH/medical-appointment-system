'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

const Test = () => {
    const {data:session} = useSession()

  return (
    <div className=' text-red-50'>Test {JSON.stringify(session)}</div>
  )
}

export default Test