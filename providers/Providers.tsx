'use client'
import React, { FC, ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
interface Props {
  children: ReactNode
}
const Providers: FC<Props> = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default Providers
