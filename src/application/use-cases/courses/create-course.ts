import { CoursesRepository } from '../../repositories/courses-repository';
import { Injectable } from '@nestjs/common';
import { Course } from '../../entities/course';
import { CourseAlreadyExists } from '../errors/course-already-exists';
import { Description } from '@application/entities/description';
import slugify from 'slugify';

interface CreateCourseRequest {
  title: string;
  slug?: string;
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
    const { title, description, imageURL } = request;

    const slug = slugify(title, { lower: true });

    const courseAlreadyExists = await this.coursesRepository.findByTitle(title);

    if (courseAlreadyExists) {
      throw new CourseAlreadyExists();
    }

    const course = new Course({
      title,
      slug,
      description: new Description(description),
      imageURL,
    });

    await this.coursesRepository.create(course);

    return {
      course,
    };
  }
}
