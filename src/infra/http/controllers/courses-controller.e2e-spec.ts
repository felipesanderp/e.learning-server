import request from 'supertest';
import { Test } from '@nestjs/testing';

import { INestApplication } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '../http.module';

let app: INestApplication;

describe('Course Controller', () => {
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule, HttpModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('(GET) should be able to get all courses', async () => {
    const response = await request(app.getHttpServer())
      .get('/courses')
      .expect(200);

    expect(response.body).toEqual(expect.objectContaining({ courses: [] }));
  });

  it('(GET) should be able to get a course by id', async () => {
    const course = await request(app.getHttpServer()).post('/courses').send({
      title: 'course-title',
      description: 'course-description',
      imageURL: 'image-url-example',
    });

    const response = await request(app.getHttpServer()).get(
      `/courses/${course.body.course.id}`,
    );

    expect(response.body.course.id).toEqual(course.body.course.id);
    expect(response.body.course.title).toEqual(course.body.course.title);
  });

  it('(GET) should not be able to get a non existing course by id', async () => {
    const response = await request(app.getHttpServer()).get(
      '/courses/non-existing-id',
    );

    expect(response.status).toBe(404);
  });

  it('(POST) should be able to create a new course', async () => {
    const response = await request(app.getHttpServer()).post('/courses').send({
      title: 'New Course Title',
      description: 'Course Description',
      imageURL: 'image-url-example',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(['course', 'id']);
    expect(response.body.error).toBeFalsy();
  });

  it('(POST) should not be able to create a new course with existing title', async () => {
    await request(app.getHttpServer()).post('/courses').send({
      title: 'existing-course',
      description: 'Course Description',
      imageURL: 'image-url-example',
    });

    const response = await request(app.getHttpServer()).post('/courses').send({
      title: 'existing-course',
      description: 'Course Description',
      imageURL: 'image-url-example',
    });

    expect(response.status).toBe(400);
  });
});
