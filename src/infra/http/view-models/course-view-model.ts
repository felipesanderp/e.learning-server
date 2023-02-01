import { Course } from '@application/entities/course';

export class CourseViewModel {
  static toHTTP(course: Course) {
    return {
      id: course.id,
      title: course.title,
      slug: course.slug,
      description: course.description,
      imageURL: course.imageURL,
      isAvailable: course.isAvailable,
      canceledAt: course.canceledAt,
    };
  }
}
