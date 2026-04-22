import { Stack } from 'expo-router';

import { prototypeScreenNames } from '@/src/features/prototypes/types';

export default function PrototypesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      {prototypeScreenNames.map((screenName) => (
        <Stack.Screen key={screenName} name={screenName} />
      ))}
    </Stack>
  );
}
