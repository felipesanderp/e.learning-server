import { Description } from './description';
import { Lesson } from './lesson';

describe('Lesson', () => {
  it('should be able to create a new lesson', () => {
    const lesson = new Lesson({
      name: 'lesson-example',
      description: new Description('lesson-description-example'),
      duration: 120,
      video_id: 'video-id-example',
      course_id: 'course-id',
    });

    expect(lesson).toBeTruthy();
  });
});
