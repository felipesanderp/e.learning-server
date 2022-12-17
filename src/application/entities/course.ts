import { randomUUID } from 'crypto';
import { Replace } from '@helpers/Replace';
import { Description } from './description';

export interface CourseProps {
  title: string;
  slug: string;
  description: Description;
  imageURL: string;
  createdAt: Date;
}

export class Course {
  private _id: string;
  private props: CourseProps;

  constructor(props: Replace<CourseProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get title(): string {
    return this.props.title;
  }

  public set slug(slug: string) {
    this.props.slug = slug;
  }

  public get slug(): string {
    return this.props.slug;
  }

  public set description(description: Description) {
    this.props.description = description;
  }

  public get description(): Description {
    return this.props.description;
  }

  public set imageURL(imageURL: string) {
    this.props.imageURL = imageURL;
  }

  public get imageURL(): string {
    return this.props.imageURL;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
