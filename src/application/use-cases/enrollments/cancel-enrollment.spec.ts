import { makeEnrollment } from '../../../../test/factories/enrollment-factory';
import { InMemoryEnrollmentsRepository } from '../../../../test/repositories/in-memory-enrollments-repository';
import { EnrollmentNotFound } from '../errors/enrollment-not-found';
import { CancelEnrollment } from './cancel-enrollment';

describe('Cancel Enrollment', () => {
  it('should be able to cancel a enrollment', async () => {
    const enrollmentsRepository = new InMemoryEnrollmentsRepository();
    const cancelEnrollment = new CancelEnrollment(enrollmentsRepository);

    const enrollment = makeEnrollment();

    await enrollmentsRepository.create(enrollment);

    await cancelEnrollment.execute({
      enrollmentId: enrollment.id,
    });

    expect(enrollmentsRepository.enrollments[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing enrollment', () => {
    const enrollmentsRepository = new InMemoryEnrollmentsRepository();
    const cancelEnrollment = new CancelEnrollment(enrollmentsRepository);

    expect(() => {
      return cancelEnrollment.execute({
        enrollmentId: 'fake-enrollment-id',
      });
    }).rejects.toThrow(EnrollmentNotFound);
  });
});
