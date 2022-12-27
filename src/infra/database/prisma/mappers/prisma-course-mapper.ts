import { Courses as RawCourses } from '@prisma/client';
import { Course } from '@application/entities/course';
import { Description } from '@application/entities/description';
import slugify from 'slugify';

export class PrismaCourseMapper {
  static toPrisma(course: Course) {
    return {
      id: course.id,
      title: course.title,
      slug: course.slug,
      description: course.description.value,
      imageURL: course.imageURL,
      canceledAt: course.canceledAt,
      createdAt: course.createdAt,
    };
  }

  static toDomain(raw: RawCourses) {
    const slug = slugify(raw.title, { lower: true });

    return new Course(
      {
        title: raw.title,
        slug,
        imageURL: raw.imageURL,
        description: new Description(raw.description),
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
