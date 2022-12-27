import { LessonsRepository } from '@application/repositories/lessons-repository';
import { Injectable } from '@nestjs/common';
import { CourseNotFound } from '../errors/course-not-found';

type CancelLessonResponse = void;

@Injectable()
export class CancelLesson {
  constructor(private lessonsRepository: LessonsRepository) {}

  async execute(courseId: string): Promise<CancelLessonResponse> {
    const lesson = await this.lessonsRepository.findById(courseId);

    if (!lesson) {
      throw new CourseNotFound();
    }

    lesson.cancel();

    await this.lessonsRepository.save(lesson);
  }
}
