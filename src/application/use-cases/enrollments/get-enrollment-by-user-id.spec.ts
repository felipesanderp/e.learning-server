import { makeEnrollment } from '@test/factories/enrollment-factory';
import { InMemoryEnrollmentsRepository } from '../../../../test/repositories/in-memory-enrollments-repository';
import { EnrollmentNotFound } from '../errors/enrollment-not-found';
import { GetEnrollmentByUserId } from './get-enrollment-by-user-id';

describe('Enrollment by User ID', () => {
  it('should be able to get a enrollment by user id', async () => {
    const enrollmentsRepository = new InMemoryEnrollmentsRepository();
    const getEnrollmentByUserId = new GetEnrollmentByUserId(
      enrollmentsRepository,
    );

    const enrollmentCreated = makeEnrollment();

    await enrollmentsRepository.create(enrollmentCreated);

    const { enrollments } = await getEnrollmentByUserId.execute(
      enrollmentCreated.userId,
    );

    expect(enrollments).toHaveLength(1);
    expect(enrollmentsRepository.enrollments[0]).toEqual(
      expect.objectContaining({ userId: 'user-id' }),
    );
  });

  it('should not be able to find a enrollment by a non existing user id', async () => {
    const enrollmentsRepository = new InMemoryEnrollmentsRepository();
    const getEnrollmentByUserId = new GetEnrollmentByUserId(
      enrollmentsRepository,
    );

    expect(async () => {
      await getEnrollmentByUserId.execute('fake-user-id');
    }).rejects.toThrow(EnrollmentNotFound);
  });
});
