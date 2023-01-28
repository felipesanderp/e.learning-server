import { Controller, Get, Param } from '@nestjs/common';

import { GetAllCourses } from '@application/use-cases/courses/get-all-courses';

import { CourseViewModel } from '../view-models/course-view-model';
import { GetCourseById } from '@application/use-cases/courses/get-course-by-id';

@Controller('courses')
export class CoursesController {
  constructor(
    private getAllCourses: GetAllCourses,
    private getCourseById: GetCourseById,
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
}
