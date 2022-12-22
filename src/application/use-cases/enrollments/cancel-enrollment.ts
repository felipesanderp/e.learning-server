import { EnrollmentsRepository } from '@application/repositories/enrollments-repository';
import { Injectable } from '@nestjs/common';
import { EnrollmentNotFound } from '../errors/enrollment-not-found';

interface CancelEnrollmentRequest {
  enrollmentId: string;
}

type CancelEnrollmentResponse = void;

@Injectable()
export class CancelEnrollment {
  constructor(private enrollmentsRepository: EnrollmentsRepository) {}

  async execute(
    request: CancelEnrollmentRequest,
  ): Promise<CancelEnrollmentResponse> {
    const { enrollmentId } = request;

    const enrollment = await this.enrollmentsRepository.findById(enrollmentId);

    if (!enrollment) {
      throw new EnrollmentNotFound();
    }

    enrollment.cancel();

    await this.enrollmentsRepository.save(enrollment);
  }
}
