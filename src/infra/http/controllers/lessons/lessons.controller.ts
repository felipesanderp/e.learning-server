import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { CreateLesson } from '@application/use-cases/lessons/create-lesson';
import { GetAllLessons } from '@application/use-cases/lessons/get-all-lessons';
import { GetLessonByCourseId } from '@application/use-cases/lessons/get-lesson-by-course-id';
import { CancelLesson } from '@application/use-cases/lessons/cancel-lesson';
import { RemoveLesson } from '@application/use-cases/lessons/remove-lesson';
import { GetAllAvailableLessons } from '@application/use-cases/lessons/get-all-available-lessons';
import { UpdateLesson } from '@application/use-cases/lessons/update-lesson';

import { CreateLessonBody } from '@infra/http/dtos/lessons/create-lesson-body';
import { UpdateLessonBody } from '@infra/http/dtos/lessons/update-lesson-body';
import { LessonViewModel } from '@infra/http/view-models/lesson-view-model';

@Controller('lessons')
export class LessonsController {
  constructor(
    private createLesson: CreateLesson,
    private getAllLessons: GetAllLessons,
    private getLessonByCourseId: GetLessonByCourseId,
    private getAllAvailableLessons: GetAllAvailableLessons,
    private cancelLesson: CancelLesson,
    private removeLesson: RemoveLesson,
    private updateLesson: UpdateLesson,
  ) {}

  @Get()
  async getAll() {
    const { lessons } = await this.getAllLessons.execute();

    return {
      lessons: lessons.map(LessonViewModel.toHTTP),
    };
  }

  @Get('by_course/:course_id')
  async getByCourseId(@Param('course_id') course_id: string) {
    const { lesson } = await this.getLessonByCourseId.execute(course_id);

    return {
      lesson: LessonViewModel.toHTTP(lesson),
    };
  }

  @Get('available')
  async getAvailableLessons() {
    const { lessons } = await this.getAllAvailableLessons.execute();

    return {
      lessons: lessons.map(LessonViewModel.toHTTP),
    };
  }

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

  @Put(':id/update')
  async update(@Param('id') id: string, @Body() body: UpdateLessonBody) {
    const { name, description, duration, video_id, course_id } = body;

    const { lesson } = await this.updateLesson.execute({
      lessonId: id,
      lesson: {
        name,
        description,
        duration,
        video_id,
        course_id,
      },
    });

    return {
      lesson: LessonViewModel.toHTTP(lesson),
    };
  }

  @Patch(':id/cancel')
  async cancelLessonById(@Param('id') id: string) {
    const { lesson } = await this.cancelLesson.execute(id);

    return {
      lesson: LessonViewModel.toHTTP(lesson),
    };
  }

  @Delete(':id/remove')
  async deleteLesson(@Param('id') id: string) {
    await this.removeLesson.execute(id);
  }
}
