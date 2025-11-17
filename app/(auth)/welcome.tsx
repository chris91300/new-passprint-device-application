import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';


function WelcomeScreen() {
   
    const alreadyHaveAccount = ()=>{
      // il faudra rediriger vers la page de synchronisation
    }

  const buttonSize = {width: 300};
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#121542', dark: '#1D3D47' }}      
      headerImage={
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">PASSPRINT</ThemedText>   
      </ThemedView>
      <ThemedText>
          Il semblerait que Passprint ne soit pas configuré sur votre appareil.
      </ThemedText>
   
    <ThemedView style={styles.buttonContainer}>
      <Link href="/sign-in-informations" push asChild>
          <Button
              mode="contained"
              buttonColor='#121542'
              textColor='#06EEE1'
              style= {buttonSize}
          >
              Je veux créer un compte
          </Button>
      </Link>
          
          <Button
              mode="outlined"
              onPress={alreadyHaveAccount}
              textColor='#121542'
              buttonColor='#06EEE1'
              style= {buttonSize}
          >
              J'ai déjà un compte
          </Button>
      </ThemedView>
    </ParallaxScrollView>
  )
}

export default WelcomeScreen


const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  titleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  reactLogo: {
    height: 200,
    width: 150,
    bottom: 0,
    left: "50%",
    transform: [{ translateX: '-50%' }],
    position: 'absolute',
  },
})

