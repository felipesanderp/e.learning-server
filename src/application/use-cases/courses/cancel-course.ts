import { CoursesRepository } from '@application/repositories/courses-repository';
import { Injectable } from '@nestjs/common';
import { CourseNotFound } from '../errors/course-not-found';

type CancelCourseResponse = void;

@Injectable()
export class CancelCourse {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(courseId: string): Promise<CancelCourseResponse> {
    const course = await this.coursesRepository.findById(courseId);

    if (!course) {
      throw new CourseNotFound();
    }

    course.cancel();

    await this.coursesRepository.save(course);
  }
}
