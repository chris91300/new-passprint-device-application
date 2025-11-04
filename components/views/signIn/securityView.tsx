import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import useGenerateSecurity from "@/hooks/useGenerateSecurity";
import { useEffect } from "react";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { StateSignInView } from "../firstTime/signInView";

type Props = {
    changeSignInView: (view: StateSignInView) => void
}

function SecurityView({ changeSignInView }: Props){

    const { secure } = useGenerateSecurity();
   
   

    useEffect(()=>{
         const displayForm = () => {
        changeSignInView("form");
    }
        secure === true && displayForm();
    }, [secure, changeSignInView])
    

    return (
        <ThemedView>
            {
                secure === "pending" && (
                    <>
                    <ThemedText>
                        Génération d'un environnement sécurisé
                    </ThemedText>
                    <ActivityIndicator animating={true} color={MD2Colors.red800} />
                    </>
                    
                )
            }
            {
                !secure && <ThemedText>Une erreur est survenue lors de la génération d'un environnement sécurisé.</ThemedText>
            }
                
            
            
        </ThemedView>
    )
}



export default SecurityView