import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function TrainingTranscriptScreen() {
  return (
    <RouteScreen
      title="Training Transcript"
      description="Aggregate transcript view for selected employee/site context."
      bullets={['Course completion rates', 'Expired certifications', 'Upcoming required sessions']}
    />
  );
}
