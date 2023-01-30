import { HttpStatus } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';

export class CourseAlreadyExists extends BadRequestException {
  constructor() {
    super('Course already exists!', HttpStatus.BAD_REQUEST.toString());
  }
}
