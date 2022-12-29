import { Description } from '@application/entities/description';
import { makeCourse } from '@test/factories/course-factory';
import { InMemoryCoursesRepository } from '@test/repositories/in-memory-courses-repository';
import { CourseNotFound } from '../errors/course-not-found';
import { UpdateCourse } from './update-course';

describe('Update Course', () => {
  it('should be able to update a course', async () => {
    const coursesRepository = new InMemoryCoursesRepository();
    const updateCourse = new UpdateCourse(coursesRepository);

    const createCourse = makeCourse();

    await coursesRepository.create(createCourse);

    await updateCourse.execute({
      courseId: createCourse.id,
      course: {
        title: 'New Course Title',
        description: new Description('new-course-description'),
        imageURL: 'new-image-url',
      },
    });

    expect(coursesRepository.courses[0]).toEqual(
      expect.objectContaining({
        title: 'New Course Title',
        slug: 'new-course-title',
      }),
    );
  });

  it('should not be able to update a non existing Course', () => {
    const coursesRepository = new InMemoryCoursesRepository();
    const updateCourse = new UpdateCourse(coursesRepository);

    expect(async () => {
      await updateCourse.execute({
        courseId: 'fake-course-id',
        course: {},
      });
    }).rejects.toThrow(CourseNotFound);
  });
});
