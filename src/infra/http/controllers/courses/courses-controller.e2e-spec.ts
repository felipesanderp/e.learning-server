import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '../../http.module';
import { PrismaService } from '@infra/database/prisma/prisma.service';

import { Courses } from '@prisma/client';

describe('Course Controller', () => {
  let app: INestApplication;
  let prisma: PrismaService;
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

    await prisma.courses.create({
      data: {
        id: randomUUID(),
        title: 'course-2',
        description: 'course-description',
        imageURL: 'image-url',
      },
    });
  });

  it('(GET) should be able to get all courses', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/courses')
      .expect(200);

    expect(body.courses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'course-1' }),
        expect.objectContaining({ title: 'course-2' }),
      ]),
    );
    expect(body.courses).toHaveLength(2);
  });

  it('(GET) should be able to get a course by id', async () => {
    const { status, body } = await request(app.getHttpServer()).get(
      `/courses/${course.id}`,
    );

    expect(status).toBe(200);
    expect(body.course.id).toEqual(course.id);
    expect(body.course.title).toEqual(course.title);
  });

  it('(GET) should not be able to get a non existing course by id', async () => {
    const response = await request(app.getHttpServer()).get(
      '/courses/non-existing-id',
    );

    expect(response.status).toBe(404);
  });

  it('(POST) should be able to create a new course', async () => {
    const { status, body } = await request(app.getHttpServer())
      .post('/courses')
      .send({
        title: 'New Course Title',
        description: 'Course Description',
        imageURL: 'image-url-example',
      });

    expect(status).toBe(201);
    expect(body).toHaveProperty(['course', 'id']);
    expect(body.error).toBeFalsy();
  });

  it('(POST) should not be able to create a new course with existing title', async () => {
    const { status } = await request(app.getHttpServer())
      .post('/courses')
      .send({
        title: 'course-1',
        description: 'course-description',
        imageURL: 'image-url-example',
      });

    expect(status).toBe(400);
  });

  it('(PUT) should be able to update a course', async () => {
    const { status, body } = await request(app.getHttpServer())
      .put(`/courses/${course.id}/update`)
      .send({
        title: 'course-title-updated',
      });

    expect(status).toBe(200);
    expect(body.course.title).toEqual('course-title-updated');
    expect(body.course.description).toEqual(
      expect.objectContaining({ description: 'course-description' }),
    );
  });

  it('(PUT) should not be able to update a non existing course', async () => {
    const { status } = await request(app.getHttpServer())
      .put('/courses/non-existing-course-id/update')
      .send({
        title: 'course-title-updated',
      });

    expect(status).toBe(404);
  });

  it('(PATCH) should be able to cancel a course', async () => {
    const { status, body } = await request(app.getHttpServer()).patch(
      `/courses/${course.id}/cancel`,
    );

    expect(status).toBe(200);

    expect(body.course.isAvailable).toBeFalse();
    expect(body.course).toHaveProperty('canceledAt');
  });

  it('(PATCH) should not be able to cancel a non existing course', async () => {
    const { status, body } = await request(app.getHttpServer()).patch(
      '/courses/non-existing-course/cancel',
    );

    expect(status).toBe(404);
    expect(body.message).toBe('Course not found!');
  });

  it('(DELETE) should be able to delete a course', async () => {
    const { status } = await request(app.getHttpServer()).delete(
      `/courses/${course.id}/remove`,
    );

    expect(status).toBe(200);
  });

  it('(DELETE) should not be able to remove a non existing course', async () => {
    await request(app.getHttpServer())
      .patch('/courses/non-existing-course/remove')
      .expect(404);
  });
});
