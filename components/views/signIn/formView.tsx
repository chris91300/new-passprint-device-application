import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import PassprintService from "@/preparation/sdk/backend/PassprintForDevice";
import { useUser } from "@/store/store";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, MD2Colors, TextInput } from 'react-native-paper';
import * as z from "zod";

const pseudoRegex = /^[a-zA-Z0-9._-]{3,24}$/;

function FormSignIn(){

    const { device, setPseudo, setInformations, biometryIsAvailable, requestPassword, hidePasswordModal } = useUser();
    const [pseudoUser, setPseudoUser] = useState('');
    const [email, setEmail] = useState('');
    const [ error, setError ] = useState("");
    const [ pending, setPending ] = useState(false);



    const checkValues = () => {
        z
        .string()
        .min(3, { message: 'Le pseudo doit contenir au moins 3 caractères.' })
        .max(24, { message: 'Le pseudo ne peut pas dépasser 24 caractères.' })
        .regex(pseudoRegex, {
            message: 'Le pseudo ne peut contenir que des lettres, chiffres, tirets, tirets du bas ou points.',
        })
        .parse(pseudoUser);
        z.email().parse(email);
    }

    const submit = async () => {
        try{
            setPending(true);
            checkValues();
            setPseudo(pseudoUser);
            setInformations({email});
            if(biometryIsAvailable){
                await PassprintService.getCredentialsWithBiometrie();
            }else{
                //  ON DEMANDE LE PASSWORD VIA MODAL modal à faire !!!!!!!!!!!!!!!!!
                console.log("ON DEMANDE LA MODAL PASSWORD")
                const success = await requestPassword();
                hidePasswordModal();
                if(success){
                    const response = await PassprintService.signUpUser(pseudoUser, email, device);
                    console.log("response reçu de passprint server api")
                    console.log(response);
                    if(response.success){
                        // on doit rediriger vers la page welcome
                    }
                    else{
                        setError(response.message)
                    }
                }else{
                        setError("password invalide.")
                    }
            }
            
            // aficher demande pour remplir autres informations maintenant ou plus tard
        }catch(err){
            console.log(err);
            if(err instanceof z.ZodError){
                const message = err.issues[0].message;
                setError(message);

            }else if(err instanceof Error){
                setError(err.message);
            }
            else{
                setError("Une erreur est survenue");
            }
            
        }finally{
            setPending(false);
        }
    }

    const resetError = ()=>{
        setError("");
    }

    

    return (
        <ThemedView>
            <ThemedText>Formulaire d'inscription</ThemedText>
            <ThemedView style={ styles.formContainer }>
                <View>
                    <TextInput
                        label="Pseudo"
                        value={pseudoUser}
                        onChangeText={text => setPseudoUser(text)}
                        onFocus={resetError}
                    />
                    <ThemedText style={styles.informations}>
                        Le pseudo ne peut contenir que des lettres, chiffres, tirets, tirets du bas ou points.
                    </ThemedText>
                </View>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    onFocus={resetError}
                />

                <Button
                    mode="contained"
                    buttonColor='#121542'
                    textColor='#06EEE1'
                    style={styles.button}
                    onPress={submit}
                >
                    { pending ?
                            <ActivityIndicator animating={true} color={MD2Colors.red800} />
                        :
                            'valider' }
                </Button>

                <ThemedText style={styles.error}>{error}</ThemedText>
            </ThemedView>
        </ThemedView>
    )
}


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


export default FormSignIn;