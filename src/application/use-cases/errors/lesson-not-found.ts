export class LessonNotFound extends Error {
  constructor() {
    super('Lesson not found!');
  }
}
