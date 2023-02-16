import request from 'supertest';
import { Test } from '@nestjs/testing';

import { INestApplication } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '../../http.module';

let app: INestApplication;

describe('Lessons Controller', () => {
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule, HttpModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('(GET) should be able to get all lessons', async () => {
    const response = await request(app.getHttpServer())
      .get('/lessons')
      .expect(200);

    expect(response.body).toEqual(expect.objectContaining({ lessons: [] }));
  });
});
