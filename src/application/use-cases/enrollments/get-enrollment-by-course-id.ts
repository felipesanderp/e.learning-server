import { Enrollment } from '@application/entities/enrollment';
import { EnrollmentsRepository } from '@application/repositories/enrollments-repository';
import { Injectable } from '@nestjs/common';
import { EnrollmentNotFound } from '../errors/enrollment-not-found';

interface GetEnrollmentByCourseIdResponse {
  enrollments: Enrollment[];
}

@Injectable()
export class GetEnrollmentByCourseId {
  constructor(private enrollmentsRepository: EnrollmentsRepository) {}

  async execute(courseId: string): Promise<GetEnrollmentByCourseIdResponse> {
    const enrollments = await this.enrollmentsRepository.findByCourseId(
      courseId,
    );

    if (!enrollments) {
      throw new EnrollmentNotFound();
    }

    return {
      enrollments,
    };
  }
}
