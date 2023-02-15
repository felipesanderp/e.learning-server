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

import { CreateLesson } from '@application/use-cases/lessons/create-lesson';
import { GetAllLessons } from '@application/use-cases/lessons/get-all-lessons';
import { GetLessonByCourseId } from '@application/use-cases/lessons/get-lesson-by-course-id';
import { GetAllAvailableLessons } from '@application/use-cases/lessons/get-all-available-lessons';
import { CancelLesson } from '@application/use-cases/lessons/cancel-lesson';
import { RemoveLesson } from '@application/use-cases/lessons/remove-lesson';
import { UpdateLesson } from '@application/use-cases/lessons/update-lesson';

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

    CreateLesson,
    GetAllLessons,
    GetLessonByCourseId,
    GetAllAvailableLessons,
    CancelLesson,
    RemoveLesson,
    UpdateLesson,
  ],
})
export class HttpModule {}
