import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Button } from "react-native-paper";
import { StateView } from "./Welcome";


type Props = {
    changeView: (view: StateView) => void
}

function AlreadyAccount({changeView}: Props){

    const displayMenu = () => {
        changeView("menu");
    }
    return (
        <ThemedView>
            <ThemedText>
                DÉJÀ UN COMPTE
            </ThemedText>
            <Button
            mode="contained"
            onPress={ displayMenu}
            buttonColor='#121542'
            textColor='#06EEE1'
        >
            retour au menu
        </Button>
        </ThemedView>
    )
}


export default AlreadyAccount;