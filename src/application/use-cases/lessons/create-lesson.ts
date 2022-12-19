import { Description } from '@application/entities/description';
import { Lesson } from '@application/entities/lesson';
import { LessonsRepository } from '@application/repositories/lessons-repository';
import { Injectable } from '@nestjs/common';

interface CreateLessonRequest {
  name: string;
  description: Description;
  duration: number;
  video_id: string;
  course_id?: string;
}

interface CreateLessonResponse {
  lesson: Lesson;
}

@Injectable()
export class CreateLesson {
  constructor(private lessonsRepository: LessonsRepository) {}

  async execute(request: CreateLessonRequest): Promise<CreateLessonResponse> {
    const { name, description, duration, video_id, course_id } = request;

    const lesson = new Lesson({
      name,
      description,
      duration,
      video_id,
      course_id,
    });

    await this.lessonsRepository.create(lesson);

    return {
      lesson,
    };
  }
}
