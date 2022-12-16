import { CreateCourse } from './create-course';
import { InMemoryCoursesRepository } from '../../../test/repositories/in-memory-courses-repository';

describe('Create Course', () => {
  it('should be able to create a course', async () => {
    const coursesRepository = new InMemoryCoursesRepository();
    const createCourse = new CreateCourse(coursesRepository);

    const { course } = await createCourse.execute({
      title: 'title-example',
      slug: 'slug-example',
      description: 'description-example',
      imageURL: 'image-url-example',
    });

    expect(coursesRepository.courses).toHaveLength(1);
    expect(coursesRepository.courses[0]).toEqual(course);
  });
});
