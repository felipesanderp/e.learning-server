import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { GetAllCourses } from '@application/use-cases/courses/get-all-courses';
import { GetCourseById } from '@application/use-cases/courses/get-course-by-id';
import { CreateCourse } from '@application/use-cases/courses/create-course';

import { CourseViewModel } from '../../view-models/course-view-model';
import { CreateCourseBody } from '../../dtos/create-course-body';
import { CancelCourse } from '@application/use-cases/courses/cancel-course';
import { RemoveCourse } from '@application/use-cases/courses/remove-course';

@Controller('courses')
export class CoursesController {
  constructor(
    private getAllCourses: GetAllCourses,
    private getCourseById: GetCourseById,
    private createCourse: CreateCourse,
    private cancelCourse: CancelCourse,
    private removeCourse: RemoveCourse,
  ) {}

  @Get()
  async getAll() {
    const { courses } = await this.getAllCourses.execute();

    return {
      courses: courses.map(CourseViewModel.toHTTP),
    };
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const { course } = await this.getCourseById.execute(id);

    return {
      course: CourseViewModel.toHTTP(course),
    };
  }

  @Post()
  async create(@Body() body: CreateCourseBody) {
    const { title, description, imageURL } = body;

    const { course } = await this.createCourse.execute({
      title,
      description,
      imageURL,
    });

    return { course: CourseViewModel.toHTTP(course) };
  }

  @Patch(':id/cancel')
  async cancelCourseById(@Param('id') id: string) {
    const { course } = await this.cancelCourse.execute(id);

    return {
      course: CourseViewModel.toHTTP(course),
    };
  }

  @Delete(':id/remove')
  async deleteCourse(@Param('id') id: string) {
    await this.removeCourse.execute(id);
  }
}
