import { Slot, router } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '@/context/auth.context';

export default function ProtectLayout() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login' as any);
    }
  }, [user, isLoading]);

  if (isLoading || !user) return null;

  return <Slot />;
}
