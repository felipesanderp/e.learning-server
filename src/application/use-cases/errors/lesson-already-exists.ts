export class LessonAlreadyExists extends Error {
  constructor() {
    super('Lesson already exists!');
  }
}
