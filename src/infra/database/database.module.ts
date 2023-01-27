import { CoursesRepository } from '@application/repositories/courses-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaCoursesRepository } from './prisma/repositories/prisma-courses-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CoursesRepository,
      useClass: PrismaCoursesRepository,
    },
  ],
  exports: [CoursesRepository],
})
export class DatabaseModule {}
