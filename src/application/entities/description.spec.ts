import { Description } from './description';

describe('Course description', () => {
  it('should be able to create a course description', () => {
    const description = new Description('This is a course description');

    expect(description).toBeTruthy();
  });

  it('should not be able to create a course description with less than 5 characters', () => {
    expect(() => new Description('aaa')).toThrow();
  });

  it('should not be able to create a course description with more than 240 characters', () => {
    expect(() => new Description('a'.repeat(241))).toThrow();
  });
});
