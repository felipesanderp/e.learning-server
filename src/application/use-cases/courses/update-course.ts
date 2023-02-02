import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { Course } from '@application/entities/course';
import { Description } from '@application/entities/description';
import { CoursesRepository } from '@application/repositories/courses-repository';

import { CourseNotFound } from '../errors/course-not-found';

interface UpdateCourseResponse {
  course: Course;
}

interface UpdateCourseRequest {
  course: {
    title?: string;
    description?: string;
    imageURL?: string;
  };
  courseId: string;
}

@Injectable()
export class UpdateCourse {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(request: UpdateCourseRequest): Promise<UpdateCourseResponse> {
    const { course, courseId } = request;

    const findCourse = await this.coursesRepository.findById(courseId);

    if (!findCourse) throw new CourseNotFound();

    if (course.title) findCourse.title = course.title;
    if (course.title) findCourse.slug = slugify(course.title, { lower: true });
    if (course.description)
      findCourse.description = new Description(course.description);
    if (course.imageURL) findCourse.imageURL = course.imageURL;

    await this.coursesRepository.save(findCourse);

    return {
      course: findCourse,
    };
  }
}
