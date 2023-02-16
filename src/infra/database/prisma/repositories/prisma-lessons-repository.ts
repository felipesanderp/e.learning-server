import { Injectable } from '@nestjs/common';

import { Lesson } from '@application/entities/lesson';
import { LessonsRepository } from '@application/repositories/lessons-repository';

import { PrismaService } from '../prisma.service';
import { PrismaLessonMapper } from '../mappers/prisma-lesson-mapper';

@Injectable()
export class PrismaLessonsRepository implements LessonsRepository {
  constructor(private prisma: PrismaService) {}

  async create(lesson: Lesson): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findByName(name: string): Promise<Lesson | null> {
    const lesson = await this.prisma.lessons.findFirst({
      where: {
        name,
      },
    });

    if (!lesson) {
      return null;
    }

    return PrismaLessonMapper.toDomain(lesson);
  }

  async findById(id: string): Promise<Lesson | null> {
    const lesson = await this.prisma.lessons.findUnique({
      where: {
        id,
      },
    });

    if (!lesson) {
      return null;
    }

    return PrismaLessonMapper.toDomain(lesson);
  }

  async findAllLessons(): Promise<Lesson[]> {
    const lessons = await this.prisma.lessons.findMany();

    return lessons.map(PrismaLessonMapper.toDomain);
  }

  async findLessonByCourseId(
    courseId: string | null | undefined,
  ): Promise<Lesson | null> {
    const lesson = await this.prisma.lessons.findFirst({
      where: {
        course_id: courseId,
      },
    });

    if (!lesson) {
      return null;
    }

    return PrismaLessonMapper.toDomain(lesson);
  }

  async findAllAvailableLessons(): Promise<Lesson[] | null> {
    const lessons = await this.prisma.lessons.findMany({
      where: {
        isAvailable: true,
      },
    });

    if (!lessons) {
      return null;
    }

    return lessons.map(PrismaLessonMapper.toDomain);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.lessons.delete({
      where: {
        id,
      },
    });
  }

  async save(lesson: Lesson): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
