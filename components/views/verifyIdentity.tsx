import { ThemedText } from '@/components/themed-text';

import { ActivityIndicator, MD2Colors } from 'react-native-paper';

function VerifyIdentity() {
  return (
    <>
    <ThemedText type="title">
      Vérification de votre identité
    </ThemedText>
    <ActivityIndicator animating={true} color={MD2Colors.red800} />
    </>    
  )
}

export default VerifyIdentity