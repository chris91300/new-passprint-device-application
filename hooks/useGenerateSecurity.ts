import { passprintService } from '@/preparation/sdk/backend/PassprintUtils';
import { useEffect, useState } from "react";

export default function useGenerateSecurity(){
     const [ secure, setSecure ] = useState<"pending" | boolean>("pending");

     useEffect(()=>{
        const generateSecureSetUp = async () => {
            const isSecure = await passprintService.generateSecureSetUp();
            setSecure(isSecure);
        }

        generateSecureSetUp();
     }, [])


     return {
        secure
     }
}