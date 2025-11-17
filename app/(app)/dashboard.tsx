import { ThemedText } from "@/components/themed-text";
import { useUser } from "@/store/store";
import { View } from "react-native";



export default function DashboadScreen(){

    const { pseudo} = useUser();

    return(
        <View>
            <ThemedText type='title'>
                Bonjour { pseudo }
            </ThemedText>
        </View>
    )
}