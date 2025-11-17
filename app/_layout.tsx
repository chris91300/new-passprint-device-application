import useAuth from '@/hooks/useAuth';
import useSplashScreen from '@/hooks/useSplashScreen';
import PassprintService from '@/preparation/sdk/backend/PassprintForDevice';
import { useUser } from '@/store/store';
import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { install } from 'react-native-quick-crypto';
import AuthentificationWithPasswordModal from './AuthentificationWithPasswordModal';

install();



export default function RootLayout() {

  const router = useRouter();
  const { setPseudo, setTypeOfAuthentification } = useUser();
  const { authentificationInProgress, newUserForThisDevice, userIsAuthenticated } = useAuth();
  useSplashScreen(authentificationInProgress);

  useEffect(()=>{
    newUserForThisDevice && router.replace('/(auth)/welcome')
    if( userIsAuthenticated ){
      const getData = async () => {
        const data = await PassprintService.getPseudoAndTypeOfAuthentification();
        if(data){
          const { username, password: typeOfAuthentification } = data as {username: string, password: 'biometrie' | 'password'};
          if(typeOfAuthentification !== 'biometrie' && typeOfAuthentification !== 'password') {
            throw new Error("Type of authentification invalide");
          }
          setPseudo(username);
          setTypeOfAuthentification(typeOfAuthentification);
          router.replace('/(app)/dashboard');
        }
      }
        
      getData();
      
    }

  }, [newUserForThisDevice, userIsAuthenticated, , setPseudo, setTypeOfAuthentification, router]);

  return (
    <>
    <Slot/>
    <AuthentificationWithPasswordModal/>
    </>
      
  )
}
/*
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
  reactLogo: {
    height: 200,
    width: 150,
    bottom: 0,
    left: "50%",
    transform: [{ translateX: '-50%' }],
    position: 'absolute',
  },
});
*/


/*
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
*/



































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
