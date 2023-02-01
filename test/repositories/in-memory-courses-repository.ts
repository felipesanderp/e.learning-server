import { Course } from '@application/entities/course';
import { CoursesRepository } from '@application/repositories/courses-repository';

export class InMemoryCoursesRepository implements CoursesRepository {
  public courses: Course[] = [];

  async findAllCourses(): Promise<Course[]> {
    return this.courses;
  }

  async findAllAvailableCourses(): Promise<Course[]> {
    return this.courses.filter((item) => item.isAvailable === true);
  }

  async findById(id: string): Promise<Course | null> {
    const course = this.courses.find((item) => item.id === id);

    if (!course) {
      return null;
    }

    return course;
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

  async remove(id: string): Promise<void> {
    const courseIndex = this.courses.findIndex((item) => item.id === id);

    this.courses.splice(courseIndex, 1);
  }

  async save(course: Course): Promise<void> {
    const courseIndex = this.courses.findIndex((item) => item.id === course.id);

    if (courseIndex >= 0) {
      this.courses[courseIndex] = course;
    }
  }
}
