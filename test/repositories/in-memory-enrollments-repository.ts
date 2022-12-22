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
