import { Stack } from 'expo-router';

//  A FAIRE


// Ce layout gère tous les écrans d'authentification (Inscription, Sync, Bloqué)
// et est injecté dans le RootLayout via le Slot lorsque l'utilisateur n'est pas authentifié.
export default function AppLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen 
                // Écran du dashboard utilisateur
                name="dashboard" 
                options={{ 
                    title: "dashboard", 
                    gestureEnabled: false // Empêche le balayage pour revenir, car c'est le début du flow
                }}
            />
            {/* Ajouter ici sync.tsx ou register.tsx si vous les séparez du welcome.tsx */}
        </Stack>
    );
}