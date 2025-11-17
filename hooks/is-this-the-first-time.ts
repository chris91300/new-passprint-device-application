
import PassprintService from "@/preparation/sdk/backend/PassprintForDevice";
import { useEffect, useState } from "react";


function useIsFirstTime() {
  const [isFirstTime, setIsTheFirstTime] = useState<undefined | boolean>(undefined);


  useEffect(()=>{
    const doesUserAlreadyExiste = async () =>{
      const credentialsExist = await PassprintService.areKeysAlreadyExisting();
      const isTheFirstTime = !credentialsExist;
      setIsTheFirstTime(isTheFirstTime);
    } 
    doesUserAlreadyExiste();
  
 
  }, [setIsTheFirstTime])

  return {
    isFirstTime
  }
}

export default useIsFirstTime