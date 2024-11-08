import { badRequestResponse, notFoundResponse, successResponse } from "@/helpers/response";
import { DoctorRespository } from "@/repositories/doctor";

// Xử lý GET request - Lấy thông tin bác sĩ theo ID hoặc tất cả bác sĩ
export async function GET(context:any) {
    const doctors = await DoctorRespository.getDoctores(); // Fetch all doctors
    return successResponse(doctors);
}

// Xử lý POST request - Tạo bác sĩ mới
export async function POST(req: Request) {
    const doctorData = await req.json();
    if (!doctorData) {
        return badRequestResponse("MISSING DOCTOR DATA");
    }
    try {
        const newDoctor = await DoctorRespository.createDoctor(doctorData);
        return successResponse(newDoctor);
    } catch (error) {
        return badRequestResponse("FAIL TO CREATE DOCTOR");
    }
}

// Xử lý PUT request - Cập nhật thông tin bác sĩ theo ID
export async function PUT(req: Request) {
    const { doctor } = await req.json(); 
    const doctorData = await DoctorRespository.getDoctorById(doctor.id)
    if(!doctorData) {
        return notFoundResponse("DOCTOR NOT FOUND")
    }
    // Kiểm tra nếu đang chuyển trạng thái từ active sang inactive
    if (doctorData.isActive && !doctor.isActive) {
        const hasAppointments = await DoctorRespository.hasAppointments(doctor.id);
        if (hasAppointments) {
            return badRequestResponse("Bác sĩ này đang có cuộc hẹn không thể chuyển trạng thái");
        }
    }
    const updatedFaculty = await DoctorRespository.updateDoctor(doctor.id, doctor);
    if(!updatedFaculty) {
        return badRequestResponse("FAIL TO UPDATE DOCTOR")
    }
    return successResponse(updatedFaculty)
}

// Xử lý DELETE request - Xóa bác sĩ theo ID
export async function DELETE(req: Request) {
    const {doctor} = await req.json();
    try {
        const deletedDoctor = await DoctorRespository.deleteDoctor(doctor);
        return successResponse(deletedDoctor);
    } catch (error) {
        if (error instanceof Error) {
            return badRequestResponse(error.message);
        }
        return badRequestResponse("Lỗi khi xóa bác sĩ");
    }
}