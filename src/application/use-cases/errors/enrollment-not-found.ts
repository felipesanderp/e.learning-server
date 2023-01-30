import { HttpStatus, NotFoundException } from '@nestjs/common';

export class EnrollmentNotFound extends NotFoundException {
  constructor() {
    super('Enrollment not found!', HttpStatus.NOT_FOUND.toString());
  }
}
