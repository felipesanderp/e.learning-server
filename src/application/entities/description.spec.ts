import { Description } from './description';

describe('Course description', () => {
  it('should be able to create a course description', () => {
    const description = new Description('This is a course description');

    expect(description).toBeTruthy();
  });
});
