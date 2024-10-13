import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { buffer } from 'micro'; 
export async function POST(req: Request) {
    const body = await req.text()
    const sig = req.headers.get("Stripe-Signature") as string;
    let event:Stripe.Event;
    
    console.log('Received Body:', body);  // Log the raw body
    console.log('Received Signature:', sig); // Log the signature
    try {
        console.log('WEBHOOK EVENT',process.env.STRIPE_WEBHOOK_SECRET!)
        event = stripe.webhooks.constructEvent(body, sig,process.env.STRIPE_WEBHOOK_SECRET!);
        console.log('WEBHOOK EVENT',process.env.STRIPE_WEBHOOK_SECRET!)
    }catch (err) {
        console.log('ERROR',err)
        return new Response("Webhook Error", { status: 400 });
    }
    console.log('STEP 2')
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const appointmentId = session?.metadata?.appointmentId;
    const price = session?.metadata?.price;
    console.log('WEBHOOK',userId,appointmentId,price)
    if(event.type === "checkout.session.completed"){
        if(!userId || !appointmentId || !price){
            
            return new Response("Webhook Error", { status: 400 });
    };
    await prisma.bill.create({
        data:{
            userId,
            appointmentId,
            amount:parseInt(price, 10),
            status:"COMPLETED",
            paymentMethod:"STRIPE",
            note:"Stripe payment",
        }
    })
}
}