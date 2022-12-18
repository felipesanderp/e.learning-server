import { CoursesRepository } from '../../repositories/courses-repository';
import { Injectable } from '@nestjs/common';
import { Course } from '../../entities/course';

interface GetAllCoursesResponse {
  courses: Course[];
}

@Injectable()
export class GetAllCourses {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(): Promise<GetAllCoursesResponse> {
    const courses = await this.coursesRepository.findAllCourses();

    return {
      courses,
    };
  }
}
