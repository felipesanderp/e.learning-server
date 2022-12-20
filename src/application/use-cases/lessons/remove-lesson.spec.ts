import { Description } from '../../entities/description';
import { InMemoryLessonsRepository } from '../../../../test/repositories/in-memory-lessons-repository';
import { CreateLesson } from './create-lesson';
import { RemoveLesson } from './remove-lesson';

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
      description: new Description('lesson-description-example'),
      duration: 120,
      video_id: 'video-id-example',
      course_id: 'course-id-example',
    });

    await removeLesson.execute(lesson.id);

    expect(lessonsRepository.lessons).toHaveLength(0);
  });
});
