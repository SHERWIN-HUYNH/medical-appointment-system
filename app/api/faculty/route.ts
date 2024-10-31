import { badRequestResponse, notFoundResponse, successResponse } from "@/helpers/response";
import prisma from "@/lib/prisma";
import { FacultyRepository } from "@/repositories/faculty";
import { ServiceRepository } from "@/repositories/service";
import { Faculty } from "@/types/interface";

export async function GET() {
    const faculties = await FacultyRepository.getFaculties();
    if(!faculties){
        return notFoundResponse("NOT FOUND FACULTIES");
    }
    return successResponse(faculties);
}

export async function POST(req: Request) {
    const faculty = await req.json(); 

    if (!faculty) {
        return badRequestResponse("MISSING SERVICE DATA");
    }

    const newService = await FacultyRepository.createFaculty(faculty);

    if (!newService) {
        return badRequestResponse("FAIL TO CREATE SERVICE");
    }

    return successResponse(newService);
}

export async function PUT(req: Request) {
    const { faculty } = await req.json();
    const facultyData = await FacultyRepository.getFacultyById(faculty.id);
    if(!facultyData){
        return notFoundResponse("NOT FOUND FACULTY");
    }
    const updatedFaculty = await FacultyRepository.updateFaculty(faculty,facultyData.id);
    if(!updatedFaculty){
        return badRequestResponse("FAIL TO UPDATE FACULTY");
    }
    return successResponse(updatedFaculty);
}
export async function DELETE(req: Request) {
    const { faculty } = await req.json();
    const deletedFaculty = await FacultyRepository.deleteFaculty(faculty);
    if(!deletedFaculty){
        return badRequestResponse("FAIL TO DELETE FACULTY");
    }
    return successResponse(deletedFaculty);
}