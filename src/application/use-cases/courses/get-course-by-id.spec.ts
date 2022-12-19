import { Course } from '@application/entities/course';
import { Description } from '@application/entities/description';
import { InMemoryCoursesRepository } from '@test/repositories/in-memory-courses-repository';
import { CreateCourse } from './create-course';
import { GetCourseById } from './get-course-by-id';

let coursesRepository: InMemoryCoursesRepository;
let createCourse: CreateCourse;
let getCourseById: GetCourseById;

describe('Get Course by ID', () => {
  beforeEach(() => {
    coursesRepository = new InMemoryCoursesRepository();
    createCourse = new CreateCourse(coursesRepository);
    getCourseById = new GetCourseById(coursesRepository);
  });

  it('should be able to find a course by id', async () => {
    const courseCreated = new Course({
      title: 'title-example',
      slug: 'slug-example',
      description: new Description('course-description'),
      imageURL: 'image-url-example',
    });

    const { course } = await getCourseById.execute(courseCreated.id);

    expect(courseCreated).toEqual(course);
  });
});
