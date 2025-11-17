import useIsFirstTime from "./is-this-the-first-time";
import useBiometry from "./useBiometry";
import useGetDeviceInformations from "./useGetDeviceInformations";



export default function useAuth() {
    const { biometrieIsChecked } = useBiometry();
    const { deviceInformationsRetrieved } = useGetDeviceInformations();
    const { isFirstTime } = useIsFirstTime();

    const authentificationInProgress = isFirstTime === undefined || deviceInformationsRetrieved === false || biometrieIsChecked === false

    const newUserForThisDevice = isFirstTime === true && deviceInformationsRetrieved === true;

    const userIsAuthenticated = isFirstTime === false && deviceInformationsRetrieved === true;

    

    return {
        authentificationInProgress,
        newUserForThisDevice,
        userIsAuthenticated    
    }
}