
import { create } from 'zustand';


export type Modal = {
    displayPasswordModal: boolean;
    resolvePassword: ((success: boolean) => void);    
    // Fonction pour déclencher l'affichage et retourner une Promesse
    requestPassword: () => Promise<boolean>;
    //showPasswordModal: () => void;
    hidePasswordModal: () => void;    
}



const useModalStore = create<Modal>((set) => ({
    biometryIsAvailable: false,

    displayPasswordModal: false,
    resolvePassword: () => {},

    requestPassword: () => {
        return new Promise<boolean>((resolve) => {
            set({ displayPasswordModal: true, resolvePassword: resolve });
        });
    },
    
    hidePasswordModal: () => {
        console.log("hidePasswordModal called")
        // Nettoie l'état après que la modale est utilisée/fermée
        set({ displayPasswordModal: false, resolvePassword: ()=>{} });
    },
    

}))


export const useModal = () => useModalStore((state) => state)
