import request from 'supertest';
import { Test } from '@nestjs/testing';

import { INestApplication } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '../../http.module';

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

  it('(PUT) should be able to update a course', async () => {
    const course = await request(app.getHttpServer()).post('/courses').send({
      title: 'update-course',
      description: 'Course Description',
      imageURL: 'image-url-example',
    });

    const response = await request(app.getHttpServer())
      .put(`/courses/${course.body.course.id}/update`)
      .send({
        title: 'course-title-updated',
      });

    expect(response.status).toBe(200);
    expect(response.body.course.title).toEqual('course-title-updated');
    expect(response.body.course.description).toEqual(
      expect.objectContaining({ description: 'Course Description' }),
    );
  });

  it('(PUT) should not be able to update a non existing course', async () => {
    const response = await request(app.getHttpServer())
      .put('/courses/non-existing-course-id/update')
      .send({
        title: 'course-title-updated',
      });

    expect(response.status).toBe(404);
  });

  it('(PATCH) should be able to cancel a course', async () => {
    const course = await request(app.getHttpServer()).post('/courses').send({
      title: 'cancel-course-title',
      description: 'course-description',
      imageURL: 'image-url-example',
    });

    const response = await request(app.getHttpServer())
      .patch(`/courses/${course.body.course.id}/cancel`)
      .expect(200);

    expect(response.body.course.isAvailable).toBeFalsy();
    expect(response.body.course).toHaveProperty('canceledAt');
  });

  it('(PATCH) should not be able to cancel a non existing course', async () => {
    const response = await request(app.getHttpServer()).patch(
      '/courses/non-existing-course/cancel',
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Course not found!');
  });

  it('(DELETE) should be able to delete a course', async () => {
    const course = await request(app.getHttpServer()).post('/courses').send({
      title: 'delete-course-title',
      description: 'course-description',
      imageURL: 'image-url-example',
    });

    await request(app.getHttpServer())
      .delete(`/courses/${course.body.course.id}/remove`)
      .expect(200);
  });

  it('(DELETE) should not be able to remove a non existing course', async () => {
    await request(app.getHttpServer())
      .patch('/courses/non-existing-course/remove')
      .expect(404);
  });
});
