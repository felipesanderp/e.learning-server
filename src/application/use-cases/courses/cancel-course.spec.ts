import { makeCourse } from '@test/factories/course-factory';
import { InMemoryCoursesRepository } from '@test/repositories/in-memory-courses-repository';
import { CourseNotFound } from '../errors/course-not-found';
import { CancelCourse } from './cancel-course';

describe('Cancel Course', () => {
  it('should be able to cancel a course', async () => {
    const coursesRepository = new InMemoryCoursesRepository();
    const cancelCourse = new CancelCourse(coursesRepository);

    const course = makeCourse();

    await coursesRepository.create(course);

    await cancelCourse.execute(course.id);

    expect(coursesRepository.courses[0].canceledAt).toEqual(expect.any(Date));
  });

  it('should not be able to cancel a non existing course', () => {
    const coursesRepository = new InMemoryCoursesRepository();
    const cancelCourse = new CancelCourse(coursesRepository);

    expect(() => {
      return cancelCourse.execute('fake-course-id');
    }).rejects.toThrow(CourseNotFound);
  });
});
