import { Stack } from 'expo-router';

export default function PublicLayout() {
  return (
    <Stack>
      <Stack.Screen name="safety/index" options={{ title: 'Public Safety Portal' }} />
      <Stack.Screen name="safety/sds" options={{ title: 'SDS' }} />
      <Stack.Screen name="safety/insurance-card" options={{ title: 'Insurance Card' }} />
      <Stack.Screen name="safety/claim-card" options={{ title: 'Claim Card' }} />
      <Stack.Screen name="safety/incident-response" options={{ title: 'Incident Response' }} />
      <Stack.Screen name="safety/incident-intake" options={{ title: 'Incident Intake' }} />
    </Stack>
  );
}
