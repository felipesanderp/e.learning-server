import { InMemoryCoursesRepository } from '../../../../test/repositories/in-memory-courses-repository';
import { makeCourse } from '../../../../test/factories/course-factory';
import { GetAllAvailableCourses } from './get-all-available-courses';

describe('Get All Courses', () => {
  it('should be able to get all available courses', async () => {
    const coursesRepository = new InMemoryCoursesRepository();
    const getAllAvailableCourses = new GetAllAvailableCourses(
      coursesRepository,
    );

    await coursesRepository.create(makeCourse({ title: 'course-1' }));

    await coursesRepository.create(
      makeCourse({ title: 'course-2', canceledAt: new Date() }),
    );

    const { courses } = await getAllAvailableCourses.execute();

    expect(courses).toHaveLength(1);
    expect(courses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'course-1', canceledAt: null }),
      ]),
    );
  });
});
