import { CoursesRepository } from '../../repositories/courses-repository';
import { Injectable } from '@nestjs/common';
import { Course } from '../../entities/course';
import { CourseNotFound } from '../errors/course-not-found';

interface GetAllAvailableCoursesResponse {
  courses: Course[];
}

@Injectable()
export class GetAllAvailableCourses {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(): Promise<GetAllAvailableCoursesResponse> {
    const courses = await this.coursesRepository.findAllAvailableCourses();

    if (!courses) {
      throw new CourseNotFound();
    }

    return {
      courses,
    };
  }
}
