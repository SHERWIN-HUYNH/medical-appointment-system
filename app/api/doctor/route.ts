import { unauthorizedResponse } from "@/helpers/response";
import { getServerSession } from "next-auth";

export async function GET(request: Request){
    const session = await getServerSession();
    if(session && session.user){
        return new Response('OK YOU LOGGED IN')
    }
    return new Response('unauthorised',{status:401})
}
