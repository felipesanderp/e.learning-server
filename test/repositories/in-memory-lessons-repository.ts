import { Lesson } from '@application/entities/lesson';
import { LessonsRepository } from '@application/repositories/lessons-repository';

export class InMemoryLessonsRepository implements LessonsRepository {
  public lessons: Lesson[] = [];

  async create(lesson: Lesson): Promise<void> {
    this.lessons.push(lesson);
  }
}
