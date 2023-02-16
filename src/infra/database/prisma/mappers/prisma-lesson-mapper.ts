import { Description } from '@application/entities/description';
import { Lesson } from '@application/entities/lesson';
import { Lessons as RawLessons } from '@prisma/client';
export class PrismaLessonMapper {
  static toPrisma(lesson: Lesson) {
    return {
      id: lesson.id,
      name: lesson.name,
      description: lesson.description.value,
      video_id: lesson.video_id,
      duration: lesson.duration,
      isAvailable: lesson.isAvailable,
      course_id: lesson.course_id,
      canceledAt: lesson.canceledAt,
      createdAt: lesson.createdAt,
    };
  }

  static toDomain(raw: RawLessons) {
    return new Lesson({
      name: raw.name,
      description: new Description(raw.description),
      video_id: raw.video_id,
      duration: raw.duration,
      isAvailable: raw.isAvailable,
      canceledAt: raw.canceledAt,
      createdAt: raw.createdAt,
      course_id: raw.course_id,
    });
  }
}
