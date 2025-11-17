import { Stack } from 'expo-router';

// Ce layout gère tous les écrans d'authentification (Inscription, Sync, Bloqué)
// et est injecté dans le RootLayout via le Slot lorsque l'utilisateur n'est pas authentifié.
export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
            <Stack.Screen 
                // Écran de bienvenue, inscription, et vérification initiale.
                // L'écran est maintenant appelé directement via la redirection dans app/index.tsx
                name="welcome" 
                options={{ 
                    title: "Nouvel utilisateur", 
                    gestureEnabled: false // Empêche le balayage pour revenir, car c'est le début du flow
                }}
            />
            <Stack.Screen 
                // Écran de bienvenue, inscription, et vérification initiale.
                // L'écran est maintenant appelé directement via la redirection dans app/index.tsx
                name="sign-in-informations" 
                options={{ 
                    title: "Informations avant inscription",
                    gestureEnabled: false // Empêche le balayage pour revenir, car c'est le début du flow
                }}
            />
            <Stack.Screen 
                // Écran de bienvenue, inscription, et vérification initiale.
                // L'écran est maintenant appelé directement via la redirection dans app/index.tsx
                name="generate-security" 
                options={{ 
                    title: "Création d'un environnement sécurisé",
                    gestureEnabled: false // Empêche le balayage pour revenir, car c'est le début du flow
                }}
            />
            <Stack.Screen 
                // Écran de bienvenue, inscription, et vérification initiale.
                // L'écran est maintenant appelé directement via la redirection dans app/index.tsx
                name="sign-in-form" 
                options={{ 
                    title: "Formulaire d'inscription",
                    gestureEnabled: false // Empêche le balayage pour revenir, car c'est le début du flow
                }}
            />
            <Stack.Screen 
                // Écran de bienvenue, inscription, et vérification initiale.
                // L'écran est maintenant appelé directement via la redirection dans app/index.tsx
                name="password-form" 
                options={{ 
                    title: "Mot de passe",
                    gestureEnabled: false // Empêche le balayage pour revenir, car c'est le début du flow
                }}
            />
             <Stack.Screen 
                // L'écran bloqué
                name="blocked-account" 
                options={{ 
                    title: "Accès Bloqué", 
                    gestureEnabled: false
                }}
            />
            {/* Ajouter ici sync.tsx ou register.tsx si vous les séparez du welcome.tsx */}
        </Stack>
    );
}