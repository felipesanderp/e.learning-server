import { IsNotEmpty, Length } from 'class-validator';

export class CreateCourseBody {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @Length(5, 240)
  description: string;

  @IsNotEmpty()
  imageURL: string;
}
