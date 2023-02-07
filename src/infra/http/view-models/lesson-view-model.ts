import { Lesson } from '@application/entities/lesson';

export class LessonViewModel {
  static toHTTP(lesson: Lesson) {
    return {
      id: lesson.id,
      name: lesson.name,
      description: lesson.description,
      video_id: lesson.video_id,
      canceledAt: lesson.canceledAt,
      course_id: lesson.course_id,
    };
  }
}
