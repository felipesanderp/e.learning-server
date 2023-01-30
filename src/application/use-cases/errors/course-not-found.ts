import { NotFoundException, HttpStatus } from '@nestjs/common';

export class CourseNotFound extends NotFoundException {
  constructor() {
    super('Course not found!', HttpStatus.NOT_FOUND.toString());
  }
}
