import { Replace } from '@helpers/Replace';
import { randomUUID } from 'crypto';

export interface EnrollmentProps {
  userId: string;
  courseId: string;
  canceledAt?: Date | null;
  createdAt: Date;
}

export class Enrollment {
  private _id: string;
  private props: EnrollmentProps;

  constructor(
    props: Replace<EnrollmentProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public set courseId(courseId: string) {
    this.props.courseId = courseId;
  }

  public get courseId(): string {
    return this.props.courseId;
  }

  public cancel() {
    this.props.canceledAt = new Date();
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
