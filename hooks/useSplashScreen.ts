import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';

// Empêche le masquage automatique du splash screen tant que la vérification initiale n'est pas terminée
SplashScreen.preventAutoHideAsync();

export default function useSplashScreen(isLoading: boolean){

    // Cache le splash screen une fois la vérification initiale terminée
        useEffect(() => {
            if (!isLoading) {
                SplashScreen.hideAsync();
            }
        }, [isLoading])
}