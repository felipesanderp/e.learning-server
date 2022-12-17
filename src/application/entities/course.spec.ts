import { Course } from './course';
import { Description } from './description';

describe('Course', () => {
  it('should be able to create a course', () => {
    const course = new Course({
      title: 'title-example',
      description: new Description('course-description!'),
      slug: 'slug-example',
      imageURL: 'image-url-example',
    });

    expect(course).toBeTruthy();
  });
});
