import { checkPassage } from "./state.js";
import { PubSub } from "./PubSub.js";

export function viewManager() {
    const origin = window.location.origin;
    const location = window.location;

    //FORCE LOGINPAGE
    if(!checkPassage()) {
        if( location != `${origin}/login`) location.href = `${origin}/login`;
    }

    //REDIRECT LOGIN & ORIGIN WHEN LOGGED IN
    if(checkPassage()){
        if( location.href === `${origin}/login` || location.href === `${origin}/`) location.href = `${origin}/home`;
    }

}

PubSub.subscribe
({
    event: 'STATE::LoggedIn',
    listener: () => viewManager(),
});

