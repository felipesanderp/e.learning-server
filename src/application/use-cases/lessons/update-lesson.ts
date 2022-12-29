import { Description } from '@application/entities/description';
import { LessonsRepository } from '@application/repositories/lessons-repository';
import { Injectable } from '@nestjs/common';
import { LessonNotFound } from '../errors/lesson-not-found';

interface UpdateLessonRequest {
  lesson: {
    name?: string;
    description?: Description;
    duration?: number;
    video_id?: string;
  };
  lessonId: string;
}

@Injectable()
export class UpdateLesson {
  constructor(private lessonsRepository: LessonsRepository) {}

  async execute(request: UpdateLessonRequest): Promise<void> {
    const { lesson, lessonId } = request;

    const findLesson = await this.lessonsRepository.findById(lessonId);

    if (!findLesson) throw new LessonNotFound();

    if (lesson.name) findLesson.name = lesson.name;
    if (lesson.description) findLesson.description = lesson.description;
    if (lesson.duration) findLesson.duration = lesson.duration;
    if (lesson.video_id) findLesson.video_id = lesson.video_id;

    await this.lessonsRepository.save(findLesson);
  }
}
