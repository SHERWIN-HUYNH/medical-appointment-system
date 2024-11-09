import { NextResponse } from 'next/server';
import { FacultyRepository } from '@/repositories/faculty';

export async function GET() {
  try {
    const faculties = await FacultyRepository.getFaculties();
    console.log('Fetched faculties:', faculties);

    // Kiểm tra và format dữ liệu trước khi trả về
    if (!faculties || faculties.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'NOT FOUND FACULTIES',
        data: [],
      });
    }

    // Đảm bảo trả về đúng format
    return NextResponse.json({
      success: true,
      data: faculties.map((faculty) => ({
        id: faculty.id,
        name: faculty.name,
        description: faculty.description,
        image: faculty.image,
      })),
    });
  } catch (error) {
    console.error('Error in faculty GET route:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
        data: [],
      },
      { status: 500 },
    );
  }
}
