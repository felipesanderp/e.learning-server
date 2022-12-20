import { LessonsRepository } from '@application/repositories/lessons-repository';
import { Injectable } from '@nestjs/common';
import { LessonNotFound } from '../errors/lesson-not-found';

type RemoveLessonResponse = void;

@Injectable()
export class RemoveLesson {
  constructor(private lessonsRepository: LessonsRepository) {}

  async execute(id: string): Promise<RemoveLessonResponse> {
    const lessonExists = await this.lessonsRepository.findById(id);

    if (!lessonExists) {
      throw new LessonNotFound();
    }

    await this.lessonsRepository.remove(lessonExists.id);
  }
}
