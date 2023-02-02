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

import { GetAllCourses } from '@application/use-cases/courses/get-all-courses';
import { GetCourseById } from '@application/use-cases/courses/get-course-by-id';
import { CreateCourse } from '@application/use-cases/courses/create-course';
import { UpdateCourse } from '@application/use-cases/courses/update-course';
import { CancelCourse } from '@application/use-cases/courses/cancel-course';
import { RemoveCourse } from '@application/use-cases/courses/remove-course';

import { CourseViewModel } from '../../view-models/course-view-model';
import { CreateCourseBody } from '../../dtos/courses/create-course-body';
import { UpdateCourseBody } from '../../dtos/courses/update-course-body';

@Controller('courses')
export class CoursesController {
  constructor(
    private getAllCourses: GetAllCourses,
    private getCourseById: GetCourseById,
    private createCourse: CreateCourse,
    private updateCourse: UpdateCourse,
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

  @Put(':id/update')
  async update(@Param('id') id: string, @Body() body: UpdateCourseBody) {
    const { title, description, imageURL } = body;

    const { course } = await this.updateCourse.execute({
      courseId: id,
      course: {
        title,
        description,
        imageURL,
      },
    });

    return {
      course: CourseViewModel.toHTTP(course),
    };
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
