import { makeLesson } from '../../../../test/factories/lesson-factory';
import { InMemoryLessonsRepository } from '../../../../test/repositories/in-memory-lessons-repository';
import { CourseNotFound } from '../errors/course-not-found';
import { CancelLesson } from './cancel-lesson';

describe('Cancel Lesson', () => {
  it('should be able to cancel a lesson', async () => {
    const lessonsRepository = new InMemoryLessonsRepository();
    const cancelLesson = new CancelLesson(lessonsRepository);

    const lesson = makeLesson();

    await lessonsRepository.create(lesson);

    await cancelLesson.execute(lesson.id);

    expect(lessonsRepository.lessons[0].canceledAt).toEqual(expect.any(Date));
  });

  it('should not be able to cancel a non existing lesson', () => {
    const lessonsRepository = new InMemoryLessonsRepository();
    const cancelLesson = new CancelLesson(lessonsRepository);

    expect(() => {
      return cancelLesson.execute('fake-course-id');
    }).rejects.toThrow(CourseNotFound);
  });
});
