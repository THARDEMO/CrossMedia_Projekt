import { fetcher } from "./fetcher.js";
import { PubSub } from "./PubSub.js";


export const ACCOUNT = {
    login,
    register,
    logout,
}

const path = '../api/account/';

async function login({ username, password }) {

    const loginRqst = new Request( `${path}login.php`, {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password,
        })
    });
    
    const response = await fetcher( loginRqst );
    
    if( !response) return console.log( 'error');

    localStorage.setItem( 'keyOfPassage', JSON.stringify( response ));

    PubSub.publish
    ({
        event: 'STATE::LoggedIn',
        detail: null,
    });
}

async function register( {username, password}) {
    const registerRqst = new Request( `${path}register.php`, {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password,
        })
    });

    const response = await fetcher( registerRqst);
    
    if( !response) return

    PubSub.publish
    ({
        event: 'LR::success',
        detail: response,
    });

}

function logout() {
    localStorage.clear();
    location.reload();
}