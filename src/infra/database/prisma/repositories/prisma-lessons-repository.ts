import { Injectable } from '@nestjs/common';

import { Lesson } from '@application/entities/lesson';
import { LessonsRepository } from '@application/repositories/lessons-repository';

import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaLessonsRepository implements LessonsRepository {
  constructor(private prisma: PrismaService) {}

  async create(lesson: Lesson): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findByName(name: string): Promise<Lesson | null> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Lesson | null> {
    throw new Error('Method not implemented.');
  }

  async findAllLessons(): Promise<Lesson[]> {
    throw new Error('Method not implemented.');
  }

  async remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async save(lesson: Lesson): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findAllAvailableLessons(): Promise<Lesson[]> {
    throw new Error('Method not implemented.');
  }

  async findLessonByCourseId(
    courseId: string | undefined,
  ): Promise<Lesson | null> {
    throw new Error('Method not implemented.');
  }
}
