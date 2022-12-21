import { Lesson } from '@application/entities/lesson';
import { LessonsRepository } from '@application/repositories/lessons-repository';
import { Injectable } from '@nestjs/common';
import { LessonNotFound } from '../errors/lesson-not-found';

interface GetLessonByCourseIdResponse {
  lesson: Lesson;
}

@Injectable()
export class GetLessonByCourseId {
  constructor(private lessonsRepository: LessonsRepository) {}

  async execute(
    courseId: string | undefined,
  ): Promise<GetLessonByCourseIdResponse> {
    const lesson = await this.lessonsRepository.findLessonByCourseId(courseId);

    if (!lesson) {
      throw new LessonNotFound();
    }

    return {
      lesson,
    };
  }
}
