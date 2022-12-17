import { Course, CourseProps } from '@application/entities/course';

type Override = Partial<CourseProps>;

export function makeNotification(override: Override = {}) {
  return new Course({
    title: 'title-example',
    slug: 'slug-example',
    description: 'description-example',
    imageURL: 'image-url-example',
    ...override,
  });
}
