import AuthContainer from "@/components/authcontainer";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";


function SignInInformationsScreen(){

    const buttonSize = {width: 300};

    return (
        <AuthContainer>
            <ThemedText>
            Pour votre inscription à Passprint je vais d'abord créer un environnement sécurisé pour votre appareil, puis vous demander de remplir un petit formulaire.
            </ThemedText>
            <ThemedView style={styles.buttonContainer}>
            <Link href="/generate-security" push asChild>
                <Button
                    mode="contained"
                    buttonColor='#121542'
                    textColor='#06EEE1'
                    style= {buttonSize}
                >
                    commencer
                </Button>
            </Link>
            <Link href="/welcome" push asChild>
            <Button
                mode="contained"
                buttonColor='#121542'
                textColor='#06EEE1'
                style= {buttonSize}
            >
                retour au menu
            </Button>
            </Link>
            </ThemedView>
        </AuthContainer>
    )
}



const styles = StyleSheet.create({  
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 20
  }
})


export default SignInInformationsScreen;
