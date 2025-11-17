import PasswordForm from '@/components/forms/passwordForm';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import PassprintService from '@/preparation/sdk/backend/PassprintForDevice';
import { useModal } from '@/store/modalStore';
import * as React from 'react';
import { Modal, StyleSheet } from 'react-native';

const AuthentificationWithPasswordModal = () => {
  
  const { displayPasswordModal, hidePasswordModal, resolvePassword } = useModal();
  
  const request = async (password: string) => {
    const service = PassprintService.deriveServiceId(password);
    return await PassprintService.getCredentialsWithPassword(service)
    
  }

  const callback = () => {
    console.log("callback called - modal success")
    resolvePassword(true);
  }

  return (
    displayPasswordModal &&
    /*<PaperProvider>
      <Portal>*/
        <Modal visible={displayPasswordModal} onDismiss={hidePasswordModal} >
          <ThemedView style={styles.modalContainer}>
            <ThemedText type="title">AUTHENTIFICATION REQUISE</ThemedText>
            <PasswordForm request={request} callback={callback}/>
          </ThemedView>
          
        </Modal>
      /*</Portal>
    </PaperProvider>*/
      
  );
};


const styles = StyleSheet.create({
  modalContainer: {
    marginTop: 150,
    padding: 30
  }
})
export default AuthentificationWithPasswordModal;