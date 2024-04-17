import { checkPassage } from "./state.js";
import { PubSub } from "./PubSub.js";

export function viewManager() {
    const origin = window.location.origin;
    const location = window.location;

    const queryParams = new URLSearchParams(window.location.search);
    const pageParam = queryParams.get('view');

    //FORCE LOGINPAGE
    if(!checkPassage()) {

        //NOTE: ERROR
        if( pageParam != `start`) location.href = `${origin}/?view=start`;
    }

    //REDIRECT LOGIN & ORIGIN WHEN LOGGED IN
    if(checkPassage()){
        if( pageParam === 'start' || !pageParam) location.href = `${origin}?view=home`;
        // if( location.href === `${origin}?view=home` || location.href === `${origin}`) location.href = `${origin}?view=home`;
    }

}

PubSub.subscribe
({
    event: 'STATE::LoggedIn',
    listener: () => viewManager(),
});

