import * as cManager from '../cManager.js'
import * as STATE from '../../Logic/state.js';

import { NavComp } from '../../identities/nav/nav.js';


export const component = {
    domID: 'Messages',
    elementType: 'section',

    preRender: () => cManager.renderComponent( component),
    render
}

async function render( DOM ) {
    NavComp( DOM);

    DOM.innerHTML += component.domID;

    const messages = await STATE.Get({entity: 'messages', id: STATE.currentUserID()});

    console.log( messages);
}