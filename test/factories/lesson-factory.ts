import { Lesson, LessonProps } from '@application/entities/lesson';
import { Description } from '@application/entities/description';

type Override = Partial<LessonProps>;

export function makeLesson(override: Override = {}) {
  return new Lesson({
    name: 'lesson-name',
    description: new Description('lesson-description'),
    duration: 120,
    video_id: 'video-id',
    canceledAt: null,
    ...override,
  });
}
