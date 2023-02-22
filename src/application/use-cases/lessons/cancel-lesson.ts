import { Lesson } from '@application/entities/lesson';
import { LessonsRepository } from '@application/repositories/lessons-repository';
import { Injectable } from '@nestjs/common';
import { LessonNotFound } from '../errors/lesson-not-found';

interface CancelLessonResponse {
  lesson: Lesson;
}

@Injectable()
export class CancelLesson {
  constructor(private lessonsRepository: LessonsRepository) {}

  async execute(courseId: string): Promise<CancelLessonResponse> {
    const lesson = await this.lessonsRepository.findById(courseId);

    if (!lesson) {
      throw new LessonNotFound();
    }

    lesson.cancel();

    await this.lessonsRepository.save(lesson);

    return {
      lesson,
    };
  }
}
