import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useColorScheme } from '@/hooks/use-color-scheme';

const bgVideo = {
  dark: require('../assets/video/bg_dark_video.mp4'),
  light: require('../assets/video/bg_light_video.mp4'),
};

export function BgVideo({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme() ?? 'light';
  const { width, height } = useWindowDimensions();

  const videoRatio = 16 / 9;
  const screenRatio = width / height;

  let videoWidth = width;
  let videoHeight = height;

  if (screenRatio > videoRatio) {
    videoWidth = width;
    videoHeight = width / videoRatio;
  } else {
    videoHeight = height;
    videoWidth = height * videoRatio;
  }

  return (
    <View style={styles.wrapper}>
      <Video
        source={bgVideo[colorScheme]}
        style={{
          position: 'absolute',
          width: videoWidth,
          height: videoHeight,
          alignSelf: 'center',
        }}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    overflow: 'hidden',
  },
});
