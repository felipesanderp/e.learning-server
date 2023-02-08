import { Course, CourseProps } from '@application/entities/course';
import { Description } from '@application/entities/description';

type Override = Partial<CourseProps>;

export function makeCourse(override: Override = {}) {
  return new Course({
    title: 'title-example',
    slug: 'slug-example',
    description: new Description('course-description'),
    imageURL: 'image-url-example',
    isAvailable: true,
    canceledAt: null,
    ...override,
  });
}
