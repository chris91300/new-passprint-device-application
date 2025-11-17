import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default async function getPushToken(): Promise<string> {
    let token: string | undefined;

    // Récupérer le projectId en toute sécurité
    const projectId: string | undefined = 
        Constants?.expoConfig?.extra?.eas?.projectId || 
        Constants?.easConfig?.projectId;
        
    // 🛑 Gérer le cas où le projectId est manquant (et ne doit pas bloquer)
    if (!projectId) {
        console.log('Expo Project ID (projectId) not found. Push notifications will be unavailable.');
        return 'PROJECT_ID_MISSING'; // Retourne une valeur d'erreur explicite
    }

    if (Device.isDevice) {
        // 1. Demander les permissions
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        // 2. Récupérer le token si les permissions sont accordées
        if (finalStatus === 'granted') {
            try {
                // Utilisation du projectId sécurisé
                token = (
                    await Notifications.getExpoPushTokenAsync({ projectId })
                ).data;
            } catch (error) {
                console.error("Erreur lors de la récupération du Push Token :", error);
                // En cas d'erreur de réseau/service, on renvoie une erreur interne
                token = 'TOKEN_FETCH_ERROR';
            }

        } else {
            console.log('Permission de notification refusée.');
            token = 'PERMISSION_DENIED';
        }
    } else {
        // Avertissement pour les simulateurs/émulateurs
        console.log('Must use physical device for Push Notifications. Returning mock token.');
        token = 'MOCK_TOKEN_SIMULATOR'; 
    }

    // Retourne le token (ou la raison de l'échec)
    return token || 'N/A';
}