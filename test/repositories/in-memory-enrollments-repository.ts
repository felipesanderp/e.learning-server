import { Enrollment } from '@application/entities/enrollment';
import { EnrollmentsRepository } from '@application/repositories/enrollments-repository';

export class InMemoryEnrollmentsRepository implements EnrollmentsRepository {
  public enrollments: Enrollment[] = [];

  async findById(enrollmentId: string): Promise<Enrollment | null> {
    const enrollment = this.enrollments.find(
      (item) => item.id === enrollmentId,
    );

    if (!enrollment) {
      return null;
    }

    return enrollment;
  }

  async findByCourseId(courseId: string): Promise<Enrollment[] | null> {
    const enrollments = this.enrollments.filter(
      (item) => item.courseId === courseId,
    );

    if (!enrollments.length) {
      return null;
    }

    return enrollments;
  }

  async findByUserId(userId: string): Promise<Enrollment[] | null> {
    const enrollments = this.enrollments.filter(
      (item) => item.userId === userId,
    );

    if (!enrollments.length) {
      return null;
    }

    return enrollments;
  }

  async create(enrollment: Enrollment): Promise<void> {
    this.enrollments.push(enrollment);
  }

  async save(enrollment: Enrollment): Promise<void> {
    const enrollmentIndex = this.enrollments.findIndex(
      (item) => item.id === enrollment.id,
    );

    if (enrollmentIndex >= 0) {
      this.enrollments[enrollmentIndex] = enrollment;
    }
  }
}
