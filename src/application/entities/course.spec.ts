import { Course } from './course';

describe('Course', () => {
  it('should be able to create a course', () => {
    const course = new Course({
      title: 'title-example',
      description: 'description-example',
      slug: 'slug-example',
      imageURL: 'image-url-example',
    });

    expect(course).toBeTruthy();
  });
});
