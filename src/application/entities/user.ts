import { Replace } from '@helpers/Replace';
import { randomUUID } from 'crypto';

interface UserProps {
  name: string;
  surname?: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'PROFESSOR' | 'STUDENT';
  createdAt: Date;
  updatedAt?: Date | null;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: Replace<UserProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get surname(): string | undefined {
    return this.props.surname;
  }

  public set surname(surname: string | undefined) {
    this.props.surname = surname;
  }

  public get email(): string {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get password(): string {
    return this.props.password;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get role(): 'ADMIN' | 'PROFESSOR' | 'STUDENT' {
    return this.props.role;
  }

  public set role(role: 'ADMIN' | 'PROFESSOR' | 'STUDENT') {
    this.props.role = role;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }
}
