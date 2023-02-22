import { Users } from './users';

describe('Users', () => {
  it('should be able to create a new User', () => {
    const user = new Users({
      name: 'John',
      surname: 'Doe',
      email: 'john@example.com',
      password: 'password',
      role: 'student',
    });

    expect(user).toBeTruthy();
  });
});
