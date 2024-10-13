import { stripe } from "@/lib/stripe";
import { useSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import Stripe from "stripe";
import { Appointment } from "@/types/interface";
import { AppointmentRepository } from "@/repositories/appointment";
import { ServiceRepository } from "@/repositories/service";
import { ProfileRespository } from "@/repositories/profile";
import { UserRepository } from "@/repositories/user";
import { userInfo } from "os";
import { NextResponse } from "next/server";


export async function POST(req:Request,context:any) {
    try {
        
        const {userId} = context.params
        console.log('APP RUN 0')
        // const body: Appointment = await req.json()
        if(!userId){
            throw new Response(JSON.stringify({message:"Unauthenticated"}),{status:401})
        }
        console.log('userId',userId)
        // Get appointment Infor
        // const profileInfor = await ProfileRespository.getProfileById(userId)
        // if(!profileInfor){
        //     throw new Response(JSON.stringify({message:"Unauthenticated"}),{status:401})
        // }
        //const serviceInfor = await ServiceRepository.getServicesById(body.serviceId)
        const userInfor = await UserRepository.getUserByUserId(userId)
        //const newAppointment = await AppointmentRepository.createAppointment(body)

        // Create new subscription
        const line_items:Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity: 1,
                price_data:{
                    currency: "usd",
                    product_data:{
                        name:"CHAU CHAU",
                        description:"NO DESCRIPTION",
                    },
                    unit_amount:Math.round(150000)
                }
                
            }
        ]
        console.log('APP RUN 1')
        let stripeCustomer = await prisma.stripeCustomer.findUnique({
            where:{
                stripeCustomerId:userInfor?.id
            },
            select:{
                stripeCustomerId:true
            }
        })
        console.log(stripeCustomer)
        if(!stripeCustomer) {
            // might get error for this email call
            const customer = await stripe.customers.create({
                email: userInfor?.email
            })
            console.log('customer',customer)
            console.log('APP RUN 2')
            stripeCustomer = await prisma.stripeCustomer.create({
                data: {
                    userId: userInfor?.id!,
                    stripeCustomerId: customer.id
                }
                })
            console.log('stripeCustomer',stripeCustomer)
        }
        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomer?.stripeCustomerId,
            line_items,
            mode: 'payment',
            success_url: `http://localhost:3000/patients/${userId}/new-appointment/success`,
            cancel_url: `http://localhost:3000`,
            metadata: {
                appointemntId: "53534sfsdf",
                userId: userInfor?.id!,
                servicePrice:150000
            }
        })
        console.log('session',session)
        console.log('APP RUN 3')
        return new Response(JSON.stringify({url:session.url}),{status:200})
    } catch (error) {
        console.log("[COURSE_ID_CHECKOUT]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
    
}
