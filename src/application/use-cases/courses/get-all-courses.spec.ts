import { InMemoryCoursesRepository } from '../../../../test/repositories/in-memory-courses-repository';
import { makeCourse } from '../../../../test/factories/course-factory';
import { GetAllCourses } from './get-all-courses';

describe('Get All Courses', () => {
  it('should be able to get all courses', async () => {
    const coursesRepository = new InMemoryCoursesRepository();
    const getAllCourses = new GetAllCourses(coursesRepository);

    await coursesRepository.create(makeCourse({ title: 'course-1' }));

    await coursesRepository.create(makeCourse({ title: 'course-2' }));

    const { courses } = await getAllCourses.execute();

    expect(courses).toHaveLength(2);
    expect(courses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'course-1' }),
        expect.objectContaining({ title: 'course-2' }),
      ]),
    );
  });
});
