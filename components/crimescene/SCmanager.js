import * as cManager from '../cManager.js'
import * as STATE from '../../Logic/state.js';

import { NavComp } from '../../identities/nav/nav.js';
import { terminal } from './terminal/terminal.js';
import { interrogations } from './interrogation/interrogation.js';

export const component = {
    domID: 'CrimeScenes',
    elementType: 'section',

    preRender: () => cManager.renderComponent(component),
    render
}

async function render(DOM) {
    NavComp( DOM );

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) return terminal.preRender();

    switch( id ) {
        case '0': return interrogations.preRender( id );
        default: DOM.innerHTML = `Crimescene::${id} Does not exist?!?! What are you doing here officer??`;
    }

}
