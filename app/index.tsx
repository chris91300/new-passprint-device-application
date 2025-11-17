import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';


export default function LoadingAuthSplashScreen(){


    return (
        <ParallaxScrollView
              headerBackgroundColor={{ light: '#121542', dark: '#1D3D47' }}      
              headerImage={
                <Image
                  source={require('@/assets/images/logo.png')}
                  style={styles.logo}
                />
              }>
              <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">PASSPRINT</ThemedText>   
              </ThemedView>

              <ThemedView style={styles.informationsContainer}>


              </ThemedView>
        </ParallaxScrollView>
    )
}

const styles = StyleSheet.create({
  
  titleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  informationsContainer: {
    flex: 1,
    height: 300
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  logo: {
    height: 200,
    width: 150,
    bottom: 0,
    left: "50%",
    transform: [{ translateX: '-50%' }],
    position: 'absolute',
  },
});