import { useState } from "react";
import { ScrollView } from "react-native";
import FormSignIn from "../signIn/formView";
import SecurityView from "../signIn/securityView";
import StartSignInView from "../signIn/startSignInView";
import { StateView } from "./Welcome";

type Props = {
    changeView: (view: StateView) => void
}

export type StateSignInView = "start" | "security" | "form"

function SignIn({changeView}: Props) {

 const [ stateView, setStateView ] = useState<StateSignInView>("start");

 const changeSignInView = (view: StateSignInView) => {
   setStateView(view);
 }


  const displayView = () => {
    switch(stateView){
      case 'start':
        return <StartSignInView changeView={ changeView } changeSignInView={ changeSignInView }/>
      case 'security':
        return <SecurityView changeSignInView={ changeSignInView }/>
      case 'form':
        return <FormSignIn/>
      default:
        throw new Error(`unknow statement ${stateView}`)
    }
  }

  return (
    <ScrollView>
        {displayView()}
    </ScrollView>
  )
}




export default SignIn