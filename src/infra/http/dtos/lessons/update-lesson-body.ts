import { Length } from 'class-validator';

export class UpdateLessonBody {
  @Length(5, 240)
  name: string;

  @Length(5, 240)
  description: string;

  duration: number;

  video_id: string;

  course_id: string;
}
