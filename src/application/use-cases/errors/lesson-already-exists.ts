import { BadRequestException, HttpStatus } from '@nestjs/common';

export class LessonAlreadyExists extends BadRequestException {
  constructor() {
    super('Lesson already exists!', HttpStatus.BAD_REQUEST.toString());
  }
}
