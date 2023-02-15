import { InMemoryLessonsRepository } from '../../../../test/repositories/in-memory-lessons-repository';
import { makeLesson } from '../../../../test/factories/lesson-factory';
import { GetAllLessons } from './get-all-lessons';

describe('Get All Courses', () => {
  it('should be able to get all courses', async () => {
    const lessonsRepository = new InMemoryLessonsRepository();
    const getAllLessons = new GetAllLessons(lessonsRepository);

    await lessonsRepository.create(makeLesson({ name: 'lesson-1' }));

    await lessonsRepository.create(makeLesson({ name: 'lesson-2' }));

    const { lessons } = await getAllLessons.execute();

    expect(lessons).toHaveLength(2);
    expect(lessons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'lesson-1' }),
        expect.objectContaining({ name: 'lesson-2' }),
      ]),
    );
  });
});
