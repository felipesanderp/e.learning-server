import { User } from '@application/entities/user';

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;
  abstract findById(id: string): Promise<User> | null;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAllUsers(): Promise<User[]>;
  abstract remove(id: string): Promise<void>;
  abstract save(user: User): Promise<void>;
}
