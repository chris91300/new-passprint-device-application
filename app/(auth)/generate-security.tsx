
import AuthContainer from "@/components/authcontainer";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import useGenerateSecurity from "@/hooks/useGenerateSecurity";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


function GenerateSecurityScreen(){

    const router = useRouter();
    const { secure } = useGenerateSecurity();
   
   

    useEffect(()=>{       

        if( secure !== "pending" && secure === true ){
            router.push("/sign-in-form")
           // on redirige vers la page de formulaire
        }
        if( secure !== "pending" && secure === false ){
            router.push("/password-form")
           // on redirige vers la page de formulaire
        }
    }, [secure, router])
    

    return (
        <AuthContainer>
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
        </ThemedView>
        </AuthContainer>
    )
}



export default GenerateSecurityScreen
