import { randomUUID } from 'crypto';
import { Replace } from '@helpers/Replace';
import { Description } from './description';

export interface LessonProps {
  name: string;
  description: Description;
  duration: number;
  video_id: string;
  course_id?: string;
  createdAt: Date;
}

export class Lesson {
  private _id: string;
  private props: LessonProps;

  constructor(props: Replace<LessonProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set description(description: Description) {
    this.props.description = description;
  }

  public get description(): Description {
    return this.props.description;
  }

  public set duration(duration: number) {
    this.props.duration = duration;
  }

  public get duration(): number {
    return this.props.duration;
  }

  public set video_id(video_id: string) {
    this.props.video_id = video_id;
  }

  public get video_id(): string {
    return this.props.video_id;
  }

  public get course_id(): string | undefined {
    return this.props.course_id;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}