import { InMemoryCoursesRepository } from '@test/repositories/in-memory-courses-repository';
import { CourseNotFound } from '../errors/course-not-found';
import { CreateCourse } from './create-course';
import { RemoveCourse } from './remove-course';

describe('Remove Course', () => {
  it('should be able to remove a course', async () => {
    const coursesRepository = new InMemoryCoursesRepository();
    const createCourse = new CreateCourse(coursesRepository);
    const removeCourse = new RemoveCourse(coursesRepository);

    const { course } = await createCourse.execute({
      title: 'title-example-1',
      slug: 'slug-example',
      description: 'course-description',
      imageURL: 'image-url-example',
    });

    await removeCourse.execute(course.id);

    expect(coursesRepository.courses).toHaveLength(0);
  });

  it('should not be able to remove a course that does not exist', async () => {
    const coursesRepository = new InMemoryCoursesRepository();
    const removeCourse = new RemoveCourse(coursesRepository);

    const fakeId = 'fake-course-id';

    expect(async () => {
      await removeCourse.execute(fakeId);
    }).rejects.toThrow(CourseNotFound);
  });
});
