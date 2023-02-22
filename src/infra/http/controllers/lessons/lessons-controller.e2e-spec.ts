import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { Courses, Lessons } from '@prisma/client';

import { HttpModule } from '../../http.module';
import { DatabaseModule } from '@infra/database/database.module';
import { PrismaService } from '@infra/database/prisma/prisma.service';

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

    await prisma.lessons.create({
      data: {
        id: randomUUID(),
        name: 'canceled-lesson',
        description: 'canceled-lesson-description',
        duration: 60,
        video_id: 'lesson-video_id',
        isAvailable: false,
      },
    });
  });

  it('(GET) should be able to get all lessons', async () => {
    const { status, body } = await request(app.getHttpServer())
      .get('/lessons')
      .expect(200);

    expect(status).toBe(200);
    expect(body.lessons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'lesson-1' }),
        expect.objectContaining({ isAvailable: false }),
      ]),
    );
    expect(body.lessons).toHaveLength(3);
  });

  it('(GET) should be able to get a lesson by course_id', async () => {
    const { status, body } = await request(app.getHttpServer()).get(
      `/lessons/by_course/${course.id}`,
    );

    expect(status).toBe(200);
    expect(body.lesson).toHaveProperty('course_id', course.id);
  });

  it('(GET) should be able to get all available lessons', async () => {
    const { status, body } = await request(app.getHttpServer()).get(
      '/lessons/available',
    );

    expect(status).toBe(200);
    expect(body.lessons).toHaveLength(2);
  });

  it('(POST) should be able to create a new lesson', async () => {
    const { status, body } = await request(app.getHttpServer())
      .post('/lessons')
      .send({
        name: 'lesson-test',
        description: 'lesson-description',
        video_id: 'video_id_test',
        duration: 60,
      });

    expect(status).toBe(201);
    expect(body.lesson).toHaveProperty('name');
  });

  it('(POST) should not be able to create a new lesson with existing name', async () => {
    const { status, body } = await request(app.getHttpServer())
      .post('/lessons')
      .send({
        name: 'lesson-1',
      });

    expect(status).toBe(400);
    expect(body.message).toBe('Lesson already exists!');
  });

  it('(PUT) should be able to update a lesson', async () => {
    const { status, body } = await request(app.getHttpServer())
      .put(`/lessons/${lesson.id}/update`)
      .send({
        name: 'lesson-updated-name',
        course_id: course.id,
      });

    expect(status).toBe(200);
    expect(body.lesson).toHaveProperty('name', 'lesson-updated-name');
    expect(body.lesson).toHaveProperty('course_id', course.id);
  });

  it('(PATCH) should be able to cancel a lesson', async () => {
    const { status, body } = await request(app.getHttpServer()).patch(
      `/lessons/${lesson.id}/cancel`,
    );

    expect(status).toBe(200);
    expect(body.lesson).toHaveProperty('isAvailable', false);
    expect(body.lesson).toHaveProperty('canceledAt');
  });

  it('(DELETE) should be able to delete a lesson', async () => {
    const { status } = await request(app.getHttpServer()).delete(
      `/lessons/${lesson.id}/remove`,
    );

    expect(status).toBe(200);
  });
});
