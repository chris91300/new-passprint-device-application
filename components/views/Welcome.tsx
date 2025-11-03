import { ThemedText } from '@/components/themed-text';


function Welcome() {
  return (
    <>
    <ThemedText type="title">
        Bonjour et bienvenue dans Passprint
    </ThemedText>
    <ThemedText>
        Il semblerait que Passprint n'est pas configuré sur votre appareil.
    </ThemedText>
    
    </>
  )
}

export default Welcome