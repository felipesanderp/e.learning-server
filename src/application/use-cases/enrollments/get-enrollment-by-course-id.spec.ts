import { makeEnrollment } from '@test/factories/enrollment-factory';
import { InMemoryEnrollmentsRepository } from '../../../../test/repositories/in-memory-enrollments-repository';
import { EnrollmentNotFound } from '../errors/enrollment-not-found';
import { GetEnrollmentByCourseId } from './get-enrollment-by-course-id';

describe('Enrollment by Course ID', () => {
  it('should be able to get a enrollment by course id', async () => {
    const enrollmentsRepository = new InMemoryEnrollmentsRepository();
    const getEnrollmentByCourseId = new GetEnrollmentByCourseId(
      enrollmentsRepository,
    );

    const enrollmentCreated = makeEnrollment();

    await enrollmentsRepository.create(enrollmentCreated);

    const { enrollments } = await getEnrollmentByCourseId.execute(
      enrollmentCreated.courseId,
    );

    expect(enrollments).toHaveLength(1);
    expect(enrollmentsRepository.enrollments[0]).toEqual(
      expect.objectContaining({ courseId: 'course-id' }),
    );
  });

  it('should not be able to find a enrollment by a non existing course id', async () => {
    const enrollmentsRepository = new InMemoryEnrollmentsRepository();
    const getEnrollmentByCourseId = new GetEnrollmentByCourseId(
      enrollmentsRepository,
    );

    expect(async () => {
      await getEnrollmentByCourseId.execute('fake-course-id');
    }).rejects.toThrow(EnrollmentNotFound);
  });
});
