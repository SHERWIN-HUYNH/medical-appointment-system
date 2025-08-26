'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import Providers from '@/providers/Providers'
import React from 'react'
import { AppointmentProvider } from '@/context/AppointmentContext'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <title>Health Care</title>
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={inter.className}>
          <Providers>
            <AppointmentProvider>{children}</AppointmentProvider>
            <Toaster richColors position="top-right" closeButton duration={5000} />
          </Providers>
      </body>
    </html>
  )
}
