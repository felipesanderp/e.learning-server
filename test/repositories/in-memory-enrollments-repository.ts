import { Enrollment } from '@application/entities/enrollment';
import { EnrollmentsRepository } from '@application/repositories/enrollments-repository';

export class InMemoryEnrollmentsRepository implements EnrollmentsRepository {
  public enrollments: Enrollment[] = [];

  async create(enrollment: Enrollment): Promise<void> {
    this.enrollments.push(enrollment);
  }
}
