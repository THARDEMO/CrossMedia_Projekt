import * as cManager from '../cManager.js'
import { LR } from './LR/LR.js';
import { StartPageNav } from '../../../identities/nav/nav.js';

export const component = {
    domID: 'Start',
    elementType: 'section',

    preRender: () => cManager.renderComponent(component),
    render
}

function render(DOM) {
    StartPageNav()

    DOM.innerHTML = `

        <h1>Crossmedia project</h1>
        <p>förklara på denna sidan om projektet och hur man spelar osv..."Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>

        <button id="loginBtn">Logga In</button>
        <button id="registerBtn">Registrera Konto</button>
    
    `;

    DOM.querySelector('#loginBtn').onclick = () => LR.preRender('Logga In');
    DOM.querySelector('#registerBtn').onclick = () => LR.preRender('Registrera Konto');


}