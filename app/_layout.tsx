import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import VerifyIdentity from '@/components/views/verifyIdentity';
import Welcome from '@/components/views/Welcome';
import useIsFirstTime from '@/hooks/is-this-the-first-time';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { install } from 'react-native-quick-crypto';

install();

export default function HomeScreen() {

  const { isFirstTime } = useIsFirstTime();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        {
          isFirstTime === undefined ?
            <VerifyIdentity/>
          :
          isFirstTime === true ?
          <Welcome/>
          :
          <ThemedText type="title">Vous avez déjà utilisé l'application</ThemedText>

        }
        
           
              
      </ThemedView>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});




const KEYCHAIN_SERVICE = 'com.passprint.cryptokeys';

export const getStoredSecretsSecured = async () => {
    try {
        const credentials = await Keychain.getGenericPassword({
            service: KEYCHAIN_SERVICE,
            
            // 🛑 C'est le paramètre CRITIQUE 🛑
            accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,             
            
            authenticationPrompt: {
                title: 'Vérification Passprint',
                subtitle: 'Authentification requise pour déverrouiller vos clés cryptographiques',
            },
        });

        if (!credentials) {
           throw new Error("no credentials found.")
        }
        return JSON.parse(credentials.password);

    } catch (error) {
        // L'erreur ici signifie généralement que l'utilisateur a annulé ou que la biométrie a échoué.
        console.error("Échec de l'accès biométrique ou annulation :", error);
        return null;
    }
};




































/*import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="ensureDeviceEnrollment" options={{}} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}*/
