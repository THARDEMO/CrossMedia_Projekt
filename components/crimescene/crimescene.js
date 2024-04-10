import * as cManager from '../cManager.js'
import * as STATE from '../../Logic/state.js';

export const component = {
    domID: 'CrimeScenes',
    elementType: 'section',

    preRender: () => cManager.renderComponent( component),
    render
}

function render( DOM ) {

    DOM.innerHTML = component.domID;

    const button = renderButton();

    DOM.append( button);


    STATE.get( 'messages');
}


function renderButton () {

    const DOM = document.createElement( 'button');

    return DOM

}