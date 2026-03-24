import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function CoverageQrEntryScreen() {
  return (
    <RouteScreen
      title="QR / Manual Entry"
      description="Capture service completion via QR scan or manual fallback entry."
      bullets={['Select space', 'Choose service frequency checkpoint', 'Mark complete and timestamp']}
    />
  );
}
