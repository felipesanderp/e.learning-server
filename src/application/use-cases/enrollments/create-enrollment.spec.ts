import { InMemoryEnrollmentsRepository } from '../../../../test/repositories/in-memory-enrollments-repository';
import { CreateEnrollment } from './create-enrollment';

describe('Create Enrollment', () => {
  it('should be able to create a new enrollment', async () => {
    const enrollmentsRepository = new InMemoryEnrollmentsRepository();
    const createEnrollment = new CreateEnrollment(enrollmentsRepository);

    const { enrollment } = await createEnrollment.execute({
      courseId: 'course-id',
      userId: 'user-id',
    });

    expect(enrollmentsRepository.enrollments).toHaveLength(1);
    expect(enrollmentsRepository.enrollments[0]).toEqual(enrollment);
  });
});
