import { Lesson } from '@application/entities/lesson';
import { LessonsRepository } from '@application/repositories/lessons-repository';
import { LessonNotFound } from '../errors/lesson-not-found';

interface GetLessonByCourseIdResponse {
  lesson: Lesson;
}

export class GetLessonByCourseId {
  constructor(private lessonsRepository: LessonsRepository) {}

  async execute(courseId: string): Promise<GetLessonByCourseIdResponse> {
    const lesson = await this.lessonsRepository.findLessonByCourseId(courseId);

    if (!lesson) {
      throw new LessonNotFound();
    }

    return {
      lesson,
    };
  }
}
