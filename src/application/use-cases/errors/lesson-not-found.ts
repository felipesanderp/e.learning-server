import { HttpStatus, NotFoundException } from '@nestjs/common';

export class LessonNotFound extends NotFoundException {
  constructor() {
    super('Lesson not found!', HttpStatus.NOT_FOUND.toString());
  }
}
