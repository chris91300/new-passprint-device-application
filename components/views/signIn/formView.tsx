import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import * as z from "zod";

const pseudoRegex = /^[a-zA-Z0-9._-]{3,24}$/;

function FormSignIn(){

    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [ error, setError ] = useState("");

    const checkValues = () => {
        z
        .string()
        .min(3, { message: 'Le pseudo doit contenir au moins 3 caractères.' })
        .max(24, { message: 'Le pseudo ne peut pas dépasser 24 caractères.' })
        .regex(pseudoRegex, {
            message: 'Le pseudo ne peut contenir que des lettres, chiffres, tirets, tirets du bas ou points.',
        })
        .parse(pseudo);
        z.email().parse(email);
    }

    const submit = () => {
        try{
            checkValues();
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
                        value={pseudo}
                        onChangeText={text => setPseudo(text)}
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
                    Valider
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