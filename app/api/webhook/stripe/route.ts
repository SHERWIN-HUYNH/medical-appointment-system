import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { Resend } from 'resend';
import prisma from "@/lib/prisma";
import { DoctorRespository } from "@/repositories/doctor";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
const resend = new Resend(process.env.RESEND_API_KEY as string)

export async function POST(req: NextRequest) {
    const event = await stripe.webhooks.constructEvent(
      await req.text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
    console.log('STRIPE WEBHOOK', event)
    if (event.type === "charge.succeeded") {
      const charge = event.data.object
      const appointmentId = charge.metadata.appointmentId
      const email = charge.billing_details.email
      const pricePaidInCents = charge.amount
      console.log('ALL INFOR ABOUT CHArge',charge)

      await resend.emails.send({
        from: "huynhchitrung020503@gmail.com",
        to: "n21dccn191@student.ptithcm.edu.vn",
        subject: "Order Confirmation",
        html: `<p>Thanks for your order!</p>`,
        
      })
      // await resend.emails.send({
      //   from: `Support <${process.env.SENDER_EMAIL}>`,
      //   to: email,
      //   subject: "Order Confirmation",
      //   html: `<p>Thanks for your order!</p>`,
      //   // react: (
      //   //   <PurchaseReceiptEmail
      //   //     order={order}
      //   //     product={product}
      //   //     downloadVerificationId={downloadVerification.id}
      //   //   />
      //   // ),
      // })
    }
    
    return new NextResponse()
  }