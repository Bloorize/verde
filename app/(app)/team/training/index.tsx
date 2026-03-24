import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function TrainingIndexScreen() {
  return (
    <RouteScreen
      title="Training"
      description="Training sessions, courses, transcripts, and attendance details."
      links={[
        { href: '/team/training/sessions', label: 'Sessions' },
        { href: '/team/training/courses', label: 'Courses' },
        { href: '/team/training/transcript', label: 'Transcript' },
      ]}
    />
  );
}
