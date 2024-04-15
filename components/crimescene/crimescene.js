import * as cManager from '../cManager.js'
import * as STATE from '../../Logic/state.js';

import { terminal } from './terminal.js';

export const component = {
    domID: 'CrimeScenes',
    elementType: 'section',

    preRender: () => cManager.renderComponent( component),
    render
}

async function render( DOM ) {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    switch( id) {
        case null: return terminal.preRender();
        default:
            DOM.innerHTML = id;
        break;
    }



    const crimescene = await STATE.Get( {entity: 'crimescenes',id: 1});
}
