import { Injectable } from '@nestjs/common';

import { Lesson } from '@application/entities/lesson';
import { LessonsRepository } from '@application/repositories/lessons-repository';
import { LessonNotFound } from '../errors/lesson-not-found';

interface GetAllLessonsResponse {
  lessons: Lesson[];
}

@Injectable()
export class GetAllLessons {
  constructor(private lessonsRepository: LessonsRepository) {}

  async execute(): Promise<GetAllLessonsResponse> {
    const lessons = await this.lessonsRepository.findAllLessons();

    if (!lessons) {
      throw new LessonNotFound();
    }

    return {
      lessons,
    };
  }
}
