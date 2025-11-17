import AuthContainer from "@/components/authcontainer";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import useGetCredentials from "@/hooks/useGetCredentials";
import PassprintService from "@/preparation/sdk/backend/PassprintForDevice";
import { useModal } from "@/store/modalStore";
import { useUser } from "@/store/store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, MD2Colors, TextInput } from 'react-native-paper';
import * as z from "zod";

const pseudoRegex = /^[a-zA-Z0-9._-]{3,24}$/;

function SignInForm(){

    const router = useRouter();
    const { device, setPseudo, setInformations, biometryIsAvailable } = useUser();
    const { hidePasswordModal } = useModal();
    const getCredential = useGetCredentials();
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
            //setPseudo(pseudoUser);
            //setInformations({email});
            //  attention: je dois créer un hook pour gérer l'authentification
            // je dois juste demander getcredentials et il gère si password ou biométrie
            const success = await getCredential();
            hidePasswordModal();
            if(success){
                const response = await PassprintService.signUpUser(pseudoUser, email, device);
                console.log("response reçu de passprint server api")
                console.log(response);
                
                if(response.success){
                    setPseudo(pseudoUser);
                    setInformations({email});
                    //  on enregistre le pseudo dans le credentials
                    const typeOfAuth = biometryIsAvailable ? 'biometrie' : 'password';
                    await PassprintService.savePseudoInCredentials(pseudoUser, typeOfAuth);
                    PassprintService.deleteCredentialsInformations();
                    // on doit rediriger vers la page welcome
                    router.push("/dashboard")
                }
                else{
                    if(response.message === "pseudo already exist"){
                        setError("Le pseudo est déjà utilisé. Veuillez en choisir un autre.");
                    }else{
                        setError(response.message)
                    }
                    
                }
            }else{
                setError("Une erreur est survenue lors de l'authentification.")
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
        <AuthContainer>
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
                        keyboardType="email-address"
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
            
        </AuthContainer>
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


export default SignInForm;