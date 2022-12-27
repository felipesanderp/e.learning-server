import { InMemoryLessonsRepository } from '../../../../test/repositories/in-memory-lessons-repository';
import { makeLesson } from '../../../../test/factories/lesson-factory';
import { GetAllAvailableLessons } from './get-all-available-lessons';

describe('Get All Available Lessons', () => {
  it('should be able to get all available courses', async () => {
    const lessonsRepository = new InMemoryLessonsRepository();
    const getAllAvailableLessons = new GetAllAvailableLessons(
      lessonsRepository,
    );

    await lessonsRepository.create(makeLesson({ name: 'lesson-1' }));

    await lessonsRepository.create(
      makeLesson({ name: 'lesson-2', canceledAt: new Date() }),
    );

    const { lessons } = await getAllAvailableLessons.execute();

    expect(lessons).toHaveLength(1);
    expect(lessons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'lesson-1', canceledAt: null }),
      ]),
    );
  });
});
