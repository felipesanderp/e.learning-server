import { Course } from '@application/entities/course';
import { CoursesRepository } from '@application/repositories/courses-repository';
import { Injectable } from '@nestjs/common';
import { PrismaCourseMapper } from '../mappers/prisma-course-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCoursesRepository implements CoursesRepository {
  constructor(private prisma: PrismaService) {}

  async findByTitle(title: string): Promise<Course | null> {
    throw new Error('Method not implemented.');
  }

  async findAllCourses(): Promise<Course[]> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Course | null> {
    const course = await this.prisma.courses.findUnique({
      where: {
        id,
      },
    });

    if (!course) {
      return null;
    }

    return PrismaCourseMapper.toDomain(course);
  }

  async create(course: Course): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
