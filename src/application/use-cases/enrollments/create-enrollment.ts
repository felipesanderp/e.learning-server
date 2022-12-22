import { Enrollment } from '@application/entities/enrollment';
import { EnrollmentsRepository } from '@application/repositories/enrollments-repository';
import { Injectable } from '@nestjs/common';

interface CreateEnrollmentRequest {
  courseId: string;
  userId: string;
}

interface CreateEnrollmentResponse {
  enrollment: Enrollment;
}

@Injectable()
export class CreateEnrollment {
  constructor(private enrollmentsRepository: EnrollmentsRepository) {}

  async execute(
    request: CreateEnrollmentRequest,
  ): Promise<CreateEnrollmentResponse> {
    const { courseId, userId } = request;

    const enrollment = new Enrollment({
      courseId,
      userId,
    });

    await this.enrollmentsRepository.create(enrollment);

    return {
      enrollment,
    };
  }
}
