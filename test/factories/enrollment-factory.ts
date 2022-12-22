import { Enrollment, EnrollmentProps } from '@application/entities/enrollment';

type Override = Partial<EnrollmentProps>;

export function makeEnrollment(override: Override = {}) {
  return new Enrollment({
    courseId: 'course-id',
    userId: 'user-id',
    ...override,
  });
}
