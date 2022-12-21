import { Enrollment } from './enrollment';

describe('Enrollment', () => {
  it('should be able to create a new enrollment', () => {
    const enrollment = new Enrollment({
      courseId: 'course-id-example',
      userId: 'user-id-example',
    });

    expect(enrollment).toBeTruthy();
    expect(enrollment).toEqual(
      expect.objectContaining({
        courseId: 'course-id-example',
        userId: 'user-id-example',
      }),
    );
  });
});
