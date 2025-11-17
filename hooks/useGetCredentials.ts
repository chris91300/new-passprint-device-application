import PassprintService from "@/preparation/sdk/backend/PassprintForDevice";
import { useModal } from "@/store/modalStore";
import { useUser } from "@/store/store";



export default 
function useGetCredentials(){
    const {biometryIsAvailable } = useUser();
    const {requestPassword} = useModal();
    const getCredential = biometryIsAvailable ?
                            PassprintService.getCredentialsWithBiometrie
                            :
                            requestPassword

    return getCredential;
}