import { Description } from '@application/entities/description';
import { makeLesson } from '@test/factories/lesson-factory';
import { InMemoryLessonsRepository } from '@test/repositories/in-memory-lessons-repository';
import { LessonNotFound } from '../errors/lesson-not-found';
import { UpdateLesson } from './update-lesson';

describe('Update Lesson', () => {
  it('should be able to update a lesson', async () => {
    const lessonsRepository = new InMemoryLessonsRepository();
    const updateLesson = new UpdateLesson(lessonsRepository);

    const createLesson = makeLesson();

    await lessonsRepository.create(createLesson);

    await updateLesson.execute({
      lessonId: createLesson.id,
      lesson: {
        name: 'new-lesson-name',
        duration: 150,
        video_id: 'new-video-id',
        description: new Description('new-lesson-description'),
      },
    });

    expect(lessonsRepository.lessons[0]).toEqual(
      expect.objectContaining({
        name: 'new-lesson-name',
        duration: 150,
      }),
    );
  });

  it('should not be able to update a non existing lesson', () => {
    const lessonsRepository = new InMemoryLessonsRepository();
    const updateLesson = new UpdateLesson(lessonsRepository);

    expect(async () => {
      await updateLesson.execute({
        lessonId: 'fake-lesson-id',
        lesson: {},
      });
    }).rejects.toThrow(LessonNotFound);
  });
});
