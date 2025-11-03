import { passprintService } from '@/preparation/sdk/backend/PassprintUtils';
import { useEffect, useState } from "react";


function useIsFirstTime() {
  const [isFirstTime, setIsTheFirstTime] = useState<undefined | boolean>(undefined);


  useEffect(()=>{
    const doesUserAlreadyExiste = async () =>{
      const credentialsExist = await passprintService.areKeysAlreadyExisting();
      const isTheFirstTime = !credentialsExist;
      setIsTheFirstTime(isTheFirstTime);
    } 
    doesUserAlreadyExiste();
  
 
  }, [])

  return {
    isFirstTime
  }
}

export default useIsFirstTime