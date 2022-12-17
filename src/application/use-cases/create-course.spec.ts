import { CreateCourse } from './create-course';
import { InMemoryCoursesRepository } from '../../../test/repositories/in-memory-courses-repository';
import { CourseAlreadyExists } from './errors/course-already-exists';
import { Description } from '@application/entities/description';

describe('Create Course', () => {
  it('should be able to create a course', async () => {
    const coursesRepository = new InMemoryCoursesRepository();
    const createCourse = new CreateCourse(coursesRepository);

    const { course } = await createCourse.execute({
      title: 'title-example',
      slug: 'slug-example',
      description: new Description('course-description'),
      imageURL: 'image-url-example',
    });

    expect(coursesRepository.courses).toHaveLength(1);
    expect(coursesRepository.courses[0]).toEqual(course);
  });

  it('should not be ale to create a course with a existing title', async () => {
    const coursesRepository = new InMemoryCoursesRepository();
    const createCourse = new CreateCourse(coursesRepository);

    expect(async () => {
      await createCourse.execute({
        title: 'title-example',
        slug: 'slug-example',
        description: new Description('course-description'),
        imageURL: 'image-url-example',
      });

      await createCourse.execute({
        title: 'title-example',
        slug: 'slug-example',
        description: new Description('course-description'),
        imageURL: 'image-url-example',
      });
    }).rejects.toThrow(CourseAlreadyExists);
  });
});
