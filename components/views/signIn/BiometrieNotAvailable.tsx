import PasswordForm from '@/components/forms/passwordForm';
import { ThemedText } from '@/components/themed-text';
import PassprintService from '@/preparation/sdk/backend/PassprintForDevice';
import React from 'react';
import { StateSignInView } from '../firstTime/signInView';

type Props = {
    changeSignInView: (view: StateSignInView) => void
}

function BiometrieNotAvailable({ changeSignInView }: Props) {


    const request = async (password: string) => {
        return PassprintService.generateSecureSetUpWithPassword(password);
    }

    const callback = () => changeSignInView('form');;

   /* const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState("");
    const [ pending, setPending ] = useState(false);

    const resetError = ()=>{
        setError("");
    }

    const submit = async ()=>{
        try{
            setPending(true);
            z
            .string()
            .min(5, { message: 'Le mot de passe doit contenir au moins 5 caractères.' })
            .max(15, { message: 'Le mot de passe ne peut pas dépasser 15 caractères.' })
            .parse(password);
            const isSecure = await PassprintService.generateSecureSetUpWithPassword(password);
            if(isSecure){
                changeSignInView('form');
            }else{
                setError("Une erreur est survenue")
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
    }*/
  return (
    <>
    <ThemedText>
        Il semblerait que l'accès à la biométrie ne soit pas possible.
    </ThemedText>
    <ThemedText>
        Vous ne l'avez peut être pas encore configuré, ou votre appareil à un problème pour y accéder.
        Quoi qu'ilen soit, vous pouvez tout de même utiliser Passprint. Mais vous aurez besoin d'un mot de passe. C'est le seul que vous aurez à retenir. Il vous sera demandé à chaque fois que vous utilisé notre service.
    </ThemedText>

    <PasswordForm request={ request } callback={ callback } />
    {/*}
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
    */}
    </>
  )
}


/*
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
*/
export default BiometrieNotAvailable