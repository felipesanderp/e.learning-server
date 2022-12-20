import { Lesson } from '@application/entities/lesson';

export abstract class LessonsRepository {
  abstract create(lesson: Lesson): Promise<void>;
  abstract findByName(name: string): Promise<Lesson | null>;
  abstract findById(id: string): Promise<Lesson | null>;
  abstract remove(id: string): Promise<void>;
}
