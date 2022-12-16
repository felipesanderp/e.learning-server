import { Course } from '../entities/course';

export abstract class CoursesRepository {
  abstract create(course: Course): Promise<void>;
}
