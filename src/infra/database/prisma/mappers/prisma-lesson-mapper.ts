import { Lesson } from '@application/entities/lesson';

export class PrismaLessonMapper {
  static toPrisma(lesson: Lesson) {
    return {
      id: lesson.id,
      name: lesson.name,
      description: lesson.description,
      video_id: lesson.video_id,
      duration: lesson.duration,
      isAvailable: lesson.isAvailable,
      course_id: lesson.course_id,
      canceledAt: lesson.canceledAt,
      createdAt: lesson.createdAt,
    };
  }
}
