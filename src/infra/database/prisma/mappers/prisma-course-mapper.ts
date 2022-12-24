import { Courses as RawCourses } from '@prisma/client';
import { Course } from '@application/entities/course';
import { Description } from '@application/entities/description';

export class PrismaCourseMapper {
  static toPrisma(course: Course) {
    return {
      id: course.id,
      title: course.title,
      slug: course.slug,
      description: course.description,
      imageURL: course.imageURL,
      createdAt: course.createdAt,
    };
  }

  static toDomain(raw: RawCourses) {
    return new Course(
      {
        title: raw.title,
        slug: raw.slug,
        imageURL: raw.imageURL,
        description: new Description(raw.description),
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
