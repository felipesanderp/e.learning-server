import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { CoursesController } from './controllers/courses.controller';

import { GetAllCourses } from '@application/use-cases/courses/get-all-courses';
import { GetCourseById } from '@application/use-cases/courses/get-course-by-id';

@Module({
  imports: [DatabaseModule],
  controllers: [CoursesController],
  providers: [GetAllCourses, GetCourseById],
})
export class HttpModule {}
