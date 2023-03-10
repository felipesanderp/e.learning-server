import { Enrollment } from '@application/entities/enrollment';

export abstract class EnrollmentsRepository {
  abstract create(enrollment: Enrollment): Promise<void>;
  abstract findById(enrollmentId: string): Promise<Enrollment | null>;
  abstract save(enrollment: Enrollment): Promise<void>;
  abstract findByCourseId(courseId: string): Promise<Enrollment[] | null>;
  abstract findByUserId(userId: string): Promise<Enrollment[] | null>;
}
