import { useLocalSearchParams } from 'expo-router';

import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function InspectTemplateDetailScreen() {
  const { templateId } = useLocalSearchParams<{ templateId: string }>();

  return (
    <RouteScreen
      title={`Template ${templateId}`}
      description="Template detail placeholder with checklist item definitions and scheduling context."
    />
  );
}
