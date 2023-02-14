import { Description } from '@application/entities/description';
import { makeCourse } from '@test/factories/course-factory';
import { makeLesson } from '@test/factories/lesson-factory';
import { InMemoryCoursesRepository } from '@test/repositories/in-memory-courses-repository';
import { InMemoryLessonsRepository } from '@test/repositories/in-memory-lessons-repository';
import { CourseNotFound } from '../errors/course-not-found';
import { LessonNotFound } from '../errors/lesson-not-found';
import { UpdateLesson } from './update-lesson';

describe('Update Lesson', () => {
  it('should be able to update a lesson', async () => {
    const lessonsRepository = new InMemoryLessonsRepository();
    const coursesRepository = new InMemoryCoursesRepository();
    const updateLesson = new UpdateLesson(lessonsRepository, coursesRepository);

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
    const coursesRepository = new InMemoryCoursesRepository();
    const updateLesson = new UpdateLesson(lessonsRepository, coursesRepository);

    expect(async () => {
      await updateLesson.execute({
        lessonId: 'fake-lesson-id',
        lesson: {},
      });
    }).rejects.toThrow(LessonNotFound);
  });

  it('should be able to update lesson course id', async () => {
    const lessonsRepository = new InMemoryLessonsRepository();
    const coursesRepository = new InMemoryCoursesRepository();
    const updateLesson = new UpdateLesson(lessonsRepository, coursesRepository);

    const createLesson = makeLesson();
    const createCourse = makeCourse();

    await coursesRepository.create(createCourse);

    await lessonsRepository.create(createLesson);

    await updateLesson.execute({
      lesson: {
        course_id: createCourse.id,
      },
      lessonId: createLesson.id,
    });
  });

  it('should not be able to update lesson course id with a non existing course_id', async () => {
    const lessonsRepository = new InMemoryLessonsRepository();
    const coursesRepository = new InMemoryCoursesRepository();
    const updateLesson = new UpdateLesson(lessonsRepository, coursesRepository);

    const createLesson = makeLesson();

    await lessonsRepository.create(createLesson);

    expect(async () => {
      await updateLesson.execute({
        lesson: {
          course_id: 'non-existing-course-id',
        },
        lessonId: createLesson.id,
      });
    }).rejects.toThrow(CourseNotFound);
  });
});
