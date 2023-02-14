import { Description } from '@application/entities/description';
import { CoursesRepository } from '@application/repositories/courses-repository';
import { LessonsRepository } from '@application/repositories/lessons-repository';
import { Injectable } from '@nestjs/common';
import { CourseNotFound } from '../errors/course-not-found';
import { LessonNotFound } from '../errors/lesson-not-found';

interface UpdateLessonRequest {
  lesson: {
    name?: string;
    description?: Description;
    duration?: number;
    video_id?: string;
    course_id?: string;
  };
  lessonId: string;
}

@Injectable()
export class UpdateLesson {
  constructor(
    private lessonsRepository: LessonsRepository,
    private coursesRepository: CoursesRepository,
  ) {}

  async execute(request: UpdateLessonRequest): Promise<void> {
    const { lesson, lessonId } = request;

    const findLesson = await this.lessonsRepository.findById(lessonId);

    if (!findLesson) throw new LessonNotFound();

    if (lesson.name) findLesson.name = lesson.name;
    if (lesson.description) findLesson.description = lesson.description;
    if (lesson.duration) findLesson.duration = lesson.duration;
    if (lesson.video_id) findLesson.video_id = lesson.video_id;

    if (lesson.course_id) {
      const courseExists = await this.coursesRepository.findById(
        lesson.course_id,
      );

      if (!courseExists) throw new CourseNotFound();

      findLesson.course_id = courseExists.id;
    }

    await this.lessonsRepository.save(findLesson);
  }
}
