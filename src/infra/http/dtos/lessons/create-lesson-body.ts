import { IsNotEmpty, Length } from 'class-validator';

export class CreateLessonBody {
  @IsNotEmpty()
  @Length(5, 240)
  name: string;

  @IsNotEmpty()
  @Length(5, 240)
  description: string;

  @IsNotEmpty()
  duration: number;

  @IsNotEmpty()
  video_id: string;

  course_id: string;
}
