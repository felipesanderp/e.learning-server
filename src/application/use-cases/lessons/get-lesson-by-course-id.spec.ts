import { Description } from '../../../application/entities/description';
import { InMemoryLessonsRepository } from '../../../../test/repositories/in-memory-lessons-repository';
import { CreateLesson } from './create-lesson';
import { GetLessonByCourseId } from './get-lesson-by-course-id';
import { LessonNotFound } from '../errors/lesson-not-found';

describe('Lesson by Course ID', () => {
  it('should be able to get a lesson by course ID', async () => {
    const lessonsRepository = new InMemoryLessonsRepository();
    const createLesson = new CreateLesson(lessonsRepository);
    const findLessonByCourseId = new GetLessonByCourseId(lessonsRepository);

    const { lesson: lessonCreated } = await createLesson.execute({
      name: 'lesson-example',
      description: new Description('lesson-description-example'),
      duration: 120,
      video_id: 'video-id-example',
      course_id: 'course-id-example',
    });

    const { lesson } = await findLessonByCourseId.execute(
      lessonCreated.course_id,
    );

    expect(lesson).toEqual(lessonCreated);
  });

  it('should not be able to get a lesson by a non existing courseId', () => {
    const lessonsRepository = new InMemoryLessonsRepository();
    const findLessonByCourseId = new GetLessonByCourseId(lessonsRepository);

    const fakeCourseId = 'fake-course-id';

    expect(async () => {
      await findLessonByCourseId.execute(fakeCourseId);
    }).rejects.toThrow(LessonNotFound);
  });
});
