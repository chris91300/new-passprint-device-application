import AuthContainer from "@/components/authcontainer";
import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";



export default function BlockedAccountScreen(){


    return(
        <AuthContainer>
            <View>
                <ThemedText type='title'>
                    Compte bloqué
                </ThemedText>
            </View>
        </AuthContainer>
    )
}