
import PassprintService from "@/preparation/sdk/backend/PassprintForDevice";
import { useUser } from "@/store/store";
import { useEffect, useState } from "react";

export default function useGenerateSecurity(){

   const { biometryIsAvailable } = useUser();
     const [ secure, setSecure ] = useState<"pending" | boolean>("pending");

     useEffect(()=>{
        const generateSecureSetUp = async () => {
            const isSecure = await PassprintService.generateSecureSetUp();
            setSecure(isSecure);
        }

        if(biometryIsAvailable){
         generateSecureSetUp();
        }else{
            setSecure(false);
        }
        
     }, [biometryIsAvailable, setSecure])


     return {
        secure
     }
}