import AuthContainer from '@/components/authcontainer';
import PasswordForm from '@/components/forms/passwordForm';
import { ThemedText } from '@/components/themed-text';
import PassprintService from '@/preparation/sdk/backend/PassprintForDevice';
import { useRouter } from 'expo-router';
import React from 'react';



function BiometrieNotAvailable() {

    const router = useRouter();

    const request = async (password: string) => {
        return PassprintService.generateSecureSetUpWithPassword(password);
    }

    const callback = () => router.push("/sign-in-form");

  return (
    <AuthContainer>
    <ThemedText>
        Il semblerait que l'accès à la biométrie ne soit pas possible.
    </ThemedText>
    <ThemedText>
        Vous ne l'avez peut être pas encore configuré, ou votre appareil à un problème pour y accéder.
        Quoi qu'il en soit, vous pouvez tout de même utiliser Passprint. Mais vous aurez besoin d'un mot de passe. C'est le seul que vous aurez à retenir. Il vous sera demandé à chaque fois que vous utilisé notre service.
    </ThemedText>

    <PasswordForm request={ request } callback={ callback } />
   
    </AuthContainer>
  )
}


/*
const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        flexDirection: 'column',
        gap: 10,
        marginTop: 20
    },
    button: {
        marginTop: 20
    },
    error: {
        color: 'red'
    },
    informations: {
        fontSize: 12
    }
})
*/

export default BiometrieNotAvailable