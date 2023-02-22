import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import { UsersRepository } from '@application/repositories/users-repository';
import { User } from '@application/entities/user';

interface CreateUserRequest {
  name: string;
  surname?: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'PROFESSOR' | 'STUDENT';
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { name, surname, email, password, role } = request;

    const hashPassword = await hash(password, 10);

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) throw new Error(`User already exists!`);

    const user = new User({
      name,
      surname,
      email,
      password: hashPassword,
      role,
    });

    await this.usersRepository.create(user);

    return {
      user,
    };
  }
}
