import { Lesson } from '@application/entities/lesson';
import { LessonsRepository } from '@application/repositories/lessons-repository';

export class InMemoryLessonsRepository implements LessonsRepository {
  public lessons: Lesson[] = [];

  async findByName(name: string): Promise<Lesson | null> {
    const lesson = this.lessons.find((item) => item.name === name);

    if (!lesson) {
      return null;
    }

    return lesson;
  }

  async create(lesson: Lesson): Promise<void> {
    this.lessons.push(lesson);
  }
}
