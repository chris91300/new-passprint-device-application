import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, MD2Colors, TextInput } from 'react-native-paper';
import * as z from 'zod';


type Props = {
    request: (password: string) => Promise<unknown>,
    callback: () => void
}



export default function PasswordForm({ request, callback }: Props){

    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState("");
    const [ pending, setPending ] = useState(false);

    const resetError = ()=>{
        setError("");
    }

    const submit = async ()=>{
        try{
            setPending(true);
            z.string()
            .min(5, { message: 'Le mot de passe doit contenir au moins 5 caractères.' })
            .max(15, { message: 'Le mot de passe ne peut pas dépasser 15 caractères.' })
            .parse(password);
            const isSecure = await request(password);
            console.log("isSecure : ", isSecure)
            if(isSecure){
                callback();
            }else{
                setError("Password incorrect");
            }

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


    return(
        <ThemedView style={ styles.formContainer }>
        <View>
            <TextInput
                label="password"
                value={password}
                onChangeText={text => setPassword(text)}
                onFocus={resetError}
            />
            <ThemedText style={styles.informations}>
                Le password doit contenir au moins 5 caractères et ne peut pas dépasser 15 caractères.
            </ThemedText>
            
        </View>

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
    )
}

const styles = StyleSheet.create({
    formContainer: {
        height:500,
        flexDirection: 'column',
        gap: 10,
        marginTop: 20,
    },
    button: {
        marginTop: 20
    },
    error: {
        color: 'red'
    },
    informations: {
        fontSize: 12,
        color: 'black'
    }
})