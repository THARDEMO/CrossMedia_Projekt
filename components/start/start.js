import * as cManager from '../cManager.js'
import { LR } from './LR/LR.js';

export const component = {
    domID: 'Start',
    elementType: 'section',

    preRender: () => cManager.renderComponent( component),
    render
}

function render( DOM ) {

    DOM.innerHTML = `

        <h1>Crossmedia project</h1>
        <p>förklara på denna sidan om projektet och hur man spelar osv...</p>

        <button id="loginBtn">Logga In</button>
        <button id="registerBtn">Registrera Konto</button>
    
    `;

    DOM.querySelector( '#loginBtn').onclick = () => LR.preRender( 'Logga In');
    DOM.querySelector( '#registerBtn').onclick = () => LR.preRender( 'Registrera Konto');


}