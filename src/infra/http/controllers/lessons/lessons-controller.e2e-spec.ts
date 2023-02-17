import request from 'supertest';
import { Test } from '@nestjs/testing';

import { Courses, Lessons } from '@prisma/client';

import { INestApplication } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '../../http.module';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { randomUUID } from 'crypto';

describe('Lessons Controller', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let lesson: Lessons;
  let course: Courses;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule, HttpModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    await app.init();

    course = await prisma.courses.create({
      data: {
        id: randomUUID(),
        title: 'course-1',
        description: 'course-description',
        imageURL: 'image-url',
      },
    });

    lesson = await prisma.lessons.create({
      data: {
        id: randomUUID(),
        name: 'lesson-1',
        description: 'lesson-description',
        duration: 60,
        video_id: 'lesson-video_id',
      },
    });

    await prisma.lessons.create({
      data: {
        id: randomUUID(),
        name: 'lesson-with-course-id',
        description: 'lesson-description',
        duration: 60,
        video_id: 'lesson-video_id',
        course_id: course.id,
      },
    });
  });

  it('(GET) should be able to get all lessons', async () => {
    const { status, body } = await request(app.getHttpServer())
      .get('/lessons')
      .expect(200);

    expect(status).toBe(200);
    expect(body.lessons).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'lesson-1' })]),
    );
  });

  it('(GET) should be able to get a lesson by course_id', async () => {
    const { status, body } = await request(app.getHttpServer()).get(
      `/lessons/by_course/${course.id}`,
    );

    expect(status).toBe(200);
  });

  // it('(POST) should be able to create a new lesson', async () => {
  //   const response = await request(app.getHttpServer())
  //     .post('/lessons')
  //     .send({
  //       name: 'lesson-test',
  //       description: 'lesson-description',
  //       video_id: 'video_id_test',
  //       duration: 60,
  //     })
  //     .expect(201);
  // });

  // it('(PUT) should be able to update a lesson', async () => {

  // });
});
