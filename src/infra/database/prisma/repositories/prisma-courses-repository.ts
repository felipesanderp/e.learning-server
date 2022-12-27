import { Course } from '@application/entities/course';
import { CoursesRepository } from '@application/repositories/courses-repository';
import { Injectable } from '@nestjs/common';
import { PrismaCourseMapper } from '../mappers/prisma-course-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCoursesRepository implements CoursesRepository {
  constructor(private prisma: PrismaService) {}

  async findByTitle(title: string): Promise<Course | null> {
    const course = await this.prisma.courses.findFirst({
      where: {
        title,
      },
    });

    if (!course) {
      return null;
    }

    return PrismaCourseMapper.toDomain(course);
  }

  async findAllCourses(): Promise<Course[]> {
    const courses = await this.prisma.courses.findMany();

    return courses.map(PrismaCourseMapper.toDomain);
  }

  async findAllAvailableCourses(): Promise<Course[]> {
    const courses = await this.prisma.courses.findMany({
      where: {
        canceledAt: null,
      },
    });

    return courses.map(PrismaCourseMapper.toDomain);
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
    const raw = PrismaCourseMapper.toPrisma(course);

    await this.prisma.courses.create({
      data: raw,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.courses.delete({
      where: {
        id,
      },
    });
  }

  async save(course: Course): Promise<void> {
    const raw = PrismaCourseMapper.toPrisma(course);

    await this.prisma.courses.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
}
