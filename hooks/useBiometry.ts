import { useUser } from "@/store/store";
import checkBiometryAvailability from "@/utils/checkBiometryAvailability";
import { useEffect, useState } from "react";


export default function useBiometry(){

    const { setBiometryIsAvailable } = useUser();
    const [ biometrieIsChecked, setBiometrieIsChecked] = useState(false);

    useEffect(()=>{
        const isAvailable = async () => {
            const response = await checkBiometryAvailability();
            setBiometryIsAvailable(response);
            setBiometrieIsChecked(true);
        }
            
        isAvailable();
        
    }, [setBiometryIsAvailable, setBiometrieIsChecked]);

    return {
        biometrieIsChecked
    }

}