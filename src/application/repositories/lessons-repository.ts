import { Lesson } from '@application/entities/lesson';

export abstract class LessonsRepository {
  abstract create(lesson: Lesson): Promise<void>;
  abstract findByName(name: string): Promise<Lesson | null>;
}
