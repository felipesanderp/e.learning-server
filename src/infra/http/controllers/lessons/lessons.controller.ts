import { Body, Controller, Post } from '@nestjs/common';

import { CreateLesson } from '@application/use-cases/lessons/create-lesson';

import { CreateLessonBody } from '@infra/http/dtos/lessons/create-lesson-body';
import { LessonViewModel } from '@infra/http/view-models/lesson-view-model';

@Controller('lessons')
export class LessonsController {
  constructor(private createLesson: CreateLesson) {}

  @Post()
  async create(@Body() body: CreateLessonBody) {
    const { name, description, duration, video_id, course_id } = body;

    const { lesson } = await this.createLesson.execute({
      name,
      description,
      duration,
      video_id,
      course_id,
    });

    return { lesson: LessonViewModel.toHTTP(lesson) };
  }
}
