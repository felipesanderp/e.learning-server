import request from 'supertest';
import { Test } from '@nestjs/testing';

import { INestApplication } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '../http.module';

let app: INestApplication;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [DatabaseModule, HttpModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();
});

it('/GET courses', async () => {
  const response = await request(app.getHttpServer())
    .get('/courses')
    .expect(200);

  expect(response.body).toEqual(expect.objectContaining({ courses: [] }));
});

it('/POST new course', async () => {
  const response = await request(app.getHttpServer()).post('/courses').send({
    title: 'New Course',
    description: 'Course Description',
    imageURL: 'image-url-example',
  });

  expect(response.status).toBe(201);
  expect(response.body.error).toBeFalsy();
});
