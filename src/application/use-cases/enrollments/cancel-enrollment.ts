import { EnrollmentsRepository } from '@application/repositories/enrollments-repository';
import { Injectable } from '@nestjs/common/decorators';
import { EnrollmentNotFound } from '../errors/enrollment-not-found';

interface CancelNotificationRequest {
  enrollmentId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelEnrollment {
  constructor(private enrollmentsRepository: EnrollmentsRepository) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { enrollmentId } = request;

    const enrollment = await this.enrollmentsRepository.findById(enrollmentId);

    if (!enrollment) {
      throw new EnrollmentNotFound();
    }

    enrollment.cancel();

    await this.enrollmentsRepository.save(enrollment);
  }
}
