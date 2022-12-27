import { Injectable } from '@nestjs/common';
import { Lesson } from '@application/entities/lesson';
import { LessonsRepository } from '@application/repositories/lessons-repository';

interface GetAllAvailableLessonsResponse {
  lessons: Lesson[];
}

@Injectable()
export class GetAllAvailableLessons {
  constructor(private lessonsRepository: LessonsRepository) {}

  async execute(): Promise<GetAllAvailableLessonsResponse> {
    const lessons = await this.lessonsRepository.findAllAvailableLessons();

    return {
      lessons,
    };
  }
}
