import { useState } from 'react';
import AlreadyAccount from './alreadyAccountView';
import Menu from './menuView';
import SignIn from './signInView';

export type StateView = "menu" | "signIn" | "alreadyAccount";

function Welcome() {

  const [ stateView, setStateView ] = useState<StateView>("menu");

  const changeView = (view: StateView) => {
    setStateView(view);
  }

  const displayView = () => {
    switch(stateView){
      case 'menu':
        return <Menu changeView={ changeView }/>
      case 'signIn':
        return <SignIn changeView={ changeView }/>
      case 'alreadyAccount':
        return <AlreadyAccount changeView={ changeView }/>
      default:
        throw new Error(`unknow statement ${stateView}`)
    }
  }
  return displayView();
}

export default Welcome

