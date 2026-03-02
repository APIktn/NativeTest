import { Slot } from 'expo-router';
import { BgVideo } from '@/components/bg-video';

export default function BgLayout() {
  return (
    <BgVideo>
      <Slot />
    </BgVideo>
  );
}
