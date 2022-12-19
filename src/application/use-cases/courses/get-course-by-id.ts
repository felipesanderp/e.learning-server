import { Course } from '@application/entities/course';
import { CoursesRepository } from '@application/repositories/courses-repository';
import { Injectable } from '@nestjs/common';
import { CourseNotFound } from '../errors/course-not-found';

interface GetCourseByIdResponse {
  course: Course;
}

@Injectable()
export class GetCourseById {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(id: string): Promise<GetCourseByIdResponse> {
    const course = await this.coursesRepository.findById(id);

    if (!course) {
      throw new CourseNotFound();
    }

    return {
      course,
    };
  }
}
