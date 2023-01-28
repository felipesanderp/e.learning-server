import request from 'supertest';
import { CoursesController } from './courses.controller';

test('[e2e] GetAllCourses', async () => {
  const response = await request(CoursesController).get('courses');

  expect(response.status).toBe(200);
});
