import { Description } from '../../entities/description';
import { InMemoryLessonsRepository } from '../../../../test/repositories/in-memory-lessons-repository';
import { CreateLesson } from './create-lesson';

describe('Create Lesson', () => {
  it('should be able to create a new lesson', async () => {
    const lessonsRepository = new InMemoryLessonsRepository();
    const createLesson = new CreateLesson(lessonsRepository);

    const { lesson } = await createLesson.execute({
      name: 'lesson-example',
      description: new Description('lesson-description-example'),
      duration: 120,
      video_id: 'video-id-example',
      course_id: 'course-id-example',
    });

    expect(lessonsRepository.lessons).toHaveLength(1);
    expect(lessonsRepository.lessons[0]).toEqual(lesson);
  });
});
