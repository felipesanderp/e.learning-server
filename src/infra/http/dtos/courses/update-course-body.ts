import { Length } from 'class-validator';

export class UpdateCourseBody {
  title: string;

  @Length(5, 240)
  description: string;

  imageURL: string;
}
