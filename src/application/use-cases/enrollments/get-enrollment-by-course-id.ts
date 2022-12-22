import { Enrollment } from '@application/entities/enrollment';
import { EnrollmentsRepository } from '@application/repositories/enrollments-repository';
import { Injectable } from '@nestjs/common';
import { EnrollmentNotFound } from '../errors/enrollment-not-found';

interface GetEnrollmentByCourseIdResponse {
  enrollment: Enrollment;
}

@Injectable()
export class GetEnrollmentByCourseId {
  constructor(private enrollmentsRepository: EnrollmentsRepository) {}

  async execute(courseId: string): Promise<GetEnrollmentByCourseIdResponse> {
    const enrollment = await this.enrollmentsRepository.findByCourseId(
      courseId,
    );

    if (!enrollment) {
      throw new EnrollmentNotFound();
    }

    return {
      enrollment,
    };
  }
}
