import { Course } from '@application/entities/course';
import { CoursesRepository } from '@application/repositories/courses-repository';

export class InMemoryCoursesRepository implements CoursesRepository {
  public courses: Course[] = [];

  async create(course: Course): Promise<void> {
    this.courses.push(course);
  }
}
