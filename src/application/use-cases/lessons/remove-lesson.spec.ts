import { InMemoryLessonsRepository } from '../../../../test/repositories/in-memory-lessons-repository';
import { CreateLesson } from './create-lesson';
import { RemoveLesson } from './remove-lesson';
import { LessonNotFound } from '../errors/lesson-not-found';

let lessonsRepository: InMemoryLessonsRepository;
let createLesson: CreateLesson;
let removeLesson: RemoveLesson;

describe('Remove Lesson', () => {
  beforeEach(() => {
    lessonsRepository = new InMemoryLessonsRepository();
    createLesson = new CreateLesson(lessonsRepository);
    removeLesson = new RemoveLesson(lessonsRepository);
  });
  it('should be able to remove a lesson by id', async () => {
    const { lesson } = await createLesson.execute({
      name: 'lesson-example',
      description: 'lesson-description-example',
      duration: 120,
      video_id: 'video-id-example',
      course_id: 'course-id-example',
    });

    await removeLesson.execute(lesson.id);

    expect(lessonsRepository.lessons).toHaveLength(0);
  });

  it('should not be able to remove a non existing lesson', async () => {
    const fakeId = 'fake-lesson-id';

    expect(async () => {
      await removeLesson.execute(fakeId);
    }).rejects.toThrow(LessonNotFound);
  });
});
