'use client'
import React, { FormEvent, useState } from 'react'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { UserRound } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Button } from './ui/button'
import { formatPrice } from '@/helpers/formatCurrency'
import { useSession } from 'next-auth/react'
import { Doctor, Faculty, Profile, Schedule, Service } from '@prisma/client'

type AppointmentInfor = {
  profile: Profile
  service: Service
  doctor: Doctor
  schedule: Schedule
  faculty: Faculty
}
type CheckoutFormProps = {
  clientSecret: string
  product: object
  searchParams: AppointmentInfor
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY as string)
export function CheckoutForm({ clientSecret, searchParams }: CheckoutFormProps) {
  if (clientSecret == '') return <h1>Chưa có sản phẩm</h1>

  return (
    <div className="mx-auto card-container animation">
      <div className="reset-css card basis-1/4 gap-y-5 max-w-1/4">
        <div>
          <h1 className="card-header">Thông tin bệnh nhân</h1>
          <ul className="card-body">
            <li className="card-item">
              <p className="mt-[6px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-user"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                </svg>
              </p>
              <p className="mt-1">{searchParams.profile.name}</p>
            </li>
            <li className="card-item">
              <p className="mt-[6px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-smartphone"
                >
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                </svg>
              </p>
              <p className="mt-1">{searchParams.profile.phone}</p>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="card-header">Thông tin cơ sở y tế</h1>
          <ul className="card-body">
            <li className="card-item">
              <p className="mt-[6px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-user"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                </svg>
              </p>
              <p className="mt-1">
              Bệnh viện Đại học Y Dược TP.HCM<br></br>
                <span className="text-[#8a8a8a]">
                215 Đ. Hồng Bàng, Phường 11, Quận 5, Hồ Chí Minh
                </span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="reset-css card basis-3/4 max-w-3/4 bg-white">
        <h1 className="card-header">Thông tin thanh toán</h1>
        <div className="flex items-start justify-between">
          <div className="card-body card basis-1/2 max-w-1/2 bg-white h-full">
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <Form price={searchParams.service.price.toString()} />
            </Elements>
          </div>
          <div className="card-body card basis-1/2 max-w-1/2 bg-white">
            <Card className="mb-3 rounded-lg border-none">
              <CardHeader>
                <div className="flex items-center">
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide text-primary lucide-id-card"
                    >
                      <path d="M16 10h2" />
                      <path d="M16 14h2" />
                      <path d="M6.17 15a3 3 0 0 1 5.66 0" />
                      <circle cx="9" cy="11" r="2" />
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                    </svg>
                  </p>
                  <h1 className="font-semibold text-primary text-2xl">
                    Thông tin thanh toán
                  </h1>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="px-2 py-3">
                  <li className="list-item-payment -mt-4">
                    <div className="flex items-start gap-x-2">
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-stethoscope text-iconGray"
                        >
                          <path d="M11 2v2" />
                          <path d="M5 2v2" />
                          <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
                          <path d="M8 15a6 6 0 0 0 12 0v-3" />
                          <circle cx="20" cy="10" r="2" />
                        </svg>
                      </p>
                      <p className="highlight-text">Chuyên khoa</p>
                    </div>
                    <p className="li-payment-center">{searchParams.faculty.name}</p>
                  </li>
                  <li className="list-item-payment">
                    <div className="flex items-center gap-x-2">
                      <p className='text-iconGray'>
                        <UserRound />
                      </p>
                      <p className="highlight-text">Bác sĩ</p>
                    </div>
                    <p className="li-payment-center">{searchParams.doctor.name}</p>
                  </li>
                  <li className="list-item-payment">
                    <div className="flex items-center gap-x-2">
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-stethoscope text-iconGray"
                        >
                          <path d="M11 2v2" />
                          <path d="M5 2v2" />
                          <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
                          <path d="M8 15a6 6 0 0 0 12 0v-3" />
                          <circle cx="20" cy="10" r="2" />
                        </svg>
                      </p>
                      <p className="highlight-text">Dịch vụ</p>
                    </div>
                    <p className="li-payment-center">{searchParams.service.name}</p>
                  </li>
                  <li className="list-item-payment">
                    <div className="flex items-center gap-x-2">
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-stethoscope text-iconGray"
                        >
                          <path d="M11 2v2" />
                          <path d="M5 2v2" />
                          <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
                          <path d="M8 15a6 6 0 0 0 12 0v-3" />
                          <circle cx="20" cy="10" r="2" />
                        </svg>
                      </p>
                      <p className="highlight-text">Ngày khám</p>
                    </div>
                    <p className="li-payment-center">{searchParams.schedule.date}</p>
                  </li>
                  <li className="list-item-payment">
                    <div className="flex items-center gap-x-2">
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-stethoscope text-iconGray"
                        >
                          <path d="M11 2v2" />
                          <path d="M5 2v2" />
                          <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
                          <path d="M8 15a6 6 0 0 0 12 0v-3" />
                          <circle cx="20" cy="10" r="2" />
                        </svg>
                      </p>
                      <p className="highlight-text">Giờ khám</p>
                    </div>
                    <p className="li-payment-center">{searchParams.schedule.timeSlot}</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function Form({ price }: { price: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const [errorMessage, setErrorMessage] = useState<string>()
  const handleSumit = (e: FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }
    setIsLoading(true)
    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/appointment/success/${session?.user.id}`,
        },
      })
      .then(({ error }) => {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          console.log(error)
          setErrorMessage(error.message)
        } else {
          setErrorMessage('An unknown error occurred')
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <form onSubmit={handleSumit}>
      <Card className="mb-3 rounded-lg border border-solid border-[#00e0ff]">
        <CardHeader>
          <CardTitle className="font-semibold text-primary text-2xl">
            Thông tin thẻ
          </CardTitle>
          {errorMessage && (
            <CardDescription className="text-destructive">{errorMessage}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <PaymentElement />
        </CardContent>
        <CardFooter>
          <Button className="text-white" disabled={!stripe || !elements}>
            {' '}
            {isLoading ? 'Đang thực hiện...' : `Thanh toán - ${formatPrice(price)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
