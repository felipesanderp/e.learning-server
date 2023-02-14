import { Injectable } from '@nestjs/common';
import { Lesson } from '@application/entities/lesson';
import { LessonsRepository } from '@application/repositories/lessons-repository';
import { LessonNotFound } from '../errors/lesson-not-found';

interface GetAllAvailableLessonsResponse {
  lessons: Lesson[];
}

@Injectable()
export class GetAllAvailableLessons {
  constructor(private lessonsRepository: LessonsRepository) {}

  async execute(): Promise<GetAllAvailableLessonsResponse> {
    const lessons = await this.lessonsRepository.findAllAvailableLessons();

    if (!lessons) {
      throw new LessonNotFound();
    }

    return {
      lessons,
    };
  }
}
