import { Course } from '../entities/course';

export abstract class CoursesRepository {
  abstract create(course: Course): Promise<void>;
  abstract findByTitle(title: string): Promise<Course | null>;
  abstract findAllCourses(): Promise<Course[]>;
  abstract findAllAvailableCourses(): Promise<Course[]>;
  abstract findById(id: string): Promise<Course | null>;
  abstract remove(id: string): Promise<void>;
  abstract save(course: Course): Promise<void>;
}
