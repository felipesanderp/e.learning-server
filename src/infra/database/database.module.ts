import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

import { CoursesRepository } from '@application/repositories/courses-repository';
import { LessonsRepository } from '@application/repositories/lessons-repository';

import { PrismaCoursesRepository } from './prisma/repositories/prisma-courses-repository';
import { PrismaLessonsRepository } from './prisma/repositories/prisma-lessons-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CoursesRepository,
      useClass: PrismaCoursesRepository,
    },
    {
      provide: LessonsRepository,
      useClass: PrismaLessonsRepository,
    },
  ],
  exports: [CoursesRepository],
})
export class DatabaseModule {}
