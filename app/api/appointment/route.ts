import { AppointmentRepository } from '@/repositories/appointment'

export async function GET() {
  try {
    const appointments = await AppointmentRepository.getAllAppointments();
    return new Response(JSON.stringify(appointments), { status: 200 });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return new Response("Internal Server Error", { status: 500 });
  }  
}
