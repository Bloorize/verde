import { Link, useRouter } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';

import { useAppStore } from '@/src/store/appStore';

export default function SignInScreen() {
  const router = useRouter();
  const signIn = useAppStore((state) => state.signIn);

  return (
    <View className="flex-1 items-center justify-center bg-[#f4f7f5] p-6">
      <View className="w-full max-w-md rounded-2xl border border-brand-100 bg-white p-6 shadow-card">
        <Text className="text-2xl font-bold text-slate-900">HeySage</Text>
        <Text className="mt-1 text-sm text-slate-500">Enterprise Operations Platform</Text>

        <TextInput placeholder="Email" className="mt-5 rounded-xl border border-slate-200 px-3 py-3 text-sm" />
        <TextInput placeholder="Password" secureTextEntry className="mt-3 rounded-xl border border-slate-200 px-3 py-3 text-sm" />

        <Pressable
          onPress={() => {
            signIn();
            router.replace('/home');
          }}
          className="mt-4 rounded-xl bg-brand-600 py-3"
        >
          <Text className="text-center text-sm font-semibold text-white">Sign In</Text>
        </Pressable>

        <Link href="/auth/forgot-password" className="mt-3 text-center text-sm font-semibold text-brand-700">
          Forgot Password?
        </Link>

        <Link href="/public/safety" className="mt-2 text-center text-xs font-semibold text-slate-500">
          Open Public Safety Portal
        </Link>
      </View>
    </View>
  );
}
