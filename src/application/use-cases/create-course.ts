import { CoursesRepository } from '../repositories/courses-repository';
import { Injectable } from '@nestjs/common';
import { Course } from '../entities/course';

interface CreateCourseRequest {
  title: string;
  slug: string;
  description: string;
  imageURL: string;
}

interface CreateCourseResponse {
  course: Course;
}

@Injectable()
export class CreateCourse {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(request: CreateCourseRequest): Promise<CreateCourseResponse> {
    const { title, slug, description, imageURL } = request;

    const course = new Course({
      title,
      slug,
      description,
      imageURL,
    });

    await this.coursesRepository.create(course);

    return {
      course,
    };
  }
}
