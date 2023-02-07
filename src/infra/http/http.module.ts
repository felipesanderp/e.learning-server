import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { CoursesController } from './controllers/courses/courses.controller';
import { LessonsController } from './controllers/lessons/lessons.controller';

import { GetAllCourses } from '@application/use-cases/courses/get-all-courses';
import { GetCourseById } from '@application/use-cases/courses/get-course-by-id';
import { CreateCourse } from '@application/use-cases/courses/create-course';
import { CancelCourse } from '@application/use-cases/courses/cancel-course';
import { RemoveCourse } from '@application/use-cases/courses/remove-course';
import { UpdateCourse } from '@application/use-cases/courses/update-course';

@Module({
  imports: [DatabaseModule],
  controllers: [CoursesController, LessonsController],
  providers: [
    GetAllCourses,
    GetCourseById,
    CreateCourse,
    UpdateCourse,
    CancelCourse,
    RemoveCourse,
  ],
})
export class HttpModule {}
