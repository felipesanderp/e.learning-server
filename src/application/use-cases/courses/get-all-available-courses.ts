import { CoursesRepository } from '../../repositories/courses-repository';
import { Injectable } from '@nestjs/common';
import { Course } from '../../entities/course';

interface GetAllAvailableCoursesResponse {
  courses: Course[];
}

@Injectable()
export class GetAllAvailableCourses {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(): Promise<GetAllAvailableCoursesResponse> {
    const courses = await this.coursesRepository.findAllAvailableCourses();

    return {
      courses,
    };
  }
}
