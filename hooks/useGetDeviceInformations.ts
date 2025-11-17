import { useUser } from '@/store/store';
import getBundleID from '@/utils/getBundleID';
import getDeviceName from '@/utils/getDeviceName';
import getPassprintVersion from '@/utils/getPassprintVersion';
import getPlatform from '@/utils/getPlatform';
import getPushToken from '@/utils/getPushToken';
import getScreenSize from '@/utils/getScreenSize';
import getSystemVersion from '@/utils/getSystemVersion';
import { useEffect, useState } from 'react';


async function fetchDeviceInformations(){
    // Récupère la version sous forme de chaîne (ex: "1.0.0")
    const passprintVersion = getPassprintVersion();

    const pushToken = await getPushToken();
    
    // 1. Informations sur la plateforme (synchrone)
    const platform = getPlatform();       
    const systemVersion = getSystemVersion();
    const name = getDeviceName();
    
    // 2. ID de l'application (asynchrone)    
    const bundleID = await getBundleID(platform);

    // 3. Taille de l'écran (synchrone via Dimensions)
    const screenSize = getScreenSize(); 
       
    const device = {
        passprintVersion,
        pushToken,
        platform,
        systemVersion,
        name,
        bundleID,
        screenSize,
    };
    
    return device;
}


export default function useGetDeviceInformations(){

    const { setDevice } = useUser();
    const [ deviceInformationsRetrieved, setDeviceInformationsRetrieved ] = useState(false);

    useEffect(()=>{
        const getDeviceInformations = async () => {
            const device = await fetchDeviceInformations();
            setDevice(device);
            setDeviceInformationsRetrieved(true);
        }
        getDeviceInformations();
    }, [setDevice, setDeviceInformationsRetrieved])
   
  return {deviceInformationsRetrieved}
}