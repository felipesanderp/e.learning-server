import { CoursesRepository } from '@application/repositories/courses-repository';
import { Injectable } from '@nestjs/common';
import { CourseNotFound } from '../errors/course-not-found';

type RemoveCourseResponse = void;

@Injectable()
export class RemoveCourse {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(id: string): Promise<RemoveCourseResponse> {
    const courseExists = await this.coursesRepository.findById(id);

    if (!courseExists) {
      throw new CourseNotFound();
    }

    await this.coursesRepository.remove(courseExists.id);
  }
}
