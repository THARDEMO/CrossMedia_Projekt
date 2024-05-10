import { PubSub } from "../Logic/PubSub.js";

export function loading(DOM) {
    
    PubSub.subscribe
    ({
        event: 'FETCH::removeLoading',
        listener: () => DOM.querySelector( '.loadingMessage').remove()
    })
    PubSub.subscribe
    ({
        event: 'ERROR::ReachServer',
        listener: ( detail ) => DOM.querySelector( '.loadingMessage').innerHTML = 'ERROR ' + detail.message,
    })
    PubSub.subscribe
    ({
        event: 'ERROR::fetcher',
        listener: ( detail ) => DOM.querySelector( '.loadingMessage').innerHTML = 'ERROR - Nätverksfel',
    })

    return '<p class="loadingMessage">Loading</p>';
}