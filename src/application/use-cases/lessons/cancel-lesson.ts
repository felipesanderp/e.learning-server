import { Lesson } from '@application/entities/lesson';
import { LessonsRepository } from '@application/repositories/lessons-repository';
import { Injectable } from '@nestjs/common';
import { CourseNotFound } from '../errors/course-not-found';

interface CancelLessonResponse {
  lesson: Lesson;
}

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

    return {
      lesson,
    };
  }
}
