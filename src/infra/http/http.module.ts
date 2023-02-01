import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { CoursesController } from './controllers/courses/courses.controller';

import { GetAllCourses } from '@application/use-cases/courses/get-all-courses';
import { GetCourseById } from '@application/use-cases/courses/get-course-by-id';
import { CreateCourse } from '@application/use-cases/courses/create-course';
import { GetAllAvailableCourses } from '@application/use-cases/courses/get-all-available-courses';
import { CancelCourse } from '@application/use-cases/courses/cancel-course';

@Module({
  imports: [DatabaseModule],
  controllers: [CoursesController],
  providers: [
    GetAllCourses,
    GetCourseById,
    GetAllAvailableCourses,
    CreateCourse,
    CancelCourse,
  ],
})
export class HttpModule {}
