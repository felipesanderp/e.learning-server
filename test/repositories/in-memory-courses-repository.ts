import { Course } from '@application/entities/course';
import { CoursesRepository } from '@application/repositories/courses-repository';

export class InMemoryCoursesRepository implements CoursesRepository {
  public courses: Course[] = [];

  async findAllCourses(): Promise<Course[]> {
    return this.courses;
  }

  async findByTitle(title: string): Promise<Course | null> {
    const course = this.courses.find((item) => item.title === title);

    if (!course) {
      return null;
    }

    return course;
  }

  async create(course: Course): Promise<void> {
    this.courses.push(course);
  }
}
