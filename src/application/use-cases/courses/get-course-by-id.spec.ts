import { InMemoryCoursesRepository } from '@test/repositories/in-memory-courses-repository';
import { CourseNotFound } from '../errors/course-not-found';
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
    const { course: courseCreated } = await createCourse.execute({
      title: 'title-example',
      slug: 'slug-example',
      description: 'course-description',
      imageURL: 'image-url-example',
    });

    const { course } = await getCourseById.execute(courseCreated.id);

    expect(coursesRepository.courses[0]).toEqual(course);
    expect(course).toEqual(expect.objectContaining({ _id: courseCreated.id }));
  });

  it('should not be able to get a course that does not exist', async () => {
    const fakeId = 'fake-course-id';

    expect(async () => {
      await getCourseById.execute(fakeId);
    }).rejects.toThrow(CourseNotFound);
  });
});
