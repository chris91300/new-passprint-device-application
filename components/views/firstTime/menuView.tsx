import { ThemedText } from '@/components/themed-text';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { ThemedView } from '../../themed-view';
import { StateView } from './Welcome';

type Props = {
    changeView: (view: StateView) => void
}
function Menu({changeView}: Props) {

    const wantSignIn = ()=>{
        changeView("signIn");
    }
    const alreadyHaveAccount = ()=>{
        changeView("alreadyAccount");
    }

  const buttonSize = {width: 300};
  return (
    <>
    <ThemedText>
        Il semblerait que Passprint ne soit pas configuré sur votre appareil.
    </ThemedText>
   
   <ThemedView style={styles.buttonContainer}>
        <Button
            mode="contained"
            onPress={ wantSignIn}
            buttonColor='#121542'
            textColor='#06EEE1'
            style= {buttonSize}
        >
            Je veux créer un compte
        </Button>
        
        <Button
            mode="outlined"
            onPress={alreadyHaveAccount}
            textColor='#121542'
            buttonColor='#06EEE1'
            style= {buttonSize}
        >
            J'ai déjà un compte
        </Button>
    </ThemedView>
    </>
  )
}

export default Menu


const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  }
})