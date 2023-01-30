import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { GetAllCourses } from '@application/use-cases/courses/get-all-courses';
import { GetCourseById } from '@application/use-cases/courses/get-course-by-id';
import { CreateCourse } from '@application/use-cases/courses/create-course';

import { CourseViewModel } from '../view-models/course-view-model';
import { CreateCourseBody } from '../dtos/create-course-body';
import { GetAllAvailableCourses } from '@application/use-cases/courses/get-all-available-courses';

@Controller('courses')
export class CoursesController {
  constructor(
    private getAllCourses: GetAllCourses,
    private getCourseById: GetCourseById,
    private getAllAvailableCourses: GetAllAvailableCourses,
    private createCourse: CreateCourse,
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

  @Get('/available')
  async getAvailableCourses() {
    const { courses } = await this.getAllAvailableCourses.execute();

    return {
      courses: courses.map(CourseViewModel.toHTTP),
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
}
