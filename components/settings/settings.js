import * as cManager from '../cManager.js'
import { ACCOUNT } from '../../Logic/accountManager.js';

export const component = {
    domID: 'Settings',
    elementType: 'section',

    preRender: () => cManager.renderComponent( component),
    render
}

function render( DOM ) {

    DOM.innerHTML = component.domID;
    DOM.innerHTML += '<button>Logga Ut</button>'


    DOM.querySelector( 'button').onclick = () => ACCOUNT.logout(); 
}