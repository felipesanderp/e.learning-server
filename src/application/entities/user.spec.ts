import { User } from './user';

describe('User', () => {
  it('should be able to create a new User', () => {
    const user = new User({
      name: 'John',
      surname: 'Doe',
      email: 'john@example.com',
      password: 'password',
      role: 'student',
    });

    expect(user).toBeTruthy();
  });
});
