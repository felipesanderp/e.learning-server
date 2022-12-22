import { Enrollment } from '@application/entities/enrollment';

export abstract class EnrollmentsRepository {
  abstract create(enrollment: Enrollment): Promise<void>;
}
