import { CoursesRepository } from '@application/repositories/courses-repository';
import { Injectable } from '@nestjs/common';
import { CourseNotFound } from '../errors/course-not-found';

interface CancelCourseRequest {
  courseId: string;
}

type CancelCourseResponse = void;

@Injectable()
export class CancelCourse {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(request: CancelCourseRequest): Promise<CancelCourseResponse> {
    const { courseId } = request;

    const course = await this.coursesRepository.findById(courseId);

    if (!course) {
      throw new CourseNotFound();
    }

    course.cancel();

    await this.coursesRepository.save(course);
  }
}
