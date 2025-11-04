import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { StateView } from "../firstTime/Welcome";
import { StateSignInView } from "../firstTime/signInView";

type Props = {
    changeView: (view: StateView) => void,
    changeSignInView: (view: StateSignInView) => void
}

function StartSignInView({changeView, changeSignInView}: Props){

    const buttonSize = {width: 300};
    const displayMenu = () => {
        changeView("menu");
    }

    const startSignIn = () => {
        changeSignInView("security");
    }

    return (
        <>
        <ThemedText>
          Pour votre inscription à Passprint je vais d'abord créer un environnement sécurisé pour votre appareil, puis vous demander de remplir un petit formulaire.
        </ThemedText>
        <ThemedView style={styles.buttonContainer}>
        <Button
            mode="contained"
            onPress={ startSignIn}
            buttonColor='#121542'
            textColor='#06EEE1'
            style= {buttonSize}
        >
            commencer
        </Button>
        
        <Button
            mode="contained"
            onPress={ displayMenu}
            buttonColor='#121542'
            textColor='#06EEE1'
            style= {buttonSize}
        >
            retour au menu
        </Button>
        </ThemedView>
        </>
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


export default StartSignInView;
