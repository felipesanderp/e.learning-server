import { Enrollment } from '@application/entities/enrollment';
import { EnrollmentsRepository } from '@application/repositories/enrollments-repository';
import { Injectable } from '@nestjs/common';
import { EnrollmentNotFound } from '../errors/enrollment-not-found';

interface GetEnrollmentByUserIdResponse {
  enrollment: Enrollment;
}

@Injectable()
export class GetEnrollmentByUserId {
  constructor(private enrollmentsRepository: EnrollmentsRepository) {}

  async execute(userId: string): Promise<GetEnrollmentByUserIdResponse> {
    const enrollment = await this.enrollmentsRepository.findByUserId(userId);

    if (!enrollment) {
      throw new EnrollmentNotFound();
    }

    return {
      enrollment,
    };
  }
}
